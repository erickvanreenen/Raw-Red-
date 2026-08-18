"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { rawRedRooibos, type TeaSize } from "./products";

export interface CartItem {
  sizeId: string;
  label: string;
  grams: number;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  lastSizeId: string | null;
  subtotal: number;
  itemCount: number;
  addItem: (size: TeaSize, quantity: number) => void;
  updateQuantity: (sizeId: string, quantity: number) => void;
  removeItem: (sizeId: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "rawred-cart";
const LAST_SIZE_KEY = "rawred-last-size";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastSizeId, setLastSizeId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      setLastSizeId(window.localStorage.getItem(LAST_SIZE_KEY));
    } catch {
      // localStorage unavailable (private browsing, etc.) — cart just won't persist
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(size: TeaSize, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((item) => item.sizeId === size.id);
      if (existing) {
        return prev.map((item) =>
          item.sizeId === size.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          sizeId: size.id,
          label: size.label,
          grams: size.grams,
          price: size.price,
          quantity,
        },
      ];
    });
    window.localStorage.setItem(LAST_SIZE_KEY, size.id);
    setLastSizeId(size.id);
  }

  function updateQuantity(sizeId: string, quantity: number) {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.sizeId !== sizeId)
        : prev.map((item) =>
            item.sizeId === sizeId ? { ...item, quantity } : item
          )
    );
  }

  function removeItem(sizeId: string) {
    setItems((prev) => prev.filter((item) => item.sizeId !== sizeId));
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        lastSizeId,
        subtotal,
        itemCount,
        addItem,
        updateQuantity,
        removeItem,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export { rawRedRooibos };
