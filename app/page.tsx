import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { StorySection } from "@/components/StorySection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProductSection />
        <StorySection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
