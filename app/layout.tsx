import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import { ContactSheetProvider } from "@/lib/contact-sheet-context";
import { ContactSheet } from "@/components/ContactSheet";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raw Red — Organic Rooibos",
  description:
    "Organic, unpasteurised, small-batch rooibos. Steeped raw. Sold direct.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
        <CartProvider>
          <ContactSheetProvider>
            {children}
            <CartDrawer />
            <ContactSheet />
          </ContactSheetProvider>
        </CartProvider>
      </body>
    </html>
  );
}
