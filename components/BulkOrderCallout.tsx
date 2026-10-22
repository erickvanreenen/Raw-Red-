"use client";

import { useContactSheet } from "@/lib/contact-sheet-context";

export function BulkOrderCallout() {
  const { openContactSheet } = useContactSheet();

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-card bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="t-title text-[1.25rem]">Ordering 10kg or more?</h3>
        <p className="mt-1 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          We offer wholesale pricing for cafés, retailers, and events.
        </p>
      </div>
      <button
        type="button"
        onClick={openContactSheet}
        className="btn btn-secondary shrink-0"
      >
        Enquire about bulk orders
      </button>
    </div>
  );
}
