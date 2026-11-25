// Delivery data the browser and the server both use. No secrets here.

export const PROVINCES = [
  { code: "WC", name: "Western Cape" },
  { code: "EC", name: "Eastern Cape" },
  { code: "NC", name: "Northern Cape" },
  { code: "FS", name: "Free State" },
  { code: "KZN", name: "KwaZulu-Natal" },
  { code: "NW", name: "North West" },
  { code: "GP", name: "Gauteng" },
  { code: "MP", name: "Mpumalanga" },
  { code: "LP", name: "Limpopo" },
] as const;

export type ProvinceCode = (typeof PROVINCES)[number]["code"];

// Packed size and weight of one pack, used to price the courier. ESTIMATES: Erick to weigh and measure a
// packed pouch of each size and correct these, or quotes will be off.
export const PACK_PARCEL: Record<string, { weightKg: number; lengthCm: number; widthCm: number; heightCm: number }> = {
  "100g": { weightKg: 0.15, lengthCm: 18, widthCm: 12, heightCm: 5 },
  "250g": { weightKg: 0.32, lengthCm: 22, widthCm: 15, heightCm: 6 },
};

export interface DeliveryAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  city: string;
  province: ProvinceCode;
  postal: string;
}

// One delivery option as the checkout shows it. `token` is the server's signature over the option, the
// address and the cart, so the price cannot be changed in the browser.
export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  minDate: string | null;
  maxDate: string | null;
  token: string;
}

// A pack size without measurements (e.g. a new size added to the shop) still gets a rough parcel, so quotes
// keep working; add real numbers to PACK_PARCEL when the size is added.
export function parcelFor(sizeId: string, grams: number) {
  return PACK_PARCEL[sizeId] ?? { weightKg: Math.round(grams * 1.3) / 1000, lengthCm: 26, widthCm: 18, heightCm: 8 };
}
