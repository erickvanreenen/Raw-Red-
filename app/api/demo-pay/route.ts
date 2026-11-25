import { NextResponse } from "next/server";
import { isDemo } from "@/lib/server/config";
import { fulfilOrder } from "@/lib/server/fulfil";
import { readDemo, verifyPayment } from "@/lib/server/paystack";

// Demo mode only: stands in for Paystack charging the card and calling our webhook.
export async function POST(req: Request) {
  if (!isDemo()) return NextResponse.json({ error: "not found" }, { status: 404 });
  const form = await req.formData();
  const token = String(form.get("d") ?? "");
  const demo = readDemo(token);
  const tx = await verifyPayment(demo.reference, token);
  const result = await fulfilOrder(tx);
  console.log(`[demo] order ${tx.reference}: ${result.note}`);
  const back = new URL(demo.callback);
  back.searchParams.set("reference", demo.reference);
  back.searchParams.set("demo", token);
  return NextResponse.redirect(back, 303);
}
