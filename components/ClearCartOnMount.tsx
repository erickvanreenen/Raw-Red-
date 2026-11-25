"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";

// Empties the cart once a paid order is confirmed. Clears storage too: this effect runs before the cart
// provider reloads the saved cart, so the provider then finds nothing to restore.
export function ClearCartOnMount() {
  const { clearCart } = useCart();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    try {
      window.localStorage.removeItem("rawrooibos-cart");
    } catch {
      // storage unavailable
    }
    clearCart();
  }, [clearCart]);
  return null;
}
