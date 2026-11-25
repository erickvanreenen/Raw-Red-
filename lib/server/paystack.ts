// Server-only. Paystack: start a payment, check a payment, and check that a webhook really came from Paystack.
// Docs: https://paystack.com/docs/payments/accept-payments/ and https://paystack.com/docs/payments/webhooks/
import { createHmac, timingSafeEqual } from "node:crypto";
import { isDemo, paystack, signingSecret, siteUrl } from "./config";
import type { OrderMetadata } from "./order";

const API = "https://api.paystack.co";

export interface PaidTransaction {
  reference: string;
  status: string; // "success" when paid
  amountCents: number;
  currency: string;
  channel: string;
  paidAt: string | null;
  metadata: OrderMetadata;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const { secretKey } = paystack();
  if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not set");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { status?: boolean; message?: string; data?: T };
  if (!res.ok || !json.status) throw new Error(`Paystack ${path}: ${res.status} ${json.message ?? ""}`);
  return json.data as T;
}

export async function initializePayment(args: {
  reference: string;
  email: string;
  amountCents: number;
  metadata: OrderMetadata;
}): Promise<{ url: string }> {
  const callback = `${siteUrl()}/checkout/complete`;
  if (isDemo()) {
    return { url: `${siteUrl()}/checkout/demo-pay?d=${encodeURIComponent(signDemo({ ...args, callback }))}` };
  }
  const { address, delivery } = args.metadata;
  const data = await call<{ authorization_url: string }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: args.email,
      amount: args.amountCents, // cents (ZAR subunit)
      currency: "ZAR",
      reference: args.reference,
      callback_url: callback,
      metadata: {
        ...args.metadata,
        cancel_action: `${siteUrl()}/checkout`,
        // Shown on the transaction in the Paystack dashboard.
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: address.name },
          { display_name: "Phone", variable_name: "phone", value: address.phone },
          { display_name: "Deliver to", variable_name: "deliver_to", value: `${address.address}, ${address.suburb}, ${address.city} ${address.postal}` },
          { display_name: "Delivery", variable_name: "delivery", value: `${delivery.name} (R${delivery.price})` },
        ],
      },
    }),
  });
  return { url: data.authorization_url };
}

// Always ask Paystack directly whether a payment went through; never trust the browser's redirect.
export async function verifyPayment(reference: string, demoToken?: string): Promise<PaidTransaction> {
  if (isDemo()) {
    const d = readDemo(demoToken);
    if (d.reference !== reference) throw new Error("Demo token does not match reference");
    return { reference, status: "success", amountCents: d.amountCents, currency: "ZAR", channel: "demo", paidAt: new Date().toISOString(), metadata: d.metadata };
  }
  const data = await call<{
    reference: string; status: string; amount: number; currency: string; channel: string; paid_at: string | null; metadata: unknown;
  }>(`/transaction/verify/${encodeURIComponent(reference)}`);
  const metadata = (typeof data.metadata === "string" ? JSON.parse(data.metadata) : data.metadata) as OrderMetadata;
  return { reference: data.reference, status: data.status, amountCents: data.amount, currency: data.currency, channel: data.channel, paidAt: data.paid_at, metadata };
}

const safeEqualHex = (a: string, b: string) => {
  const x = Buffer.from(a, "hex");
  const y = Buffer.from(b, "hex");
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
};

// Accepts the newer `Paystack-Signature: t=..,v1=..` header (when PAYSTACK_WEBHOOK_SECRET is set) or the
// older `x-paystack-signature` (HMAC-SHA512 of the raw body with the secret key).
export function webhookIsGenuine(rawBody: string, headers: Headers): boolean {
  const { secretKey, webhookSecret } = paystack();
  const modern = headers.get("paystack-signature");
  if (modern && webhookSecret) {
    const parts = modern.split(",").map((p) => p.trim());
    const t = parts.find((p) => p.startsWith("t="))?.slice(2);
    if (!t || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
    const expected = createHmac("sha512", webhookSecret).update(`${t}.${rawBody}`).digest("hex");
    return parts
      .filter((p) => p.startsWith("v1="))
      .map((p) => p.slice(3).split(":").pop() ?? "")
      .some((sig) => safeEqualHex(sig, expected));
  }
  const legacy = headers.get("x-paystack-signature");
  if (legacy && secretKey) {
    return safeEqualHex(legacy, createHmac("sha512", secretKey).update(rawBody).digest("hex"));
  }
  return false;
}

// Demo mode only: the pretend payment travels in a signed token, so it works without a database.
interface DemoPayment { reference: string; email: string; amountCents: number; metadata: OrderMetadata; callback: string }

function signDemo(d: DemoPayment) {
  const body = Buffer.from(JSON.stringify(d)).toString("base64url");
  return `${body}.${createHmac("sha256", signingSecret()).update(`demo.${body}`).digest("base64url")}`;
}

export function readDemo(token?: string): DemoPayment {
  if (!isDemo()) throw new Error("Demo mode is off");
  const [body, sig] = String(token ?? "").split(".");
  const expected = createHmac("sha256", signingSecret()).update(`demo.${body}`).digest("base64url");
  if (!body || sig !== expected) throw new Error("Bad demo token");
  return JSON.parse(Buffer.from(body, "base64url").toString()) as DemoPayment;
}
