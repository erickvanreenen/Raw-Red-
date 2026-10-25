"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useCart } from "./cart-context";
import { MAX_QTY, rawRooibos } from "./products";
import { announce } from "./ui";

// The chosen pack size, shared by the buy box and the phone buy bar.
interface PackContextValue {
  packId: string;
  setPackId: (id: string) => void;
}

const PackContext = createContext<PackContextValue | null>(null);

export function PackProvider({ children }: { children: ReactNode }) {
  const { lastSizeId } = useCart();
  const [packId, setPackId] = useState("250g");

  // Repeat buyers start on the pack they bought last.
  useEffect(() => {
    if (lastSizeId && rawRooibos.sizes.some((s) => s.id === lastSizeId)) setPackId(lastSizeId);
  }, [lastSizeId]);

  return <PackContext.Provider value={{ packId, setPackId }}>{children}</PackContext.Provider>;
}

export function usePack() {
  const ctx = useContext(PackContext);
  if (!ctx) throw new Error("usePack must be used within a PackProvider");
  return ctx;
}

// Adds up to the per-line cap and announces what happened.
export function useAddToCart() {
  const { items, addItem } = useCart();
  return (sizeId: string, qty: number) => {
    const size = rawRooibos.sizes.find((s) => s.id === sizeId);
    if (!size) return 0;
    const current = items.find((i) => i.sizeId === sizeId)?.quantity ?? 0;
    const add = Math.max(0, Math.min(MAX_QTY - current, qty));
    if (add > 0) addItem(size, add);
    if (add === qty) announce(`Added ${qty} × ${sizeId} to your cart`);
    else if (add > 0) announce(`Added ${add} × ${sizeId}. Need more? Ask about bulk`);
    else announce(`You already have ${MAX_QTY} × ${sizeId}. Need more? Ask about bulk`);
    return add;
  };
}
