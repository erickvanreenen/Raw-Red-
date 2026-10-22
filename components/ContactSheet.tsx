"use client";

import { useEffect, useState } from "react";
import { useContactSheet } from "@/lib/contact-sheet-context";
import { rawRooibos } from "@/lib/products";

const inputClasses =
  "min-h-12 w-full rounded-field border-[1.5px] border-edge bg-paper px-4 py-3 text-base text-ink transition-colors duration-150 ease-out-quart focus:border-ember";

const labelClasses = "t-label mb-1.5 block";

export function ContactSheet() {
  const { isOpen, nameInputRef, closeContactSheet } = useContactSheet();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    nameInputRef.current?.focus();
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeContactSheet();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeContactSheet, nameInputRef]);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeContactSheet}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ease-out-quart ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Bulk order enquiry"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper transition-transform duration-300 ease-out-quart sm:rounded-l-panel ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        {...(isOpen ? {} : { inert: true })}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="t-title">Bulk &amp; wholesale enquiry</h2>
          <button
            type="button"
            onClick={closeContactSheet}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sage"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {submitted ? (
            <div className="rounded-panel bg-sage p-6 text-center">
              <h3 className="t-title">Thanks, we&apos;ll be in touch</h3>
              <p className="mx-auto mt-3 max-w-[40ch] text-base leading-relaxed text-ink-soft">
                We usually reply within a couple of working days with
                wholesale pricing and lead times. In a hurry? Email us
                directly at{" "}
                <a
                  href={`mailto:${rawRooibos.bulkContactEmail}`}
                  className="font-medium text-ink underline underline-offset-4 hover:text-ember"
                >
                  {rawRooibos.bulkContactEmail}
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              noValidate
            >
              <p className="text-base leading-relaxed text-ink-soft">
                Ordering 10kg or more? Tell us what you need and we&apos;ll
                come back to you with wholesale pricing.
              </p>

              <div className="mt-6">
                <label htmlFor="contact-name" className={labelClasses}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  ref={nameInputRef}
                  className={inputClasses}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="contact-email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClasses}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="contact-company" className={labelClasses}>
                  Company or café (optional)
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className={inputClasses}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="contact-quantity" className={labelClasses}>
                  Quantity needed
                </label>
                <input
                  id="contact-quantity"
                  name="quantity"
                  type="text"
                  required
                  placeholder="e.g. 25kg per month"
                  className={inputClasses}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="contact-message" className={labelClasses}>
                  Message (optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-6 min-h-14 w-full">
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
