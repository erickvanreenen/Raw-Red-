import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import { ContactSheetProvider } from "@/lib/contact-sheet-context";
import { ContactSheet } from "@/components/ContactSheet";

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raw Rooibos | Organic Unpasteurised Rooibos",
  description:
    "Organic, unpasteurised, small-batch rooibos. Steeped raw. Sold direct.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={albert.variable}>
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
