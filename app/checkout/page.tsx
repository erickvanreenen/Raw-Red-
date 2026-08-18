import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Nav />
      <main>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
