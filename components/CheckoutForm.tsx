"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

const inputClasses =
  "min-h-12 w-full rounded-sm border border-sand bg-white px-4 py-3 font-sans text-base text-ink outline-none transition-colors duration-150 ease-out-quart focus:border-2 focus:border-rooibos-red";

const labelClasses =
  "mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink";

export function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <p className="font-sans text-base text-ink/80">
          Your cart is empty.
        </p>
        <Link
          href="/#product"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-rooibos-red px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-cream transition-colors duration-180 ease-out-quart hover:bg-deep-russet"
        >
          Shop the rooibos
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-sans text-2xl font-medium text-ink">
          Thanks — almost there
        </h1>
        <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.65] text-ink/80">
          Your details are saved. Online payment isn&apos;t connected yet, so
          we&apos;ll follow up by email to confirm your order and arrange
          payment.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md border border-sand px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors duration-180 ease-out-quart hover:bg-sand"
        >
          Back to Raw Red
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_360px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        noValidate
        className="order-2 lg:order-1"
      >
        <h1 className="font-sans text-2xl font-medium text-ink">Checkout</h1>

        <fieldset className="mt-8">
          <legend className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-ink">
            Contact
          </legend>
          <div className="mt-4">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClasses}
            />
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-ink">
            Delivery address
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className={labelClasses}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClasses}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className={labelClasses}>
                Street address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                autoComplete="street-address"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="city" className={labelClasses}>
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="postal" className={labelClasses}>
                Postal code
              </label>
              <input
                id="postal"
                name="postal"
                type="text"
                required
                autoComplete="postal-code"
                className={inputClasses}
              />
            </div>
          </div>
        </fieldset>

        <div className="mt-8 rounded-md border border-sand bg-sand p-4">
          <p className="font-sans text-xs leading-relaxed text-ink/80">
            Online payment (Instant EFT, card) isn&apos;t connected yet.
            Submitting this form saves your order details; we&apos;ll email
            you to confirm and arrange payment.
          </p>
        </div>

        <button
          type="submit"
          className="mt-6 flex min-h-12 w-full items-center justify-center rounded-md bg-rooibos-red px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-cream transition-colors duration-180 ease-out-quart hover:bg-deep-russet sm:w-auto"
        >
          Place order
        </button>
      </form>

      <aside className="order-1 h-fit rounded-lg bg-sand p-6 lg:order-2">
        <h2 className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-ink">
          Order summary
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.sizeId}
              className="flex items-center justify-between font-sans text-sm text-ink"
            >
              <span>
                Raw Red Rooibos — {item.label}{" "}
                <span className="text-ink/60">× {item.quantity}</span>
              </span>
              <span className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-sand pt-4 font-sans text-base font-medium text-ink">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 font-sans text-xs text-ink/60">
          Shipping calculated after order confirmation.
        </p>
      </aside>
    </div>
  );
}
