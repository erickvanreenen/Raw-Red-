// Server-only. Bob Go: live delivery prices at checkout, and an order in the Bob Go dashboard once paid.
// Docs: https://developer.bobgo.co.za (rates-at-checkout, orders). Sandbox and live differ only by URL and key.
import { PACK_PARCEL, type DeliveryAddress } from "@/lib/shipping";
import { bobgo, isDemo } from "./config";
import type { ChosenDelivery, OrderLine } from "./order";

async function call<T>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: T; text: string }> {
  const { apiKey, baseUrl } = bobgo();
  if (!apiKey) throw new Error("BOBGO_API_KEY is not set");
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  let data = {} as T;
  try { data = JSON.parse(text) as T; } catch { /* non-JSON error body */ }
  return { ok: res.ok, status: res.status, data, text };
}

const deliveryAddress = (a: DeliveryAddress) => ({
  type: "residential",
  company: "",
  street_address: a.address,
  local_area: a.suburb,
  city: a.city,
  zone: a.province,
  country: "ZA",
  code: a.postal,
});

const items = (lines: OrderLine[]) =>
  lines.map((l) => {
    const p = PACK_PARCEL[l.sizeId];
    return { description: `Raw Rooibos ${l.label}`, sku: `raw-rooibos-${l.sizeId}`, price: l.price, quantity: l.quantity,
      length_cm: p.lengthCm, width_cm: p.widthCm, height_cm: p.heightCm, weight_kg: p.weightKg };
  });

interface CheckoutRate {
  id: number | string;
  service_name: string;
  description?: string;
  total_price: number;
  min_delivery_date?: string | null;
  max_delivery_date?: string | null;
  type?: string;
}

// Door-to-door options only (pickup points need an extra picker; later).
export async function getDeliveryOptions(address: DeliveryAddress, lines: OrderLine[], subtotal: number): Promise<ChosenDelivery[]> {
  if (isDemo()) {
    const day = (n: number) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
    return [
      { id: "demo-economy", name: "Demo: Economy (door to door)", price: 99, minDate: day(3), maxDate: day(5) },
      { id: "demo-express", name: "Demo: Express (door to door)", price: 149, minDate: day(1), maxDate: day(2) },
    ];
  }
  const { collection } = bobgo();
  if (!collection) throw new Error("BOBGO_COLLECTION_ADDRESS is not set");
  const { contact_name: _n, contact_phone: _p, contact_email: _e, ...collection_address } = collection;
  const res = await call<{ rates?: CheckoutRate[] | null }>("/rates-at-checkout", {
    collection_address,
    delivery_address: deliveryAddress(address),
    items: items(lines),
    declared_value: subtotal,
  });
  if (!res.ok) throw new Error(`Bob Go rates-at-checkout: ${res.status} ${res.text.slice(0, 300)}`);
  return (res.data.rates ?? [])
    .filter((r) => !r.type || r.type === "door")
    .map((r) => ({
      id: String(r.id),
      name: r.service_name,
      // Rounded up to whole rand so every price on the site reads the same way (R 99, not R 98,50).
      price: Math.ceil(Number(r.total_price)),
      minDate: r.min_delivery_date ?? null,
      maxDate: r.max_delivery_date ?? null,
    }))
    .filter((r) => Number.isFinite(r.price) && r.price > 0)
    .sort((a, b) => a.price - b.price);
}

export type BobGoOrderResult = { status: "created"; id: string } | { status: "exists" } | { status: "skipped" | "failed"; reason: string };

// Puts the paid order into Bob Go, where Erick books the courier and prints the waybill. The Paystack reference
// is the order number, and Bob Go refuses a second order with the same number, so webhook retries are harmless.
export async function createBobGoOrder(reference: string, address: DeliveryAddress, lines: OrderLine[], delivery: ChosenDelivery): Promise<BobGoOrderResult> {
  const [first, ...rest] = address.name.split(" ");
  const body = {
    channel_order_number: reference,
    customer_name: first,
    customer_surname: rest.join(" "),
    customer_email: address.email,
    customer_phone: address.phone,
    currency: "ZAR",
    payment_status: "paid",
    buyer_selected_shipping_method: delivery.name,
    buyer_selected_shipping_cost: delivery.price,
    delivery_address: deliveryAddress(address),
    order_items: lines.map((l) => {
      const p = PACK_PARCEL[l.sizeId];
      return { description: `Raw Rooibos ${l.label}`, sku: `raw-rooibos-${l.sizeId}`, unit_price: l.price, qty: l.quantity,
        unit_weight_kg: p.weightKg, unit_length_cm: p.lengthCm, unit_width_cm: p.widthCm, unit_height_cm: p.heightCm };
    }),
  };
  if (isDemo()) {
    console.log("[demo] Bob Go order that would be created:", JSON.stringify(body));
    return { status: "created", id: "demo" };
  }
  if (!bobgo().apiKey) return { status: "skipped", reason: "BOBGO_API_KEY is not set" };
  const res = await call<{ id?: number | string }>("/orders", body);
  if (res.ok) return { status: "created", id: String(res.data.id ?? "") };
  if (/already exists/i.test(res.text)) return { status: "exists" };
  return { status: "failed", reason: `${res.status} ${res.text.slice(0, 300)}` };
}
