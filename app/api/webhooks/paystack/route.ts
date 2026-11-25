import { NextResponse } from "next/server";
import { fulfilOrder } from "@/lib/server/fulfil";
import { verifyPayment, webhookIsGenuine } from "@/lib/server/paystack";

// Register in Paystack > Settings > API Keys & Webhooks as https://rawrooibos.com/api/webhooks/paystack
// (test and live each have their own webhook URL field).
export async function POST(req: Request) {
  const raw = await req.text(); // the signature covers the exact bytes, so read before parsing
  if (!webhookIsGenuine(raw, req.headers)) return NextResponse.json({ error: "bad signature" }, { status: 401 });

  let event: { event?: string; data?: { reference?: string } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  if (event.event !== "charge.success" || !event.data?.reference) return NextResponse.json({ ok: true, ignored: event.event });

  try {
    // Don't take the webhook body's word for the amount: ask Paystack again.
    const tx = await verifyPayment(event.data.reference);
    const result = await fulfilOrder(tx);
    console.log(`order ${tx.reference}: ${result.note}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("webhook processing failed", e);
    return NextResponse.json({ error: "retry later" }, { status: 500 }); // Paystack retries
  }
}
