import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { formatPrice, rawRooibos } from "@/lib/products";
import { checkPayment } from "@/lib/server/fulfil";
import { verifyPayment } from "@/lib/server/paystack";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your order", robots: { index: false } };

// Paystack sends the customer here with ?reference=. We ask Paystack whether it was paid; the order itself is
// handled by the webhook, so refreshing this page never creates a second order.
export default async function CompletePage({ searchParams }: { searchParams: Promise<{ reference?: string; trxref?: string; demo?: string }> }) {
  const sp = await searchParams;
  const reference = sp.reference ?? sp.trxref;
  let paid: { name: string; email: string; total: number; delivery: string } | null = null;
  let pending = false;
  if (reference) {
    try {
      const tx = await verifyPayment(reference, sp.demo);
      const check = checkPayment(tx);
      if (check.ok) {
        paid = { name: tx.metadata.address.name.split(" ")[0], email: tx.metadata.address.email, total: check.total, delivery: tx.metadata.delivery.name };
      } else if (["pending", "ongoing", "processing", "queued"].includes(tx.status)) {
        pending = true;
      }
    } catch (e) {
      console.error("complete page verify failed", e);
    }
  }

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <div className="mx-auto my-16 max-w-xl rounded-panel bg-paper px-6 py-14 text-center sm:px-8">
          {paid ? (
            <>
              <ClearCartOnMount />
              <h1 className="t-headline">Thank you, {paid.name}. Your order is in.</h1>
              <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.65] text-ink-soft">
                We&apos;ve received your payment of {formatPrice(paid.total)} (order {reference}). A confirmation is on
                its way to {paid.email}. We&apos;ll pack your rooibos and send it with {paid.delivery}; the courier
                emails you a tracking link once it&apos;s collected.
              </p>
            </>
          ) : pending ? (
            <>
              <h1 className="t-headline">Your payment is still processing</h1>
              <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.65] text-ink-soft">
                Some bank payments take a few minutes. You&apos;ll get an email as soon as it clears. Order {reference}.
              </p>
            </>
          ) : (
            <>
              <h1 className="t-headline">Your payment didn&apos;t go through</h1>
              <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.65] text-ink-soft">
                Nothing was charged, and your cart is still here. Try again, or email{" "}
                <a className="font-semibold text-ink underline underline-offset-4" href={`mailto:${rawRooibos.bulkContactEmail}`}>
                  {rawRooibos.bulkContactEmail}
                </a>{" "}
                if it keeps happening.
              </p>
              <Link href="/checkout" className="btn btn-primary mt-6">
                Back to checkout<Icon name="arrow" />
              </Link>
            </>
          )}
          <div className="mt-6">
            <Link href="/" className="link">
              Back to Raw Rooibos<Icon name="arrow" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
