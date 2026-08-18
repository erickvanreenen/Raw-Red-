export interface TeaSize {
  id: string;
  label: string;
  grams: number;
  price: number;
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  sizes: TeaSize[];
  details: ProductDetail[];
  bulkContactEmail: string;
}

export const rawRedRooibos: Product = {
  id: "raw-red-rooibos",
  name: "Raw Red Rooibos",
  tagline: "Organic. Unpasteurised. Steeped raw.",
  description:
    "Hand-harvested on a small family farm and left unpasteurised, so the leaf keeps more of what made it worth picking in the first place. Naturally caffeine-free, low in tannins, and good hot, iced, or steeped strong.",
  sizes: [
    { id: "100g", label: "100g", grams: 100, price: 85 },
    { id: "250g", label: "250g", grams: 250, price: 165 },
    { id: "500g", label: "500g", grams: 500, price: 295 },
  ],
  details: [
    {
      label: "Ingredients",
      value:
        "100% organic rooibos (Aspalathus linearis). Unpasteurised, no additives, no flavouring.",
    },
    {
      label: "How to brew",
      value:
        "One heaped teaspoon per cup. Steep in freshly boiled water for 5–7 minutes, strain, and serve hot or over ice.",
    },
    {
      label: "Good to know",
      value:
        "Naturally caffeine-free and low in tannins, so it's gentle enough to drink throughout the day.",
    },
  ],
  bulkContactEmail: "hello@rawred.co.za",
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
