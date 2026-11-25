// Server-only. Prices, totals and quote signing. The browser only ever sends pack ids and quantities;
// every price is looked up here, so a tampered cart cannot change what the customer pays.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { MAX_QTY, rawRooibos } from "@/lib/products";
import { PROVINCES, type DeliveryAddress } from "@/lib/shipping";
import { signingSecret } from "./config";

export interface OrderLine {
  sizeId: string;
  label: string;
  grams: number;
  price: number;
  quantity: number;
}

export interface ChosenDelivery {
  id: string;
  name: string;
  price: number;
  minDate: string | null;
  maxDate: string | null;
}

// What we store on the Paystack transaction and read back after payment.
export interface OrderMetadata {
  items: { sizeId: string; quantity: number }[];
  address: DeliveryAddress;
  delivery: ChosenDelivery;
  quoteToken: string;
}

export class OrderError extends Error {}

export function priceCart(raw: unknown): OrderLine[] {
  if (!Array.isArray(raw) || raw.length === 0) throw new OrderError("Your cart is empty.");
  const seen = new Set<string>();
  return raw.map((entry) => {
    const sizeId = String((entry as { sizeId?: unknown })?.sizeId ?? "");
    const quantity = Number((entry as { quantity?: unknown })?.quantity);
    const size = rawRooibos.sizes.find((s) => s.id === sizeId);
    if (!size || seen.has(sizeId)) throw new OrderError("Your cart has an item we don't recognise.");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) throw new OrderError("Check the quantities in your cart.");
    seen.add(sizeId);
    return { sizeId, label: size.label, grams: size.grams, price: size.price, quantity };
  });
}

export const subtotalOf = (lines: OrderLine[]) => lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

const clean = (v: unknown, max = 120) => String(v ?? "").trim().replace(/\s+/g, " ").slice(0, max);

export function parseAddress(raw: unknown): DeliveryAddress {
  const r = (raw ?? {}) as Record<string, unknown>;
  const a: DeliveryAddress = {
    name: clean(r.name, 80),
    email: clean(r.email, 120),
    phone: clean(r.phone, 20).replace(/[^\d+]/g, ""),
    address: clean(r.address),
    suburb: clean(r.suburb, 80),
    city: clean(r.city, 80),
    province: clean(r.province, 3).toUpperCase() as DeliveryAddress["province"],
    postal: clean(r.postal, 4),
  };
  const ok =
    a.name && a.address && a.city && a.suburb &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email) &&
    /^(\+27|0)\d{9}$/.test(a.phone) &&
    /^\d{4}$/.test(a.postal) &&
    PROVINCES.some((p) => p.code === a.province);
  if (!ok) throw new OrderError("Check your delivery details.");
  return a;
}

const digest = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("base64url").slice(0, 22);
const addressKey = (a: DeliveryAddress) => digest([a.address, a.suburb, a.city, a.province, a.postal].map((s) => s.toLowerCase()));
const cartKey = (lines: { sizeId: string; quantity: number }[]) =>
  digest([...lines].sort((x, y) => x.sizeId.localeCompare(y.sizeId)).map((l) => [l.sizeId, l.quantity]));
const hmac = (body: string) => createHmac("sha256", signingSecret()).update(body).digest("base64url");

const QUOTE_TTL_MS = 2 * 60 * 60 * 1000;

export function signQuote(option: ChosenDelivery, address: DeliveryAddress, lines: OrderLine[]) {
  const body = Buffer.from(
    JSON.stringify({ o: option, a: addressKey(address), c: cartKey(lines), exp: Date.now() + QUOTE_TTL_MS })
  ).toString("base64url");
  return `${body}.${hmac(body)}`;
}

// Returns the delivery option the token vouches for, if the token is genuine and matches this address and cart.
// `checkExpiry` is off after payment: a customer who took a while to pay still gets their order.
export function readQuote(
  token: unknown,
  address: DeliveryAddress,
  lines: { sizeId: string; quantity: number }[],
  checkExpiry = true
): ChosenDelivery {
  const [body, sig] = String(token ?? "").split(".");
  if (!body || !sig) throw new OrderError("Choose a delivery option.");
  const expected = Buffer.from(hmac(body));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) throw new OrderError("That delivery quote isn't valid. Get delivery options again.");
  const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as { o: ChosenDelivery; a: string; c: string; exp: number };
  if (payload.a !== addressKey(address) || payload.c !== cartKey(lines)) throw new OrderError("Your address or cart changed. Get delivery options again.");
  if (checkExpiry && payload.exp < Date.now()) throw new OrderError("That delivery quote has expired. Get delivery options again.");
  return payload.o;
}

// "RR-" plus date and random letters, e.g. RR-251125-K7QD2M. Used as the Paystack reference and the Bob Go order number.
export function newReference() {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => alphabet[b % alphabet.length]).join("");
  return `RR-${ymd}-${rand}`;
}

export const toCents = (rand: number) => Math.round(rand * 100);
