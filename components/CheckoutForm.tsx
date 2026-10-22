"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

const inputClasses =
  "min-h-12 w-full rounded-field border-[1.5px] border-edge bg-paper px-4 py-3 text-base text-ink transition-colors duration-150 ease-out-quart focus:border-ember";

const labelClasses = "t-label mb-1.5 block";

export function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <h1 className="t-title">Your cart is empty</h1>
        <p className="mt-2 text-base text-ink-soft">
          Add a pack of rooibos and it will show up here.
        </p>
        <Link href="/#product" className="btn btn-primary mt-6">
          Shop the rooibos
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <h1 className="t-headline">Thanks, almost there</h1>
        <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.65] text-ink-soft">
          Your details are saved. Online payment isn&apos;t connected yet, so
          we&apos;ll follow up by email to confirm your order and arrange
          payment.
        </p>
        <Link href="/" className="btn btn-secondary mt-6">
          Back to Raw Rooibos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_380px] lg:gap-14">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        noValidate
        className="order-2 lg:order-1"
      >
        <h1 className="t-headline">Checkout</h1>

        <fieldset className="mt-8">
          <legend className="t-title text-[1.25rem]">Contact</legend>
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
          <legend className="t-title text-[1.25rem]">Delivery address</legend>
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

        <div className="mt-8 rounded-card bg-clay p-5">
          <p className="text-[0.9375rem] leading-relaxed text-ink">
            Online payment (Instant EFT, card) isn&apos;t connected yet.
            Submitting this form saves your order details; we&apos;ll email
            you to confirm and arrange payment.
          </p>
        </div>

        <button type="submit" className="btn btn-primary mt-6 min-h-14 w-full sm:w-auto">
          Place order
        </button>
      </form>

      <aside className="order-1 h-fit rounded-panel bg-sage p-6 sm:p-8 lg:order-2">
        <h2 className="t-title text-[1.25rem]">Order summary</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.sizeId}
              className="flex items-center justify-between gap-4 text-base text-ink"
            >
              <span>
                Raw Rooibos, {item.label}{" "}
                <span className="text-ink-soft">× {item.quantity}</span>
              </span>
              <span className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between border-t border-deep/20 pt-5 text-lg font-semibold text-ink">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Shipping calculated after order confirmation.
        </p>
      </aside>
    </div>
  );
}
