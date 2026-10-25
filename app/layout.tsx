import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import { ContactSheetProvider } from "@/lib/contact-sheet-context";
import { ContactSheet } from "@/components/ContactSheet";
import { PackProvider } from "@/lib/pack-context";
import { InPageNav } from "@/components/InPageNav";
import { IconSprite } from "@/components/Icons";

// next/font serves Albert Sans from this site, so visitors' browsers make no request to Google.
const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-albert",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raw Rooibos | Unpasteurised rooibos from a family farm",
  description:
    "Unpasteurised rooibos from a small family farm. Hand-harvested, sun-dried, and left alone. Delivered across South Africa in 2 to 4 working days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={albert.variable}>
      <body>
        <IconSprite />
        <CartProvider>
          <ContactSheetProvider>
            <PackProvider>
              {children}
              <CartDrawer />
              <ContactSheet />
              <InPageNav />
            </PackProvider>
          </ContactSheetProvider>
        </CartProvider>
        <div className="vh" role="status" aria-live="polite" id="announcer" />
      </body>
    </html>
  );
}
