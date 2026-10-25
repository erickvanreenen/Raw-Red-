"use client";

import { useContactSheet } from "@/lib/contact-sheet-context";
import { Icon } from "./Icons";

export function BulkSection() {
  const { openContactSheet } = useContactSheet();
  return (
    <section className="section" id="bulk" aria-labelledby="bulk-title">
      <div className="wrap">
        <div className="panel bulk">
          <div>
            <h2 className="t-headline" id="bulk-title" tabIndex={-1}>Ordering 10kg or more?</h2>
            <p className="measure">
              We supply cafés, shops and events. Tell us what you need and we&apos;ll come back with bulk
              pricing, usually within a couple of working days.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-event="bulk_open"
            data-source="bulk_block"
            onClick={openContactSheet}
          >
            Ask about bulk<Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
