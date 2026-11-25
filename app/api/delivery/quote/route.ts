import { NextResponse } from "next/server";
import { getDeliveryOptions } from "@/lib/server/bobgo";
import { checkoutReady } from "@/lib/server/config";
import { OrderError, parseAddress, priceCart, signQuote, subtotalOf } from "@/lib/server/order";
import type { DeliveryOption } from "@/lib/shipping";

// POST { address, items: [{ sizeId, quantity }] } -> { options: DeliveryOption[] }
export async function POST(req: Request) {
  if (!checkoutReady()) return NextResponse.json({ error: "Online checkout isn't set up yet." }, { status: 503 });
  try {
    const body = await req.json();
    const address = parseAddress(body.address);
    const lines = priceCart(body.items);
    const found = await getDeliveryOptions(address, lines, subtotalOf(lines));
    const options: DeliveryOption[] = found.map((o) => ({
      ...o,
      description: "",
      token: signQuote(o, address, lines),
    }));
    return NextResponse.json({ options });
  } catch (e) {
    if (e instanceof OrderError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error("delivery quote failed", e);
    return NextResponse.json({ error: "We couldn't get delivery prices just now. Try again in a minute." }, { status: 502 });
  }
}
