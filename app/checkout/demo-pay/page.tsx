import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { isDemo } from "@/lib/server/config";
import { readDemo } from "@/lib/server/paystack";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };

// Demo mode only: a stand-in for the Paystack payment page.
export default async function DemoPayPage({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  if (!isDemo()) notFound();
  const { d } = await searchParams;
  let demo;
  try {
    demo = readDemo(d);
  } catch {
    notFound();
  }
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <div className="mx-auto my-16 max-w-xl rounded-panel bg-paper px-6 py-14 text-center sm:px-8">
          <p className="t-label">Demo payment, no money moves</p>
          <h1 className="t-headline mt-2">Pay R{(demo.amountCents / 100).toFixed(2)}</h1>
          <p className="mt-3 text-base text-ink-soft">
            Order {demo.reference} for {demo.email}. In the live site this is Paystack&apos;s page.
          </p>
          <form action="/api/demo-pay" method="post" className="mt-6">
            <input type="hidden" name="d" value={d} />
            <button type="submit" className="btn btn-primary btn-lg">Pay (demo)</button>
          </form>
          <a href="/checkout" className="link mt-4 inline-flex">Cancel and go back</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
