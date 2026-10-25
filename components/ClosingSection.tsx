"use client";

import { useContactSheet } from "@/lib/contact-sheet-context";
import { Icon } from "./Icons";

export function ClosingSection() {
  const { openContactSheet } = useContactSheet();
  return (
    <section className="section" aria-labelledby="closing-title">
      <div className="wrap">
        <div className="closing on-inverse">
          <div>
            <h2 className="t-headline" id="closing-title">Ready for your next pot?</h2>
            <p>Pick your pack size and we&apos;ll get it to you in 2 to 4 working days.</p>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary btn-lg" href="/#shop" data-event="shop_click" data-source="closing">
              Shop the rooibos<Icon name="arrow" />
            </a>
            <button
              type="button"
              className="link"
              data-event="bulk_open"
              data-source="closing"
              onClick={openContactSheet}
            >
              Ask about bulk<Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
