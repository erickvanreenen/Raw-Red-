"use client";

import { useContactSheet } from "@/lib/contact-sheet-context";

export function BulkOrderCallout() {
  const { openContactSheet } = useContactSheet();

  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-panel bg-paper p-6 sm:p-8">
      <div>
        <h3 className="t-title text-[1.25rem]">Ordering 10kg or more?</h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
          We offer wholesale pricing for cafés, retailers, and events.
        </p>
      </div>
      <button
        type="button"
        onClick={openContactSheet}
        className="btn btn-secondary"
      >
        Enquire about bulk orders
      </button>
    </div>
  );
}
