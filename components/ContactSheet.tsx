"use client";

import { useEffect, useState } from "react";
import { useContactSheet } from "@/lib/contact-sheet-context";
import { rawRedRooibos } from "@/lib/products";

const inputClasses =
  "min-h-12 w-full rounded-sm border border-sand bg-white px-4 py-3 font-sans text-base text-ink outline-none transition-colors duration-150 ease-out-quart focus:border-2 focus:border-rooibos-red";

const labelClasses =
  "mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink";

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
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-200 ease-out-quart ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Bulk order enquiry"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-none transition-transform duration-260 ease-out-quart ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sand px-5 py-4">
          <h2 className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-ink">
            Bulk &amp; wholesale enquiry
          </h2>
          <button
            type="button"
            onClick={closeContactSheet}
            aria-label="Close"
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

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {submitted ? (
            <div className="pt-8 text-center">
              <h3 className="font-sans text-lg font-medium text-ink">
                Thanks — we&apos;ll be in touch
              </h3>
              <p className="mx-auto mt-3 max-w-[40ch] text-sm leading-relaxed text-ink/80">
                We usually reply within a couple of working days with
                wholesale pricing and lead times. In a hurry? Email us
                directly at{" "}
                <a
                  href={`mailto:${rawRedRooibos.bulkContactEmail}`}
                  className="text-ink underline decoration-sand underline-offset-2 hover:text-rooibos-red"
                >
                  {rawRedRooibos.bulkContactEmail}
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
              <p className="text-sm leading-relaxed text-ink/80">
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
                  Company / café (optional)
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

              <button
                type="submit"
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded-md bg-rooibos-red px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-cream transition-[background-color,transform] duration-180 ease-out-quart hover:bg-deep-russet active:scale-[0.97]"
              >
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
