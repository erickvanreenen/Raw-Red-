// Server-only. What happens once Paystack confirms a payment: check it, queue it in Bob Go, tell the shop and
// the customer. Safe to run more than once for the same payment (webhook retries).
import { formatPrice, rawRooibos } from "@/lib/products";
import { PROVINCES } from "@/lib/shipping";
import { createBobGoOrder } from "./bobgo";
import { email } from "./config";
import { sendEmail } from "./email";
import { priceCart, readQuote, subtotalOf, toCents, type OrderLine } from "./order";
import type { PaidTransaction } from "./paystack";

export type CheckResult =
  | { ok: true; lines: OrderLine[]; subtotal: number; total: number }
  | { ok: false; reason: string };

// The amount paid must equal what our own price list and our own signed delivery quote add up to.
// This catches a payment started outside our checkout with made-up order details.
export function checkPayment(tx: PaidTransaction): CheckResult {
  if (tx.status !== "success") return { ok: false, reason: `Payment status is ${tx.status}` };
  if (tx.currency !== "ZAR") return { ok: false, reason: `Unexpected currency ${tx.currency}` };
  try {
    const m = tx.metadata;
    const lines = priceCart(m.items);
    const delivery = readQuote(m.quoteToken, m.address, lines, false);
    if (delivery.id !== m.delivery.id || delivery.price !== m.delivery.price) return { ok: false, reason: "Delivery details don't match the quote" };
    const subtotal = subtotalOf(lines);
    const total = subtotal + delivery.price;
    if (toCents(total) !== tx.amountCents) return { ok: false, reason: `Paid ${tx.amountCents / 100}, expected ${total}` };
    return { ok: true, lines, subtotal, total };
  } catch (e) {
    return { ok: false, reason: `Order details unreadable: ${(e as Error).message}` };
  }
}

function orderText(tx: PaidTransaction, lines: OrderLine[], subtotal: number, total: number) {
  const { address: a, delivery: d } = tx.metadata;
  const province = PROVINCES.find((p) => p.code === a.province)?.name ?? a.province;
  return [
    `Order ${tx.reference}`,
    "",
    ...lines.map((l) => `${l.quantity} × ${rawRooibos.name} ${l.label} = ${formatPrice(l.price * l.quantity)}`),
    `Subtotal: ${formatPrice(subtotal)}`,
    `Delivery (${d.name}): ${formatPrice(d.price)}`,
    `Total paid: ${formatPrice(total)}`,
    "",
    "Deliver to",
    a.name,
    a.address,
    a.suburb,
    `${a.city}, ${province}, ${a.postal}`,
    `Phone: ${a.phone}`,
    `Email: ${a.email}`,
  ].join("\n");
}

export async function fulfilOrder(tx: PaidTransaction): Promise<{ ok: boolean; note: string }> {
  const shop = email().shop;
  const check = checkPayment(tx);
  if (!check.ok) {
    // Money arrived but the order doesn't add up: don't ship, flag it for Erick.
    await sendEmail(shop, `CHECK: payment ${tx.reference} needs a look`,
      `Paystack reports a payment we could not match to a valid order.\nReason: ${check.reason}\nReference: ${tx.reference}\nAmount: R${(tx.amountCents / 100).toFixed(2)}\n\nNothing was sent to Bob Go. Look it up in the Paystack dashboard.`);
    return { ok: false, note: check.reason };
  }
  const { lines, subtotal, total } = check;
  const { address, delivery } = tx.metadata;

  const bob = await createBobGoOrder(tx.reference, address, lines, delivery);
  if (bob.status === "exists") return { ok: true, note: "Already processed" };

  const bobLine =
    bob.status === "created"
      ? "It is waiting in Bob Go (Orders). Book the courier there and print the waybill."
      : `NOT in Bob Go (${bob.reason}). Create the shipment by hand in Bob Go.`;

  const text = orderText(tx, lines, subtotal, total);
  await sendEmail(shop, `New order ${tx.reference}: ${lines.map((l) => `${l.quantity} × ${l.label}`).join(", ")}`, `${text}\n\n${bobLine}`, address.email);
  await sendEmail(
    address.email,
    `Your Raw Rooibos order ${tx.reference}`,
    `Hi ${address.name.split(" ")[0]},\n\nThanks for your order. Your payment went through and we're packing it now. You'll get a tracking link from the courier once it's on its way.\n\n${text}\n\nQuestions? Reply to this email or write to ${shop}.\n\nRaw Rooibos`,
    shop
  );
  return { ok: true, note: `Bob Go: ${bob.status}` };
}
