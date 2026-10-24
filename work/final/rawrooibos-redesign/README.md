# Raw Rooibos redesign

A responsive redesign of rawrooibos.com, delivered as one HTML file with its photos in `images/` beside it. Open `index.html` in any modern browser. No build step; the only outside request is the Albert Sans font from Google Fonts.

Made 2026-10-24 with Erick's design process (Product Design Library, `run-brief.md`). The full record (brief, research, direction, UX and UI specs, design system, critique, measurement and every decision) is in `work/` in the project.

## What's in it
- Delivery terms at the top, a pinned header with a "Shop the rooibos" button, and the farm banner with the headline.
- Three craft steps: harvested by hand, dried in the sun, packed by hand.
- The shop: pack size, quantity, delivery line and "Add to cart · R {total}". On phones a buy bar follows you once the hero has scrolled away.
- The story, a bulk section with an enquiry form, the FAQ, a closing call to action and the footer.
- Working cart drawer (undo on remove) and bulk enquiry form (errors, sending, sent, offline). Checkout isn't connected; the button says so.
- Buttons follow pepperplane.com's pattern: short verb-first labels, 12px corners, a trailing arrow, one solid button per section with an arrow-text secondary.

## Before it goes live
These still show my proposed wording and need Erick's confirmation:
1. Delivery cost line: "Delivery cost shown at checkout." (or a threshold or flat rate)
2. Quantity cap of 20 per pack, with "Need more? Ask about bulk" at the limit
3. Craft step 2: "then sifted" left out unless it's true
4. FAQ 1: the reworded "What does unpasteurised actually change?" answer
5. Story: the antioxidant line (a health-related claim, unchanged from the live site)

QA was skipped for this run (decision D12). Not yet checked: screen readers, real devices, landscape phones, reduced motion in a browser, POPIA and the Google Fonts request, and a walkthrough with five people.

## For the move into the Next.js app
- Tokens, component specs, DESIGN.md, UX.md and all approved copy: `work/05-system/`.
- Analytics hooks: elements carry `data-event` and `data-source` (table in `work/05-system/UX.md`). Nothing is tracked yet.
- Measurement plan and next-iteration options: `work/08-measurement.md`.
