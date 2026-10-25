"use client";

import { useRef, useState, type FormEvent } from "react";
import { useContactSheet } from "@/lib/contact-sheet-context";
import { rawRooibos } from "@/lib/products";
import { useDialog } from "@/lib/ui";
import { Icon } from "./Icons";

type FieldName = "name" | "email" | "amount";

const RULES: Record<FieldName, { msg: string; ok: (v: string) => boolean }> = {
  name: { msg: "Enter your name", ok: (v) => v.length > 0 },
  email: { msg: "Enter an email address like name@yourcafe.co.za", ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  amount: { msg: "Tell us roughly how much you need", ok: (v) => v.length > 0 },
};
const FIELD_IDS: Record<FieldName, string> = { name: "f-name", email: "f-email", amount: "f-amount" };
const EMPTY = { name: "", email: "", business: "", amount: "", message: "" };

// Bulk enquiry (work/05-system/components/bulk-dialog.md). The site has no backend, so a valid enquiry
// opens the visitor's email app with everything filled in, addressed to the bulk inbox.
export function ContactSheet() {
  const { isOpen, closeContactSheet } = useContactSheet();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [summary, setSummary] = useState<FieldName[] | null>(null);
  const [discarding, setDiscarding] = useState(false);
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);

  const hasDraft = !sent && Object.values(values).some((v) => v.trim());

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setSummary(null);
    setDiscarding(false);
    setSent(false);
  }

  function requestClose() {
    if (hasDraft) {
      setDiscarding(true);
      window.setTimeout(() => keepRef.current?.focus(), 0);
      return;
    }
    closeContactSheet();
    if (sent) window.setTimeout(reset, 200);
  }

  const dialogRef = useDialog(isOpen, requestClose, () => document.querySelector<HTMLElement>(".cart-btn"));

  function set(field: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in RULES && errors[field as FieldName] && RULES[field as FieldName].ok(value.trim())) {
      setErrors((e) => ({ ...e, [field]: false }));
    }
  }

  // Validate on leaving a field once something was typed, or if it is already flagged.
  function blur(field: FieldName) {
    const v = values[field].trim();
    if (v || errors[field]) setErrors((e) => ({ ...e, [field]: !RULES[field].ok(v) }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const bad = (Object.keys(RULES) as FieldName[]).filter((f) => !RULES[f].ok(values[f].trim()));
    setErrors(Object.fromEntries((Object.keys(RULES) as FieldName[]).map((f) => [f, bad.includes(f)])));
    if (bad.length) {
      setSummary(bad);
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setSummary(null);
    const v = Object.fromEntries(Object.entries(values).map(([k, val]) => [k, val.trim()])) as typeof EMPTY;
    const body = [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      v.business && `Business: ${v.business}`,
      `How much: ${v.amount}`,
      v.message && `\n${v.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    const subject = `Bulk enquiry from ${v.business || v.name}`;
    window.location.href = `mailto:${rawRooibos.bulkContactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.setTimeout(() => sentRef.current?.focus(), 0);
  }

  const describedBy = (field: FieldName, hint?: string) =>
    [hint, errors[field] ? `e-${field}` : null].filter(Boolean).join(" ") || undefined;

  return (
    <dialog ref={dialogRef} className="sheet" aria-labelledby="bulk-dialog-title">
      <div className="dlg">
        <div className="dlg-head">
          <h2 className="t-title" id="bulk-dialog-title">Ask about bulk</h2>
          <button type="button" className="close-btn" onClick={requestClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="dlg-body">
          {discarding ? (
            <div className="discard">
              <p className="t-label">Discard your enquiry?</p>
              <div className="cta-row">
                <button
                  ref={keepRef}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setDiscarding(false);
                    window.setTimeout(() => document.getElementById("f-name")?.focus(), 0);
                  }}
                >
                  Keep writing
                </button>
                <button
                  type="button"
                  className="link"
                  onClick={() => {
                    closeContactSheet();
                    window.setTimeout(reset, 200);
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          ) : sent ? (
            <div className="state">
              <h3 className="t-title" ref={sentRef} tabIndex={-1}>Almost done, {values.name.trim()}.</h3>
              <p className="secondary">
                Your email app should have opened with your enquiry filled in. Press send there and we&apos;ll
                reply to {values.email.trim()}, usually within a couple of working days. Nothing opened? Email
                us at <a href={`mailto:${rawRooibos.bulkContactEmail}`}>{rawRooibos.bulkContactEmail}</a>.
              </p>
              <button type="button" className="btn btn-primary" onClick={requestClose}>Done</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <p className="secondary">
                Tell us what you need and we&apos;ll reply with bulk pricing and lead times, usually within a
                couple of working days.
              </p>
              {summary && (
                <div className="error-summary" ref={summaryRef} tabIndex={-1}>
                  <h3>Check {summary.length} thing{summary.length === 1 ? "" : "s"} before sending</h3>
                  <ul>
                    {summary.map((f) => (
                      <li key={f}>
                        <a
                          href={`#${FIELD_IDS[f]}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(FIELD_IDS[f])?.focus();
                          }}
                        >
                          {RULES[f].msg}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Field id="f-name" label="Your name" error={errors.name ? RULES.name.msg : null} errorId="e-name">
                <input
                  id="f-name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={errors.name || undefined}
                  aria-describedby={describedBy("name")}
                />
              </Field>
              <Field id="f-email" label="Email" error={errors.email ? RULES.email.msg : null} errorId="e-email">
                <input
                  id="f-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={errors.email || undefined}
                  aria-describedby={describedBy("email")}
                />
              </Field>
              <Field id="f-business" label="Business name (optional)">
                <input
                  id="f-business"
                  type="text"
                  autoComplete="organization"
                  value={values.business}
                  onChange={(e) => set("business", e.target.value)}
                />
              </Field>
              <Field
                id="f-amount"
                label="How much do you need?"
                hint="Roughly is fine, like 25kg a month"
                error={errors.amount ? RULES.amount.msg : null}
                errorId="e-amount"
              >
                <input
                  id="f-amount"
                  type="text"
                  value={values.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  onBlur={() => blur("amount")}
                  aria-invalid={errors.amount || undefined}
                  aria-describedby={describedBy("amount", "f-amount-hint")}
                />
              </Field>
              <Field id="f-message" label="Anything else? (optional)">
                <textarea
                  id="f-message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </Field>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                data-event="bulk_enquiry_submit"
              >
                Send enquiry<Icon name="arrow" />
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label className="t-label" htmlFor={id}>{label}</label>
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      {error && (
        <p className="field-error" id={errorId}>
          <Icon name="alert" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
