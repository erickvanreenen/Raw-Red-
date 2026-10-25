import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { CraftSteps } from "@/components/CraftSteps";
import { ProductSection } from "@/components/ProductSection";
import { StorySection } from "@/components/StorySection";
import { BulkSection } from "@/components/BulkSection";
import { FAQSection } from "@/components/FAQSection";
import { ClosingSection } from "@/components/ClosingSection";
import { Footer } from "@/components/Footer";
import { BuyBar } from "@/components/BuyBar";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <CraftSteps />
        <ProductSection />
        <StorySection />
        <BulkSection />
        <FAQSection />
        <ClosingSection />
      </main>
      <Footer />
      {/* Last in the DOM so keyboard users reach it after the page content. */}
      <BuyBar />
    </>
  );
}
