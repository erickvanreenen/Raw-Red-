"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, rawRooibos } from "@/lib/products";
import { Icon } from "./Icons";

const inputClasses =
  "min-h-12 w-full rounded-field border-[1.5px] border-edge bg-paper px-4 py-3 text-base text-ink transition-colors duration-150 ease-out-quart focus:border-ember aria-[invalid=true]:border-2 aria-[invalid=true]:border-ember-deep";

const labelClasses = "t-label mb-1.5 block";

type FieldName = "email" | "name" | "address" | "city" | "postal";

const FIELDS: Record<FieldName, { label: string; msg: string; ok: (v: string) => boolean }> = {
  email: { label: "Email", msg: "Enter an email address like name@example.co.za", ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  name: { label: "Full name", msg: "Enter your full name", ok: (v) => v.length > 0 },
  address: { label: "Street address", msg: "Enter your street address", ok: (v) => v.length > 0 },
  city: { label: "City", msg: "Enter your city or town", ok: (v) => v.length > 0 },
  postal: { label: "Postal code", msg: "Enter your postal code", ok: (v) => v.length > 0 },
};
const ORDER = Object.keys(FIELDS) as FieldName[];
const EMPTY: Record<FieldName, string> = { email: "", name: "", address: "", city: "", postal: "" };

// The site has no payment or order backend, so placing an order opens the customer's email app with the
// order filled in, addressed to the shop inbox. Nothing is claimed as sent until they send it.
export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [summary, setSummary] = useState<FieldName[] | null>(null);
  const [sent, setSent] = useState(false);
  const [cleared, setCleared] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);

  if (items.length === 0 && !sent) {
    return (
      <div className="mx-auto my-16 max-w-xl rounded-panel bg-paper px-6 py-14 text-center sm:px-8">
        <h1 className="t-title">Your cart is empty</h1>
        <p className="mt-2 text-base text-ink-soft">
          Add a pack of rooibos and it will show up here.
        </p>
        <Link href="/#shop" className="btn btn-primary mt-6">
          Shop the rooibos<Icon name="arrow" />
        </Link>
      </div>
    );
  }

  function set(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field] && FIELDS[field].ok(value.trim())) setErrors((e) => ({ ...e, [field]: false }));
  }

  // Validate on leaving a field once something was typed, or if it is already flagged.
  function blur(field: FieldName) {
    const v = values[field].trim();
    if (v || errors[field]) setErrors((e) => ({ ...e, [field]: !FIELDS[field].ok(v) }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = Object.fromEntries(ORDER.map((f) => [f, values[f].trim()])) as Record<FieldName, string>;
    const bad = ORDER.filter((f) => !FIELDS[f].ok(v[f]));
    setErrors(Object.fromEntries(ORDER.map((f) => [f, bad.includes(f)])));
    if (bad.length) {
      setSummary(bad);
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setSummary(null);
    const lines = items.map(
      (item) => `${item.quantity} × Raw Rooibos ${item.label} (${formatPrice(item.price)} each) = ${formatPrice(item.price * item.quantity)}`
    );
    const body = [
      "Order",
      ...lines,
      `Subtotal: ${formatPrice(subtotal)} (delivery cost to be confirmed)`,
      "",
      "Deliver to",
      v.name,
      v.address,
      `${v.city} ${v.postal}`,
      "",
      `Email: ${v.email}`,
    ].join("\n");
    const subject = `Order from ${v.name}: ${items.map((i) => `${i.quantity} × ${i.label}`).join(", ")}`;
    window.location.href = `mailto:${rawRooibos.bulkContactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.setTimeout(() => sentRef.current?.focus(), 0);
  }

  if (sent) {
    return (
      <div className="mx-auto my-16 max-w-xl rounded-panel bg-paper px-6 py-14 text-center sm:px-8">
        <h1 className="t-headline" ref={sentRef} tabIndex={-1}>
          Almost done, {values.name.trim()}.
        </h1>
        <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.65] text-ink-soft">
          Your email app should have opened with your order filled in. Press send there and we&apos;ll
          reply to {values.email.trim()} to confirm the delivery cost and arrange payment. Nothing
          opened? Email your order to{" "}
          <a className="font-semibold text-ink underline underline-offset-4" href={`mailto:${rawRooibos.bulkContactEmail}`}>
            {rawRooibos.bulkContactEmail}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col items-center gap-2">
          {cleared ? (
            <p className="text-sm text-ink-soft" role="status">Your cart is cleared.</p>
          ) : (
            items.length > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  clearCart();
                  setCleared(true);
                }}
              >
                I&apos;ve sent it, clear my cart
              </button>
            )
          )}
          <Link href="/" className="link">
            Back to Raw Rooibos<Icon name="arrow" />
          </Link>
        </div>
      </div>
    );
  }

  const field = (f: FieldName, type: string, autoComplete: string) => (
    <>
      <label htmlFor={f} className={labelClasses}>
        {FIELDS[f].label}
      </label>
      <input
        id={f}
        name={f}
        type={type}
        autoComplete={autoComplete}
        className={inputClasses}
        value={values[f]}
        onChange={(e) => set(f, e.target.value)}
        onBlur={() => blur(f)}
        aria-invalid={errors[f] || undefined}
        aria-describedby={errors[f] ? `${f}-error` : undefined}
      />
      {errors[f] && (
        <p className="field-error mt-2" id={`${f}-error`}>
          <Icon name="alert" />
          <span>{FIELDS[f].msg}</span>
        </p>
      )}
    </>
  );

  return (
    <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_380px] lg:gap-14">
      <form onSubmit={submit} noValidate className="order-2 rounded-panel bg-paper p-6 sm:p-8 lg:order-1">
        <h1 className="t-headline">Checkout</h1>

        {summary && (
          <div className="error-summary mt-6" ref={summaryRef} tabIndex={-1}>
            <h3>Check {summary.length} thing{summary.length === 1 ? "" : "s"} before placing your order</h3>
            <ul>
              {summary.map((f) => (
                <li key={f}>
                  <a
                    href={`#${f}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(f)?.focus();
                    }}
                  >
                    {FIELDS[f].msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className="mt-8">
          <legend className="t-title text-[1.25rem]">Contact</legend>
          <div className="mt-4">{field("email", "email", "email")}</div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="t-title text-[1.25rem]">Delivery address</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">{field("name", "text", "name")}</div>
            <div className="sm:col-span-2">{field("address", "text", "street-address")}</div>
            <div>{field("city", "text", "address-level2")}</div>
            <div>{field("postal", "text", "postal-code")}</div>
          </div>
        </fieldset>

        <div className="mt-8 rounded-card bg-clay p-5">
          <p className="text-[0.9375rem] leading-relaxed text-ink">
            Online payment isn&apos;t connected yet. Placing your order opens your email app with
            everything filled in. Send it, and we&apos;ll reply to confirm the delivery cost and arrange
            payment.
          </p>
        </div>

        <button type="submit" className="btn btn-primary btn-lg mt-6 w-full sm:w-auto">
          Email my order<Icon name="arrow" />
        </button>
      </form>

      <aside className="order-1 h-fit rounded-panel bg-paper p-6 sm:p-8 lg:order-2">
        <h2 className="t-title text-[1.25rem]">Order summary</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.sizeId} className="flex items-center justify-between gap-4 text-base text-ink">
              <span>
                Raw Rooibos, {item.label} <span className="text-ink-soft">× {item.quantity}</span>
              </span>
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-5 text-lg font-semibold text-ink">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 text-sm text-ink-soft">Delivery cost confirmed by email.</p>
      </aside>
    </div>
  );
}
