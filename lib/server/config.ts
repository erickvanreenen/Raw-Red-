// Server-only: import this from route handlers and server components, never from a "use client" file.
// All checkout settings come from environment variables (Vercel > Project > Settings > Environment Variables,
// or .env.local on a laptop). None of them belong in the repo. See .env.example and work/09-payments-delivery.md.

const env = (name: string) => process.env[name]?.trim() || undefined;

// Demo mode fakes Paystack, Bob Go and email so the whole flow can be clicked through without any accounts.
// On: CHECKOUT_DEMO=1, or a Vercel preview that has no Paystack key yet (so previews can be clicked through
// before the accounts exist; adding a test key turns it off). Off: CHECKOUT_DEMO=0. Never in production.
export const isDemo = () => {
  if (process.env.VERCEL_ENV === "production") return false;
  const flag = env("CHECKOUT_DEMO");
  if (flag) return flag === "1";
  return process.env.VERCEL_ENV === "preview" && !env("PAYSTACK_SECRET_KEY");
};

export function siteUrl() {
  const explicit = env("SITE_URL");
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// Signs delivery quotes so the price cannot be edited in the browser. Any long random string.
export function signingSecret() {
  const s = env("ORDER_SIGNING_SECRET");
  if (s) return s;
  if (isDemo() || process.env.NODE_ENV !== "production") return "dev-only-signing-secret";
  throw new Error("ORDER_SIGNING_SECRET is not set");
}

export const paystack = () => ({
  secretKey: env("PAYSTACK_SECRET_KEY"),
  // Optional: the newer "whsec_" webhook signing secret (Paystack > Settings > API Keys & Webhooks).
  webhookSecret: env("PAYSTACK_WEBHOOK_SECRET"),
});

export const bobgo = () => ({
  apiKey: env("BOBGO_API_KEY"),
  // Sandbox until Erick has a live Bob Go account: https://api.sandbox.bobgo.co.za/v2
  baseUrl: (env("BOBGO_API_URL") ?? "https://api.sandbox.bobgo.co.za/v2").replace(/\/$/, ""),
  // Where the courier collects from, as JSON. Example in .env.example.
  collection: parseCollection(env("BOBGO_COLLECTION_ADDRESS")),
});

export const email = () => ({
  resendKey: env("RESEND_API_KEY"),
  from: env("ORDER_EMAIL_FROM") ?? "Raw Rooibos <orders@rawrooibos.com>",
  shop: env("SHOP_EMAIL") ?? "hello@rawrooibos.com",
});

export interface CollectionAddress {
  company: string;
  street_address: string;
  local_area: string;
  city: string;
  zone: string;
  code: string;
  country: "ZA";
  contact_name: string;
  contact_phone: string;
  contact_email: string;
}

const DEMO_COLLECTION: CollectionAddress = {
  company: "Raw Rooibos",
  street_address: "1 Demo Road",
  local_area: "Clanwilliam",
  city: "Clanwilliam",
  zone: "WC",
  code: "8135",
  country: "ZA",
  contact_name: "Raw Rooibos",
  contact_phone: "0000000000",
  contact_email: "hello@rawrooibos.com",
};

function parseCollection(raw: string | undefined): CollectionAddress | undefined {
  if (!raw) return isDemo() ? DEMO_COLLECTION : undefined;
  try {
    return { country: "ZA", ...JSON.parse(raw) } as CollectionAddress;
  } catch {
    throw new Error("BOBGO_COLLECTION_ADDRESS is not valid JSON");
  }
}

// True when the live checkout has what it needs. The checkout page shows an email fallback otherwise.
export function checkoutReady() {
  if (isDemo()) return true;
  const b = bobgo();
  return Boolean(paystack().secretKey && b.apiKey && b.collection && env("ORDER_SIGNING_SECRET"));
}
