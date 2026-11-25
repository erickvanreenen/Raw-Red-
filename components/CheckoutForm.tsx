"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, rawRooibos } from "@/lib/products";
import { PROVINCES, type DeliveryOption } from "@/lib/shipping";
import { Icon } from "./Icons";

const inputClasses =
  "min-h-12 w-full rounded-field border-[1.5px] border-edge bg-paper px-4 py-3 text-base text-ink transition-colors duration-150 ease-out-quart focus:border-ember aria-[invalid=true]:border-2 aria-[invalid=true]:border-ember-deep";

const labelClasses = "t-label mb-1.5 block";

type FieldName = "email" | "phone" | "name" | "address" | "suburb" | "city" | "province" | "postal";

const FIELDS: Record<FieldName, { label: string; msg: string; ok: (v: string) => boolean }> = {
  email: { label: "Email", msg: "Enter an email address like name@example.co.za", ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  phone: { label: "Mobile number", msg: "Enter a 10-digit mobile number like 082 123 4567, for the courier", ok: (v) => /^(\+27|0)\d{9}$/.test(v.replace(/[\s()-]/g, "")) },
  name: { label: "Full name", msg: "Enter your full name", ok: (v) => v.length > 0 },
  address: { label: "Street address", msg: "Enter your street address", ok: (v) => v.length > 0 },
  suburb: { label: "Suburb", msg: "Enter your suburb", ok: (v) => v.length > 0 },
  city: { label: "City or town", msg: "Enter your city or town", ok: (v) => v.length > 0 },
  province: { label: "Province", msg: "Choose your province", ok: (v) => PROVINCES.some((p) => p.code === v) },
  postal: { label: "Postal code", msg: "Enter your 4-digit postal code", ok: (v) => /^\d{4}$/.test(v) },
};
const ORDER = Object.keys(FIELDS) as FieldName[];
const EMPTY: Record<FieldName, string> = { email: "", phone: "", name: "", address: "", suburb: "", city: "", province: "", postal: "" };
const ADDRESS_FIELDS: FieldName[] = ["address", "suburb", "city", "province", "postal"];

const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" });
const rand = formatPrice;

// `online`: Paystack and Bob Go are configured, so the customer sees live delivery prices and pays on Paystack.
// Otherwise the order opens in the customer's email app, addressed to the shop inbox (D14).
export function CheckoutForm({ online, demo = false }: { online: boolean; demo?: boolean }) {
  const { items, subtotal, clearCart } = useCart();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [summary, setSummary] = useState<FieldName[] | null>(null);
  const [sent, setSent] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [options, setOptions] = useState<DeliveryOption[] | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [busy, setBusy] = useState<"quote" | "pay" | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const optionsRef = useRef<HTMLLegendElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);

  // A quote is tied to the address and cart it was priced for.
  const cartKey = items.map((i) => `${i.sizeId}:${i.quantity}`).join(",");
  useEffect(() => {
    setOptions(null);
    setChosen(null);
  }, [cartKey]);

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

  const fields = online ? ORDER : (["email", "name", "address", "city", "postal"] as FieldName[]);
  const option = options?.find((o) => o.id === chosen) ?? null;
  const total = subtotal + (option?.price ?? 0);

  function set(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field] && FIELDS[field].ok(value.trim())) setErrors((e) => ({ ...e, [field]: false }));
    if (options && ADDRESS_FIELDS.includes(field)) {
      setOptions(null);
      setChosen(null);
    }
  }

  // Validate on leaving a field once something was typed, or if it is already flagged.
  function blur(field: FieldName) {
    const v = values[field].trim();
    if (v || errors[field]) setErrors((e) => ({ ...e, [field]: !FIELDS[field].ok(v) }));
  }

  function validate() {
    const v = Object.fromEntries(ORDER.map((f) => [f, values[f].trim()])) as Record<FieldName, string>;
    const bad = fields.filter((f) => !FIELDS[f].ok(v[f]));
    setErrors(Object.fromEntries(fields.map((f) => [f, bad.includes(f)])));
    if (bad.length) {
      setSummary(bad);
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return null;
    }
    setSummary(null);
    return v;
  }

  const payload = (v: Record<FieldName, string>) => ({
    address: { ...v, phone: v.phone.replace(/[\s()-]/g, "") },
    items: items.map((i) => ({ sizeId: i.sizeId, quantity: i.quantity })),
  });

  function fail(message: string) {
    setProblem(message);
    window.setTimeout(() => problemRef.current?.focus(), 0);
  }

  async function post(url: string, body: unknown) {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error ?? "Something went wrong. Try again in a minute.");
    return json;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const v = validate();
    if (!v) return;
    setProblem(null);
    if (!online) return emailOrder(v);

    if (!options) {
      setBusy("quote");
      try {
        const { options: found } = (await post("/api/delivery/quote", payload(v))) as { options: DeliveryOption[] };
        if (found.length === 0) return fail("No courier delivers to that address at the moment. Check the address, or email us and we'll sort it out.");
        setOptions(found);
        setChosen(found[0].id);
        window.setTimeout(() => optionsRef.current?.focus(), 0);
      } catch (err) {
        fail((err as Error).message);
      } finally {
        setBusy(null);
      }
      return;
    }

    if (!option) return fail("Choose a delivery option.");
    setBusy("pay");
    try {
      const { url } = (await post("/api/checkout", { ...payload(v), quoteToken: option.token })) as { url: string };
      window.location.assign(url);
    } catch (err) {
      fail((err as Error).message);
      setBusy(null);
    }
  }

  function emailOrder(v: Record<FieldName, string>) {
    const lines = items.map(
      (item) => `${item.quantity} × ${rawRooibos.name} ${item.label} (${formatPrice(item.price)} each) = ${formatPrice(item.price * item.quantity)}`
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

  const describe = (f: FieldName) => (errors[f] ? `${f}-error` : undefined);
  const error = (f: FieldName) =>
    errors[f] && (
      <p className="field-error mt-2" id={`${f}-error`}>
        <Icon name="alert" />
        <span>{FIELDS[f].msg}</span>
      </p>
    );

  const field = (f: FieldName, type: string, autoComplete: string, inputMode?: "numeric" | "tel") => (
    <>
      <label htmlFor={f} className={labelClasses}>
        {FIELDS[f].label}
      </label>
      <input
        id={f}
        name={f}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className={inputClasses}
        value={values[f]}
        onChange={(e) => set(f, e.target.value)}
        onBlur={() => blur(f)}
        aria-invalid={errors[f] || undefined}
        aria-describedby={describe(f)}
      />
      {error(f)}
    </>
  );

  const buttonLabel = !online
    ? "Email my order"
    : busy === "quote"
      ? "Finding couriers…"
      : busy === "pay"
        ? "Opening secure payment…"
        : options
          ? `Pay ${rand(total)}`
          : "See delivery options";

  return (
    <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_380px] lg:gap-14">
      <form onSubmit={submit} noValidate className="order-2 rounded-panel bg-paper p-6 sm:p-8 lg:order-1">
        <h1 className="t-headline">Checkout</h1>
        {demo && (
          <p className="mt-3 rounded-card bg-clay p-3 text-sm text-ink" role="note">
            Demo mode: delivery prices and payment are pretend. No money moves and nothing is booked.
          </p>
        )}

        {summary && (
          <div className="error-summary mt-6" ref={summaryRef} tabIndex={-1}>
            <h3>Check {summary.length} thing{summary.length === 1 ? "" : "s"} before {options ? "paying" : "continuing"}</h3>
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
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className={online ? "" : "sm:col-span-2"}>{field("email", "email", "email")}</div>
            {online && <div>{field("phone", "tel", "tel", "tel")}</div>}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="t-title text-[1.25rem]">Delivery address</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">{field("name", "text", "name")}</div>
            <div className="sm:col-span-2">{field("address", "text", "address-line1")}</div>
            {online && <div>{field("suburb", "text", "address-level3")}</div>}
            <div>{field("city", "text", "address-level2")}</div>
            {online && (
              <div>
                <label htmlFor="province" className={labelClasses}>{FIELDS.province.label}</label>
                <select
                  id="province"
                  name="province"
                  autoComplete="address-level1"
                  className={inputClasses}
                  value={values.province}
                  onChange={(e) => set("province", e.target.value)}
                  onBlur={() => blur("province")}
                  aria-invalid={errors.province || undefined}
                  aria-describedby={describe("province")}
                >
                  <option value="">Choose…</option>
                  {PROVINCES.map((p) => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
                {error("province")}
              </div>
            )}
            <div>{field("postal", "text", "postal-code", "numeric")}</div>
          </div>
        </fieldset>

        {online && options && (
          <fieldset className="mt-8">
            <legend className="t-title text-[1.25rem]" ref={optionsRef} tabIndex={-1}>Delivery</legend>
            <div className="mt-4 grid gap-3">
              {options.map((o) => (
                <label key={o.id} className="rate">
                  <input type="radio" name="delivery" value={o.id} checked={chosen === o.id} onChange={() => setChosen(o.id)} />
                  <span className="rate-name">{o.name}</span>
                  <span className="rate-price">{rand(o.price)}</span>
                  {o.minDate && o.maxDate && (
                    <span className="rate-when">
                      Arrives {o.minDate === o.maxDate ? shortDate(o.minDate) : `${shortDate(o.minDate)} to ${shortDate(o.maxDate)}`}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {problem && (
          <div className="error-summary mt-6" ref={problemRef} tabIndex={-1} role="alert">
            <h3>{problem}</h3>
          </div>
        )}

        {!online && (
          <div className="mt-8 rounded-card bg-clay p-5">
            <p className="text-[0.9375rem] leading-relaxed text-ink">
              Online payment isn&apos;t connected yet. Placing your order opens your email app with
              everything filled in. Send it, and we&apos;ll reply to confirm the delivery cost and arrange
              payment.
            </p>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg mt-6 w-full sm:w-auto" aria-disabled={busy ? true : undefined}>
          {buttonLabel}
          <Icon name="arrow" />
        </button>
        {online && options && (
          <p className="note mt-3">
            You&apos;ll pay on Paystack&apos;s secure page by card, Instant EFT or Capitec Pay, then come back here.
          </p>
        )}
      </form>

      <aside className="order-1 h-fit rounded-panel bg-paper p-6 sm:p-8 lg:order-2">
        <h2 className="t-title text-[1.25rem]">Order summary</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.sizeId} className="flex items-center justify-between gap-4 text-base text-ink">
              <span>
                {rawRooibos.name}, {item.label} <span className="text-ink-soft">× {item.quantity}</span>
              </span>
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-5 text-base text-ink">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {online ? (
          <>
            <div className="mt-2 flex items-center justify-between text-base text-ink">
              <span>Delivery</span>
              <span>{option ? rand(option.price) : "Add your address"}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-lg font-semibold text-ink">
              <span>Total</span>
              <span>{rand(total)}</span>
            </div>
          </>
        ) : (
          <p className="mt-1 text-sm text-ink-soft">Delivery cost confirmed by email.</p>
        )}
      </aside>
    </div>
  );
}
