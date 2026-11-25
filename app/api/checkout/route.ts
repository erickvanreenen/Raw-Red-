import { NextResponse } from "next/server";
import { checkoutReady } from "@/lib/server/config";
import { OrderError, newReference, parseAddress, priceCart, readQuote, subtotalOf, toCents } from "@/lib/server/order";
import { initializePayment } from "@/lib/server/paystack";

// POST { address, items, quoteToken } -> { url } of the Paystack payment page.
// The total is worked out here from our own prices and the signed delivery quote.
export async function POST(req: Request) {
  if (!checkoutReady()) return NextResponse.json({ error: "Online checkout isn't set up yet." }, { status: 503 });
  try {
    const body = await req.json();
    const address = parseAddress(body.address);
    const lines = priceCart(body.items);
    const delivery = readQuote(body.quoteToken, address, lines);
    const total = subtotalOf(lines) + delivery.price;
    const reference = newReference();
    const { url } = await initializePayment({
      reference,
      email: address.email,
      amountCents: toCents(total),
      metadata: {
        items: lines.map((l) => ({ sizeId: l.sizeId, quantity: l.quantity })),
        address,
        delivery,
        quoteToken: String(body.quoteToken),
      },
    });
    return NextResponse.json({ url, reference });
  } catch (e) {
    if (e instanceof OrderError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error("checkout failed", e);
    return NextResponse.json({ error: "We couldn't start the payment. Nothing was charged. Try again in a minute." }, { status: 502 });
  }
}
