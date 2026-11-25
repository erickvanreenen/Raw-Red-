import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "@/components/CheckoutForm";
import { checkoutReady, isDemo } from "@/lib/server/config";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  // Until Paystack and Bob Go keys are set, checkout falls back to emailing the order (D14).
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <CheckoutForm online={checkoutReady()} demo={isDemo()} />
      </main>
      <Footer />
    </>
  );
}
