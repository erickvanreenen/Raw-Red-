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
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ease-out-quart ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper transition-transform duration-300 ease-out-quart sm:rounded-l-panel ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        {...(isOpen ? {} : { inert: true })}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="t-title">Your cart</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sage"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-base text-ink-soft">
              Your cart is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.sizeId} className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-base font-semibold text-ink">
                      Raw Rooibos, {item.label}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {formatPrice(item.price)} each
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="inline-flex items-center rounded-full border-[1.5px] border-edge">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sizeId, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.label}`}
                          className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-ink hover:bg-sage"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sizeId, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.label}`}
                          className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-ink hover:bg-sage"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.sizeId)}
                        className="min-h-11 text-sm font-medium text-ink-soft underline underline-offset-4 hover:text-ember"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="pt-0.5 text-base font-semibold text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="rounded-t-panel bg-sage px-6 py-6">
            <div className="flex items-center justify-between text-base text-ink">
              <span>Subtotal</span>
              <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">Shipping calculated at checkout.</p>
            <Link href="/checkout" onClick={closeCart} className="btn btn-primary mt-5 min-h-14 w-full">
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
