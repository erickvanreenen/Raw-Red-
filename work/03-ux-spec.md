# UX spec: rawrooibos.com redesign (concept B)

Stage 3, 2026-10-24. Skills used: 03-ux-design/conceptual-model, 03-ux-design/information-architecture, 03-ux-design/user-flows, 03-ux-design/states-and-errors, 03-ux-design/form-design, 03-ux-design/ux-writing, 03-ux-design/wireframe-spec.
Inputs: `02-direction.md` (concept B, principles 1 to 6), D09, `01-research.md`, current copy in `lib/products.ts` and `components/`.
AI behaviour: not applicable (no AI features).

Copy marked **[keep]** is the live site's wording unchanged. **[new]** is mine. **[confirm]** needs Erick before it ships.

## 1. Conceptual model (03-ux-design/conceptual-model)

| Object | What it is to the buyer | Attributes | Actions |
|---|---|---|---|
| Pack | One size of the tea you can buy | size (100g, 250g, 500g), price (R85, R165, R295) | choose |
| Cart line | A pack and how many | pack, quantity (1 to 20), line total | add, change quantity, remove |
| Cart | What you're about to order | lines, subtotal, item count | open, go to checkout |
| Bulk enquiry | A request for 10kg or more | name, email, business (optional), amount needed, message (optional) | send |

Set aside (content, not objects): story, craft steps, FAQ answers.

**Bulk enquiry states:** draft → sending → sent, or draft → sending → failed → draft (input kept). No other states.

**Cart line quantity:** 1 to 20 per pack **[confirm]**. At 20 × 500g the order reaches 10kg, the bulk threshold, so the stepper's upper limit points to bulk instead. This cap is my proposal, not a current rule.

**Vocabulary, one name per concept**
| Concept | Use | Not | Why |
|---|---|---|---|
| Size choice | pack size | size, weight | Live label "Pack size" [keep] |
| 10kg+ orders | bulk | wholesale | Live site uses both (01-research glossary); "bulk" is the buyer's word for the amount, "wholesale" is the seller's word for the price |
| Getting it to you | delivery | shipping | More natural in South Africa; FAQ question becomes "Where do you deliver?" |
| Where items wait | cart | basket, bag | Live site [keep] |
| The process | unpasteurised | raw (as a process word) | "Raw" stays in the brand name and headline only (principle 6) |

## 2. Information architecture (03-ux-design/information-architecture)

One page. Order of places (concept B):
1. Delivery strip
2. Header
3. Hero (D06 banner, headline, two CTAs)
4. Craft steps (three)
5. Shop (photo + buy box, details)
6. Story
7. Bulk
8. FAQ
9. Closing CTA
10. Footer
Plus overlays: cart drawer, bulk enquiry dialog, phone buy bar.

**Navigation:** top navigation, four anchors: Shop, Our story, Bulk orders, FAQ. Cart button with item count. Desktop also shows the primary "Shop the rooibos" button in the header (pepperplane pattern, F4).
**Phones:** logo, cart, and a "Menu" button with a visible text label that opens the four anchors. This hides primary navigation, which the skill advises against. It is accepted because the page is one scroll, every section is reachable by scrolling, and the buy bar keeps the main action visible.
**Wayfinding:** each anchor lands on its section's h2 with the h2 receiving focus (tabindex -1), so keyboard and screen-reader users land where sighted users do. The header stays pinned and section headings get scroll-margin so the header never covers them.

## 3. Flows (03-ux-design/user-flows)

### Current flow (for comparison)
Banner → headline (fading in) → "Shop the rooibos" → shop (1601px down on a phone) → size → add. Delivery only in the FAQ. Bulk only via a link inside the shop. Page ends at the FAQ.

### J1 Repeat buyer reorders their usual pack
"I know my size; let me just get to it."
```
Hero
- Shop the rooibos -> Shop (h2 focused)
- (phone, scrolls past hero) -> Buy bar appears
Buy bar (phones)
[pack size select, preselected 250g; Add to cart · R 165]
- change pack size -> button total updates
- Add to cart · R 165 -> Added confirmation; cart count +1; bar stays
Shop
[photo; name; price per pack; pack size; quantity; Add to cart · R 165; delivery line]
- pick pack size -> price and button total update; buy bar mirrors the choice
- − / + -> quantity 1 to 20; button total updates
- Add to cart -> inline "Added to your cart. View cart →"; header count +1; live region announces
- View cart -> Cart drawer
Cart drawer
[lines; quantity steppers; Remove; subtotal; delivery note; Go to checkout]
- Go to checkout -> (outside this file) checkout. In the file: a note that checkout isn't connected
- Close / Esc / click outside -> back where you were, focus returns to the trigger
```
Happy path on a phone: tap "Shop the rooibos", pick size, tap Add: 3 taps from landing. Or from anywhere below the hero: pick size in the bar, tap Add: 2 taps.

### J2 First-time visitor
Banner and headline say what it is and why (T2) → craft steps → shop, with the delivery line under the button → story → FAQ ("Is unpasteurised safe to drink?") → closing CTA "Shop the rooibos".

### J3 Café or shop owner asks about bulk
```
Nav "Bulk orders" or scroll -> Bulk block
[Ordering 10kg or more? short line; Ask about bulk]
- Ask about bulk -> Bulk enquiry dialog (focus on first field)
Also entered from: closing CTA secondary; quantity stepper at its limit ("Need more? Ask about bulk")
Bulk enquiry dialog
- Send enquiry, fields valid -> Sending… -> Sent state
- Send enquiry, fields invalid -> error summary at top, focus moves to it; each error under its field
- Send enquiry, offline -> Failed state, input kept, Try again
- Close / Esc -> confirm only if fields have text: "Discard your enquiry?" Keep writing / Discard
Sent state
[Thanks, {name}. message; Done]
- Done -> dialog closes, focus returns to the button that opened it
```

### Input methods
All actions are native `<button>`, `<a>`, `<select>` or form controls, so keyboard, pointer and touch all work. Drawer and dialog use `<dialog>` with `showModal()` for built-in focus trapping and Esc. Focus order follows visual order. Targets at least 44 × 44px; pack size options 48px high. The buy bar sits last in the DOM so it is reached after the page content, never before it.

## 4. States and errors (03-ux-design/states-and-errors)

| Component | Empty | Loading | Partial / edge | Success | Error | Way out |
|---|---|---|---|---|---|---|
| Page and photos | n/a | Photos have fixed width and height and a sage fill behind them, so nothing jumps; hero photo loads eagerly, others lazily. **No content is hidden waiting for animation** (principle 1). | Slow connection: text and buttons usable before photos arrive | n/a | Photo fails: sage block with alt text, layout unchanged | n/a |
| Buy box | n/a | n/a | Quantity at 1: − disabled-looking but announced "Minimum is 1". At 20: + stops, line "Need more? Ask about bulk" appears | Inline "Added to your cart. View cart →" for 4s; header count updates; `aria-live="polite"` "Added 2 × 250g to your cart" | n/a (no server) | View cart |
| Buy bar (phones) | n/a | n/a | Hidden: at the top of the page, while the shop box is on screen, while the cart or bulk dialog is open, when the viewport is under 520px tall, and when text is enlarged to 150% or more (bet B2 mitigation) | Same confirmation as the buy box, shown above the bar | n/a | Scroll; it never blocks the footer because the page adds bottom padding equal to the bar's height while it shows |
| Cart drawer | "Your cart is empty." [keep] plus "Shop the rooibos" button, which closes the drawer and moves to the shop | n/a | Remove a line: line disappears, "Removed 250g. Undo" for 5s | n/a | n/a | Close, Esc, Undo |
| Checkout (prototype only) | | | "Go to checkout" shows: "Checkout isn't connected in this design file." [new] | | | Close |
| Bulk enquiry | Fields empty with labels | Button reads "Sending…" and is busy (`aria-busy`), about 1 second | Close with text typed: confirm discard | Sent state | Field errors on leaving a field; summary on submit; offline: failed state | Try again, email link, Close |

## 5. Bulk enquiry form (03-ux-design/form-design)
Single column, labels above fields, optional fields marked.
| Field | Type | Label | Hint | Error (on leaving the field) |
|---|---|---|---|---|
| Name | text, autocomplete name | Your name | | Enter your name |
| Email | email, autocomplete email | Email | | Enter an email address like name@yourcafe.co.za |
| Business | text, autocomplete organization | Business name (optional) | | |
| Amount | text | How much do you need? | Roughly is fine, like 25kg a month | Tell us roughly how much you need |
| Message | textarea | Anything else? (optional) | | |
Error summary on submit: "Check 2 things before sending" with links to each field. Input is trimmed; nothing is lost on error.

## 6. CTA system and copy (03-ux-design/ux-writing)

### The label set (one label, one outcome; principle 3, F5)
| Label | Outcome | Where | Style |
|---|---|---|---|
| Shop the rooibos | Scroll to the shop, focus its heading (closes the cart first if open) | Header (desktop), hero, empty cart, closing block | Primary |
| See our story | Scroll to the story | Hero | Secondary |
| Add to cart · R {total} | Add the chosen pack and quantity | Buy box, buy bar | Primary |
| View cart | Open the cart drawer | Add confirmation | Secondary |
| Go to checkout | Checkout | Cart drawer | Primary |
| Ask about bulk | Open the bulk enquiry dialog | Bulk block, closing block, stepper limit | Primary in the bulk block, secondary elsewhere (principle 4) |
| Send enquiry | Send the form | Bulk dialog | Primary |
| Try again | Resend after a failure | Bulk dialog | Primary |
| Done | Close the sent state | Bulk dialog | Primary |

**Two styles only** (F4): primary is a solid button with a trailing arrow; secondary is arrow text with no border. One primary per block. Buttons in the buy box and dialogs stay full width on phones. Shape (pill versus pepperplane's 12px) is decided at G4.

### Voice
Plain, warm, short (live brand voice, 01-research). Verb-first buttons. No exclamation marks, no "simply", no health claims. Sentence case.

### Copy by place
**Delivery strip** [new, facts from FAQ]: "Delivered across South Africa in 2 to 4 working days"
**Hero** [keep]: h1 "Steeped raw, not stripped down." Lead "Unpasteurised rooibos from a small family farm. Hand-harvested, sun-dried, and left alone."
**Craft steps** [new, facts from the story copy and photos]: h2 "From the bush to your cup"
1. "Harvested by hand": "Cut on our family farm, row by row."
2. "Dried in the sun": "Left to dry in the open air, then sifted."
3. "Packed by hand": "Every bag weighed and packed by the two of us."
**[confirm]** "then sifted": I don't know your processing steps after drying; drop it unless true.
**Shop** [keep]: h2 "Raw Rooibos", tagline "Unpasteurised. Steeped raw.", description from `products.ts`, details (Ingredients, How to brew, Good to know).
Delivery line above the quantity and Add to cart row (moved there on 2026-10-24 after the stage 5 AI test, so it is read before committing) [new]: "Delivered in South Africa in 2 to 4 working days. Delivery cost shown at checkout." **[confirm]** a free-delivery threshold or flat rate, if you have one.
**Story** [keep]: h2 "Two sisters, one farm, no shortcuts." and both paragraphs. **[confirm]** "softens the leaf's natural antioxidants" is a health-related claim already on the live site; compliance-check (stage 7) will look at it.
**Bulk block** [new, facts from the live dialog]: h2 "Ordering 10kg or more?" Body: "We supply cafés, shops and events. Tell us what you need and we'll come back with bulk pricing, usually within a couple of working days." CTA "Ask about bulk".
**FAQ** h2 [keep] "Questions people ask before their first order". Questions:
1. "What does unpasteurised actually change?" Answer, rewritten for principle 6 **[confirm]**: "Pasteurising rooibos after harvest is standard practice. It reduces bacteria on the leaf and evens out the colour from batch to batch. We skip that step so the leaf keeps more of its natural character, which is why our batches can vary a little in colour and taste. Always brew it with freshly boiled water."
2. "Is it caffeine-free?" [keep]
3. "How should I store it?" [keep, with one change for F-storage clarity] "Keep it sealed, away from sunlight and heat. It keeps for 18 to 24 months and tastes best in the first year."
4. "Where do you deliver?" [keep facts] "Anywhere in South Africa, usually in 2 to 4 working days. You'll see the delivery cost at checkout, based on your address."
**Closing block** [new]: h2 "Ready for your next pot?" Body: "Pick your pack size and we'll get it to you in 2 to 4 working days." CTAs: "Shop the rooibos" (primary), "Ask about bulk" (secondary).
**Footer** [keep]: tagline "Unpasteurised rooibos. Family-farmed, hand-packed.", anchors, "© 2026 Raw Rooibos. All rights reserved.", plus email hello@rawrooibos.com (from `products.ts`).
**Bulk dialog** h2 "Ask about bulk". Intro [keep, reworded]: "Tell us what you need and we'll reply with bulk pricing and lead times, usually within a couple of working days." Sent: "Thanks, {name}. Your enquiry is with us. We'll reply to {email}, usually within a couple of working days." Failed: "We couldn't send that. Check your connection and try again, or email hello@rawrooibos.com."

## 7. Wireframe spec (03-ux-design/wireframe-spec)
Mid fidelity, real copy above. Widths checked: 375, 768, 1280.

| # | Place | 375px | 768px | 1280px | Notes |
|---|---|---|---|---|---|
| 1 | Delivery strip | One line, wraps to two at 200% text | One line | One line | `<p>`, not a link |
| 2 | Header (pinned) | Logo, cart (count), Menu | Logo, 4 anchors, cart | Logo, 4 anchors, cart, "Shop the rooibos" | `<header>`, `<nav aria-label="Main">` |
| 3 | Hero | Banner 4:3, headline, lead, CTAs stacked full width | Banner 16:9; CTAs inline | Banner 21:9; headline left, CTAs right (D06) | h1; banner `farm-golden-hour`, alt from live site; content visible on first paint |
| 4 | Craft steps | Three stacked rows: photo thumb, title, line | Three columns | Three columns | h2; photos: `bale-in-field`, `drying-yard-red`, `harvest-shed` |
| 5 | Shop | Photo, then buy box, then details | Photo and buy box side by side (D07) | Same, max 1200px | h2 `#shop`; pack size is a radio group in a fieldset with legend "Pack size" |
| 6 | Story | Photo, text, 3-photo gallery stacked | 2 columns | 2 columns | h2 `#story` |
| 7 | Bulk | Card, CTA full width | Card, text left, CTA right | Same | h2 `#bulk` |
| 8 | FAQ | `<details>` rows | Same, max 760px | Same | h2 `#faq` |
| 9 | Closing | Stacked, full-width CTAs | Inline | Inline | h2 |
| 10 | Footer | Stacked | 3 columns | 3 columns | `<footer>` |
| — | Buy bar | Pinned bottom, select + button, under 768px only | none | none | `<aside aria-label="Quick add">`, last in DOM |
| — | Cart drawer | Full screen | Right panel 420px | Same | `<dialog>`, h2 "Your cart" |
| — | Bulk dialog | Full screen | Centred 560px | Same | `<dialog>`, h2 "Ask about bulk" |

**Motion:** none required. Optional: 150ms colour change on buttons, drawer slide 200ms; all off under `prefers-reduced-motion`. Nothing animates opacity on content.

**Checked against UX laws** (`references/ux-laws.md`): one primary per block (Hick); large, frequent targets: Add to cart full width on phones (Fitts); standard drawer and FAQ patterns (Jakob).

## 8. Open items carried to G3
- Photos embedded in the file or alongside it (G0 Q2): the spec works either way.
- Free-delivery threshold or flat rate (G1 Q5).
- Quantity cap of 20 per pack.
- "Then sifted" in craft step 2.
- Reworded FAQ 1 and the antioxidant line (compliance, stage 7).
- Bulk priority (G0 Q4): spec keeps bulk as the side door (principle 4).

## AI check (00-governance/ai-output-check)
Accuracy 4/5, relevance 5/5, completeness 5/5, clarity 4/5, fit 5/5.
Unverified: "then sifted" (marked [confirm]); quantity cap (marked as proposal). Every other fact traces to the live copy or `products.ts`. No new health or safety claim added; the FAQ rewrite removes the implication that skipping pasteurisation has no trade-off.
