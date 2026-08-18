"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-200 ease-out-quart ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-none transition-transform duration-260 ease-out-quart ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sand px-5 py-4">
          <h2 className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-ink">
            Your cart
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-sand"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-ink/70">
              Your cart is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.sizeId} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium text-ink">
                      Raw Red Rooibos — {item.label}
                    </p>
                    <p className="mt-1 font-sans text-xs text-ink/70">
                      {formatPrice(item.price)} each
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-sand">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.sizeId, item.quantity - 1)
                          }
                          aria-label={`Decrease quantity of ${item.label}`}
                          className="flex h-8 w-8 items-center justify-center text-ink hover:bg-sand"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-sans text-xs tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.sizeId, item.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${item.label}`}
                          className="flex h-8 w-8 items-center justify-center text-ink hover:bg-sand"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.sizeId)}
                        className="font-sans text-xs text-ink/60 underline decoration-sand underline-offset-2 hover:text-rooibos-red"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="font-sans text-sm font-medium text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sand px-5 py-5">
            <div className="flex items-center justify-between font-sans text-sm text-ink">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 font-sans text-xs text-ink/60">
              Shipping calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-md bg-rooibos-red px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-cream transition-colors duration-180 ease-out-quart hover:bg-deep-russet"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
