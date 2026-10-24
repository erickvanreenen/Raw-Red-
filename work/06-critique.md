# Critique: rawrooibos.com redesign

Stage 7 of the line (library stage 06), 2026-10-24. Skills used: 06-design-critique/brief-traceability, 06-design-critique/heuristic-review, 06-design-critique/critique-screen, 06-design-critique/coherence-check, 06-design-critique/slop-check.
Subject: `work/final/rawrooibos-redesign/index.html`. Reviewer: one (me, the builder). The library advises two or three reviewers; a single builder-reviewer misses things, so the stage 8 walkthrough with real people matters more than usual.

## Findings to decide (G7: accept or reject each, with a reason)
Severity 0 to 4 (heuristic-review scale). "Route" says whether it's a surface fix or goes back to an earlier layer.

| # | Finding | Evidence | Sev | Proposed fix | Route |
|---|---|---|---|---|---|
| C1 | **On phones, "Shop the rooibos" lands on the shop photo, and Add to cart is still below the screen.** The core task (J1) needs a second scroll after the main CTA. | Measured at 375 × 812: after the jump, the photo takes 88 to 346px and Add to cart sits at 917 to 973px, under the 812px fold. The buy bar stays hidden because the buy box is on screen. | 3 | On phones, put the buy box first and the shop photo after it (photo order unchanged from 768px). Add to cart then sits at about 643px, inside the first screen. | Surface (layout); update `buy-box.md` |
| C2 | **Phones download desktop-sized photos.** Every photo ships at full size (up to 2000px wide, 340 to 490 KB) to a 375px screen, often on mobile data. | File sizes in `images/`; no `srcset`. | 2 | Generate 800px and 1600px versions with the `sharp` package already in the project, and add `srcset` and `sizes`. Hero on phones drops from about 340 KB to under 100 KB (estimate, to be measured). | Surface (build) |
| C3 | **At the cart's 20 limit, pressing + gives no visible feedback**, only a screen-reader announcement. Sighted users see nothing happen. | Cart stepper code; the buy box shows a visible line, the cart doesn't. | 2 | Show the same "Need more? Ask about bulk" line under that cart line. | Surface; update `cart-drawer.md` |
| C4 | **The delivery strip sits outside every landmark**, so screen-reader users navigating by landmark skip it, and automated audits flag it. | DOM: `<p class="strip">` before `<header>`. | 1 | Move it inside `<header>` above the bar row; it still scrolls away. | Surface |
| C5 | **Delivery wording appears four times** (strip, buy box, closing block, FAQ). Principle 2 asks for it before the button, which the strip and buy box already do. | Copy review. | 1 | Change the closing line to "Pick your pack size and we'll take it from there." [new copy, needs your OK] or keep as is. | Content (`content.md`) |
| C6 | **Two "Shop the rooibos" buttons in the first desktop screen** (header and hero). Same label, same outcome, so not confusing, but two solid green shapes compete. | 1280 × 800 view. Pepperplane does the same (header CTA always visible). | 1 | Keep (recommended: matches the reference and the label rule), or hide the header CTA until the hero buttons scroll away. | Surface |
| C7 | **The UX.md label table is missing five labels the page uses**: Remove, Undo, Keep writing, Discard, Menu. They are in `content.md`, so the copy is approved, but the "one label, one outcome" table is incomplete. | Coherence check against UX.md. | 1 | Add them to the table. | System (`UX.md`) |
| C8 | **Success metrics can't be measured from this file**: no analytics events. | Brief traceability, measurement domain. | 1 | Add `data-event` attributes (`add_to_cart`, `bulk_enquiry_sent`, `hero_shop_click`, `closing_shop_click`) so the port to the app has them named. No tracking code. | Hand-off (stage 9) |
| C9 | **Fonts load from Google**, which sends visitors' IP addresses to Google. Possibly relevant under POPIA. | `<link>` to fonts.googleapis.com. | 1 | Route to compliance-check in stage 8; self-hosting Albert Sans (open licence) is the usual fix. | QA (stage 8) |

## Brief traceability (brief-traceability)
| Brief line | Status | Evidence |
|---|---|---|
| Criterion 1: first screen says what and why | Met | Phone: h1, lead ("small family farm", "unpasteurised") and CTA within 812px. Desktop: within 800px after the banner cap |
| Criterion 2: Add to cart within one screen of scrolling on 375px | Partly met | Via the buy bar, yes: it appears once the hero scrolls away. Via the hero CTA, no: see C1 |
| Criterion 3: fixed label set, two styles | Met, docs incomplete | All CTAs use primary or arrow-text secondary; see C7 for the table |
| Criterion 4: 375 to 1280px, 200% text, keyboard, contrast | Met, with gaps | Checked in the browser (G6 record); screen readers and real devices not yet |
| Criterion 5: Erick judges it current, earthy, not stale | Met | G6 taste pass |
| Constraint: "Raw Rooibos", no "Raw Red", no "organic" | Met | Text search of the file |
| Constraint: real photos only | Met | Six farm photos; logo is the placeholder mark (D01) |
| Constraint: no gradients, shadows, glass | Met | None in the CSS |
| Constraint: light only | Met | `color-scheme: light` |
| Out of scope respected | Met | No checkout, backend, logo, subscriptions or invented facts |
| Ripple: CTA labels carried into the app | Owner named | Erick, at hand-off |
| Ripple: delivery facts true | Open | Awaiting Erick's confirmation on cost |
| Reverse check: design items no brief line asked for | None found | Craft steps trace to research (signature moment); menu and buy bar trace to the spec |

## Heuristic review (heuristic-review), J1 and J3 walked as new and repeat visitor
| Heuristic | Result |
|---|---|
| 1 Status visible | Pass: add confirmation, cart count, sending state; C3 is the gap |
| 2 User's language | Pass: pack size, delivery, bulk |
| 3 Undo, exit | Pass: undo on remove, Esc everywhere, discard confirm |
| 4 Consistency | Pass: one label per outcome; C6 noted |
| 5 Error prevention | Pass: pack sizes as choices, quantity limits, trimmed input |
| 6 Recognition over recall | Pass: prices on pack options |
| 7 Novice and expert | Pass: buy bar for repeat buyers, story path for first-timers |
| 8 Minimal design | Minor: C5 |
| 9 Errors explained | Pass: field errors, summary, failed state with email |
| 10 Help in context | Pass: delivery line at the buy box, FAQ |

## Screen critique (critique-screen) against the ranked principles
1. Content before motion: honoured (no reveal animations; content visible on first paint).
2. Price and delivery before the button: honoured.
3. One label, one outcome: honoured (C7 is documentation only).
4. One main door, one side door: honoured (bulk is primary only inside its block).
5. Craft as steps: honoured (three steps with real photos).
6. "Unpasteurised" with care: honoured in the FAQ wording; the story's antioxidant line is still flagged for compliance.

## Coherence check (coherence-check)
- Vocabulary: no stray "shipping", "wholesale", "basket" or "size" (as a noun for packs) on the page.
- Objects: the pack looks the same in the buy box, bar and cart ("250g", price in the shared format).
- Prominence: the green primary button is the strongest shape in every block.
- Emotional register: plain and warm; no sales language.
- Accessibility decided, not defaulted: focus targets, names and announcements are all specified (C4 is the gap).

## Slop check (slop-check)
- Interface: no gradients, emoji, glass, centred-everything, one-radius-everywhere (12, 20 and 28px used by role). No placeholder imagery or lorem ipsum.
- Writing: no filler, no "not X, it's Y" lines, no inflated claims. "Ready for your next pot?" is a mild flourish; acceptable in the brand voice.

## AI check (00-governance/ai-output-check)
Accuracy 4/5, relevance 5/5, completeness 4/5, clarity 4/5, fit 5/5. C2's saving is an estimate and labelled as such. One reviewer only, stated above.

## Outcomes (after G7, 2026-10-24)
| # | Decision | Outcome | Verified |
|---|---|---|---|
| C1 | Accepted | Buy box first in the DOM and on phones; photo moves left from 768px with CSS order | 375 × 812: after "Shop the rooibos", Add to cart sits at 644 to 700px (was 917 to 973). 1280: photo left, buy box right, unchanged |
| C2 | Accepted | 800px, up to 1600px, and 400px (step thumbnails) versions with srcset and sizes; originals removed from `work/final/rawrooibos-redesign/images/` | Phone loads `farm-golden-hour-800.jpg` (61 KB, was 340 KB); 1280 loads the 1600px version (220 KB) |
| C3 | Accepted | Cart line at 20 shows "Need more? Ask about bulk"; it closes the cart, opens bulk, and focus returns to the cart button after | Run in the browser: line visible, cart closed, bulk focused on name, focus back on "Cart, 20 items" |
| C4 | Accepted | Strip inside `<header>`; header sticks at minus the strip's measured height (38px at 375) | Strip inside the landmark; after scrolling, the header top is at -38px, so only the bar row stays pinned |
| C5 | Rejected (Erick: reassurance) | No change | |
| C6 | Rejected (Erick: matches pepperplane) | No change | |
| C7 | Accepted | UX.md label table completed | |
| C8 | Accepted | `data-event` and `data-source` on 11 elements; comment marks where `bulk_enquiry_sent` fires; table in UX.md | 11 hooks found in the page |
| C9 | Accepted, routed | Goes to stage 8 compliance-check | |
No horizontal scroll at 375 or 1280 after the fixes. System files updated to match: buy-box.md, cart-drawer.md, delivery-strip.md, DESIGN.md (photos), UX.md (labels, analytics hooks).
