"use client";

import { useContactSheet } from "@/lib/contact-sheet-context";

export function BulkOrderCallout() {
  const { openContactSheet } = useContactSheet();

  return (
    <div className="mt-10 flex flex-col gap-4 rounded-lg bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-sans text-sm font-medium text-ink">
          Ordering 10kg or more?
        </h3>
        <p className="mt-1 max-w-[45ch] text-sm leading-relaxed text-ink/70">
          We offer wholesale pricing for cafés, retailers, and events.
        </p>
      </div>
      <button
        type="button"
        onClick={openContactSheet}
        className="flex min-h-12 shrink-0 items-center justify-center rounded-md border border-sand px-6 font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink transition-[background-color,transform] duration-180 ease-out-quart hover:bg-sand active:scale-[0.97]"
      >
        Enquire about bulk orders
      </button>
    </div>
  );
}
