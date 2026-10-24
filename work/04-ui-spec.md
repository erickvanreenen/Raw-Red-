# UI spec: rawrooibos

Stage: 04-ui-design (single-stage run, 2026-10-22). Skills used: 00-governance/context-pack, 04-ui-design/visual-direction (and, once a direction is chosen: typography, colour, layout-and-spacing, motion, visual-hierarchy, compose-screen).

Status: G4 passed with risks (2026-10-22). Direction A chosen; font and hero revised after first build (D05). Built on branch `ui-fynbos-fresh`. G6 Taste: waiting for Erick.

## Direction

### Signals from the brief
- Erick's words: "stale and olde", dislikes the font, wants "earthy" that is not stale, generally dislikes the look.
- What reads old on the current site (my read, not tested with users): uppercase tracked headings in a geometric sans; near-flat sand and white with a single accent; stock photos that don't match the product (a grey-blue leaf close-up, and an Asian tea picker for a South African rooibos brand).
- Product: small-batch unpasteurised loose rooibos, direct to consumer; repeat buyers; mostly phones.
- Real asset now available: 17 farm photos (fields, red soil, harvest bales, the red leaf drying in the sun, a sunset). 14 are in `public/images/`, metadata stripped.

### Shortlisted styles (fit, risk)
- Modern fresh-botanical DTC: good fit; risk is looking like any wellness brand.
- Bold warm committed colour: strongest brand recall; risk is leaving the white-canvas direction Erick set earlier.
- Playful sticker/collage: most energetic; risk is personality that outgrows the product.
- Rejected: classic serif plus sans pairings (the "olde" look), editorial italic serif, dark/moody, glass.

### References and what to take from each
Erick supplied none beyond the mood folder, and I have not invented any he "admires". From the mood folder: the hand-drawn botanical line-art set (take: line illustration as a brand asset); the competitor Shopify page (take: buy-box conventions only, not the look).
getdesign.md was not consulted. The library's tested type pairings (`references/ui-data/typography.csv`) were checked: none of the three pairings below are in it, and the closest entries (Playfair/Inter, Lora/Raleway) are the classic look being rejected. So the fonts are my choice, not library-tested; all are free Google Fonts (open licence).

### Dials
| | A Fynbos Fresh | B Clay & Sun | C Rooibos Pop |
|---|---|---|---|
| Variance | medium | high | high |
| Motion | responsive | choreographed on load | playful, quick |
| Density | spacious | spacious | medium |

### Directions (live preview: `work/ui-directions.html`, served at localhost:4173)
**A. Fynbos Fresh.** White canvas, fynbos green and sage as the fresh counterpart to the red. Bricolage Grotesque (headings) with Figtree. Pills, an arch-cropped hero photo, rounded panels. Palette: #FFFFFF, #EAF0E3, #2F4B3A, #B03F1C, #F3E6D6, #1E2420.
**B. Clay & Sun.** Commits to rooibos red: a full red hero with cream type, the "sun" circle as the hero image frame (the drying-yard photo). Young Serif with Hanken Grotesk. Palette: #A93A1F, #FBF0E1, #F4B25E, #2B211E, #F1E2CE, #FFFFFF.
**C. Rooibos Pop.** White canvas, sun colours (tomato, amber) and leaf green; a photo collage, a highlighter on "raw", a sticker. Gabarito with Onest. Palette: #FFFFFF, #C23415, #FFC23C, #2E6B3F, #FDE7DA, #1B1512.

All pairings in the three palettes were calculated and pass AA (4.5:1 text). Two initial values failed by a hair (A ember #B8431F on clay 4.43; C tomato #D9411E on white 4.44) and were darkened before showing.

### Anti-patterns for this product
Gradients and shadows; stock photos; uppercase tracked small-caps headings; everything centred; one radius on everything; hero-metric tiles; icon-above-heading card grids; emoji as icons.

### Chosen direction and reason
**A, Fynbos Fresh** (Erick, D03). After seeing it built, Erick rejected two things: the Bricolage Grotesque font and the arch hero image. He chose **Albert Sans (F2)** at weight 500 for all type, and a **soft rounded rectangle with the golden-hour field photo (H2)** for the hero (D05).

## Photos (what each is, for alt text and placement)
| File | Shows | Suggested use |
|---|---|---|
| sunset-backlit | Rooibos backlit by a low sun, portrait | Hero (A), arch crop |
| farm-golden-hour | Bushes in golden light below a flat-topped cliff | Hero or story, wide |
| drying-yard-red | Red leaf drying on a floor behind a block wall | Product / "the leaf" (strongest red) |
| bale-in-field | A cut bale standing in a woven sack, mountains behind | Story, portrait |
| bales-in-row | Bales lying in a row, huge sky | Story, with text over the sky |
| rows-red-soil-sky | Rows on red soil, clouds, flat-topped cliff | Product section |
| rows-red-soil-portrait, field-rows-cliffs, bushes-plateau, valley-view | Field and landscape views | Supporting |
| flowers-macro | Rooibos with small yellow flowers; a person blurred in the distance | Supporting, detail |
| needles-texture | Rooibos needles close-up (cropped to remove a hand) | Texture strip |
| harvest-shed | Harvested rooibos in sacks in a shed | "How it's made" |
| tractor-rows | Tractor working a row | "How it's made" |
Not copied to the repo (near duplicates): three hazy field photos. Not shown anywhere: a finished packed bag or a cup of tea; none exists yet, and the site still lacks a product-pack photo.

## AI output check (00-governance/ai-output-check)
AI check: accuracy 4/5, relevance 5/5, completeness 3/5 (foundations shown as three previews, not yet as tokens), clarity 4/5, fit 4/5.
Unverified claims: "reads old" causes (my judgement); fonts' mood fit (my judgement); no numbers or facts about the farm were stated.
Failures: none critical. Low: sample headline is the existing copy, unchanged. Low: dark theme not designed (see decisions).

## Remaining after the choice
Foundations (type scale, colour roles, spacing, motion tokens) for the chosen direction; rebuild homepage, cart drawer, contact sheet, checkout on it; swap all placeholder photos; rewrite DESIGN.md; branch preview; G4 and G6 gates.

## Built (2026-10-22)
Tokens in `app/globals.css`; rules in `DESIGN.md`. Rebuilt: nav, hero, shop section and buy box, bulk callout, story section (with a three-photo farm strip), FAQ, footer, cart drawer, enquiry sheet, checkout. Old brand-sheet token files removed.

### Checks run
- Build passes (Next 15.1.9).
- Cart add, cart drawer, enquiry sheet focus on the Name field: pass. No console errors.
- 375px wide: no sideways scroll. 200 per cent text size: no sideways scroll, nothing clipped (G4 item).
- Touch targets: nav, footer and logo links raised to 44px high; footer links 44px wide.
- Colour pairings: calculated, all AA (see DESIGN.md).
### Not yet checked
- Real devices; screen reader pass; reduced-motion visual check; keyboard-only walk-through of checkout.
- The hero uses a 1.45x zoom on the photo to reduce sky; revisit with a better-framed shot.

---

# Redesign run, 2026-10-24: UI foundations

Stage 4 of the full line (`erick-design-process`). Skills used: 04-ui-design/visual-direction, 04-ui-design/layout-and-spacing, 04-ui-design/typography, 04-ui-design/colour, 04-ui-design/motion.
Direction: evolve Fynbos Fresh (D08). Everything in `DESIGN.md` stands unless changed below. Inputs: `01-research.md` F4 (pepperplane CTA measurements), `03-ux-spec.md` section 6 (CTA system).

## Visual direction: what changes and why
| Change | From | To | Why |
|---|---|---|---|
| Trailing arrow on every CTA | Text only | Text plus a 16px arrow icon, decorative (`aria-hidden`) | F4: pepperplane puts an arrow on every CTA; signals "this moves you on" |
| Secondary style | 1.5px Ink outline pill | Arrow text, no border, Ink, underline on hover; 48px tall hit area | F4: one solid primary, one quiet secondary per block |
| Button shape | Pill | **Open for G4:** pill (keep) or 12px soft rectangle (pepperplane) | F4, F12 |
| Dark moments | Footer only | Delivery strip and closing CTA block in Deep Fynbos as solid blocks | Pepperplane's dark hero and closing block give rhythm; stays within The Solid Block Rule (no gradients) |
| Primary on dark | n/a | Paper fill, Ink text; hover Sage fill | Ember on Deep Fynbos is 1.63:1, so Ember is never used on dark blocks |
| Reveal motion | Fade-in on load and scroll | None on content | F2, principle 1 |

Unchanged: palette, Albert Sans, sage canvas with white containers (D07), container radii 20 to 28px, flat surfaces, sentence case, real photos.

Dials: variance medium, motion minimal, density spacious.
Anti-patterns for this product (kept from the earlier run, plus): content hidden behind animation; ember on dark green; more than one primary per block; arrows on things that aren't actions (nav anchors, FAQ rows).

## Layout and spacing
Base unit 8px. Scale 4, 8, 12, 16, 24, 32, 48, 64, 96. Page max width 1200px; outer margin 16px on phones, 24px tablets, 48px desktop. Section gaps 64px phones, 96px desktop. Text capped at 60ch. Breakpoints 640, 768 (buy bar off, header button on), 1024. Targets 44px minimum, primary buttons 48px, Add to cart and pack sizes 56px. Buy bar 64px tall plus the safe-area inset.

## Typography
Albert Sans only, weights 400, 500, 600. Scale as in DESIGN.md (display clamp 2.75 to 5.25rem; headline 2 to 3.25rem; title 1.5rem; lead 1.1875rem; body 1rem; label 0.875rem). Button text 1rem, weight 600 (pepperplane uses 600 at 16px; matches Label weight). All sizes in rem, so text scales with browser settings.

## Colour: every pairing used, light theme only (D04)
Calculated 2026-10-24 (WCAG relative luminance).
| Pairing | Ratio | Use | Pass |
|---|---|---|---|
| Ink on Paper | 15.81 | Body text in containers | AA, AAA |
| Ink on Sage | 13.64 | Text on canvas, secondary CTA | AA, AAA |
| Ink Soft on Paper | 6.55 | Secondary text | AA |
| Ink Soft on Sage | 5.65 | Secondary text on canvas | AA |
| Paper on Deep Fynbos | 9.60 | Primary button text; strip, closing block, footer text | AA, AAA |
| Sage on Deep Fynbos | 8.28 | Secondary text on dark blocks | AA, AAA |
| Paper on Ember | 5.88 | Primary hover | AA |
| Paper on Ember Deep | 7.96 | Primary pressed | AA, AAA |
| Ember on Paper | 5.88 | Accent text, cart count | AA |
| Ember on Sage | 5.07 | Accent text on canvas | AA |
| Deep Fynbos on Paper / Sage | 9.60 / 8.28 | Selected pack size against its container (3:1 needed) | Pass |
| Edge on Paper / Sage | 4.04 / 3.49 | Control borders (3:1 needed) | Pass |
| Ink on Clay | 12.87 | Note panel | AA, AAA |
| Ember on Deep Fynbos | 1.63 | **Not allowed** | Fail, banned |
Focus ring: 2px Ink outline with 2px offset on light surfaces; 2px Paper outline on Deep Fynbos (9.60:1).

## Motion
Durations: 120ms (button colour), 200ms (drawer and dialog in), 160ms (out). Easing: ease-out entering, ease-in leaving. Press: scale 0.97 on transform. Under `prefers-reduced-motion`, all of it becomes instant. No scroll-triggered motion, no fade on content.

## Status
Preview of the open shape choice: `work/ui-cta-options.html`. G4 waiting for Erick.

## Checks on the preview (2026-10-24)
- 375px, normal text: no horizontal scroll; no button wraps or is clipped.
- 375px, 200% text: no horizontal scroll, nothing clipped; six buttons wrap to two lines, which is allowed (text balanced, centred).
- 726px, 200% text: no overflow.
- Found and fixed while checking: on phones "Add to cart · R 165" wrapped to three lines beside the stepper. **Rule:** under 520px the quantity stepper takes its own row and Add to cart goes full width beneath it (D07's side-by-side layout stays from 521px up). Hero and closing CTAs stack full width on phones. The header CTA is hidden on phones (spec: Menu button instead).
- Buttons stay on one line from 521px up (`white-space: nowrap`) and may wrap below that, so enlarged text never clips.

---

# Redesign run, 2026-10-24: screens

Stage 6. Skills used: 04-ui-design/visual-hierarchy, 04-ui-design/compose-screen.
Deliverable: `work/final/rawrooibos-redesign/index.html` with `work/final/rawrooibos-redesign/images/` beside it (D11). One HTML file, no build step, no external scripts; Albert Sans from Google Fonts. Built only from `work/05-system/` (tokens, components, DESIGN.md, UX.md, content.md).
Preview: `http://localhost:4173/work/final/rawrooibos-redesign/index.html` (launch config "design-preview").

## Hierarchy (visual-hierarchy)
| Level | Content | Treatment |
|---|---|---|
| Primary | h1 "Steeped raw, not stripped down."; "Shop the rooibos" | Display size; the only solid green shape in the hero |
| Secondary | Section h2s; price; Add to cart | Headline size; price 2.5rem inside the buy box; Add to cart is the only primary in its block |
| Tertiary | Lead, descriptions, step lines, FAQ questions | Body, `text-secondary` |
| Quaternary | Delivery line, footer legal | Small |
Squint test (judgement, phone and desktop screenshots): the banner, headline and green button read first; in the shop, the price and Add to cart; the closing block reads as the end of the page.

## Changes made while building (system kept in step)
- **Banner height capped on desktop** at half the screen (still 21:9 where that's shorter). At 1280 × 800 the headline started at 693px and the hero buttons fell below the first screen (D06 risk). Now headline 551 to 715px and buttons 734 to 790px at 1280 × 800; 601 to 844px at 1440 × 900.
- **Story gallery dropped**: its three photos were the craft steps' photos. content.md updated.
- **Buy bar** gets a 1px `border-control` top edge so it separates from the dark footer.
- **Buy bar visibility** uses a position check on scroll instead of IntersectionObserver, which proved unreliable in testing.

## Pre-delivery check (compose-screen)
| Check | Result | How |
|---|---|---|
| Tokens only | Pass | CSS custom properties generated from tokens.json; no raw colours in rules (the select's arrow SVG uses the ink token's value) |
| One icon family | Pass | Seven inline stroke icons in one style; no emoji |
| Hover, focus, pressed on every control | Pass | Buttons, links, pack sizes, stepper, FAQ, close buttons |
| Targets 44px+ | Pass | Smallest: cart, close, stepper buttons at 44px |
| Contrast | Pass | Only pairings from the calculated table; light theme only (D04) |
| Focus order matches visual order | Pass | Tabbed: skip link, logo, cart, Menu, then page; buy bar last |
| Content not hidden behind fixed bars | Pass | Body gets bottom padding equal to the bar; footer legal ends 48px above the bar |
| No horizontal scroll | Pass | 375, 768, 1280, 1440px |
| 200% text | Pass | 375px: no overflow, buttons wrap, buy bar hides as specified |
| Reduced motion | Pass (by code) | Global rule removes animations and transitions; not toggled in the browser |
| Landscape phone | Not checked | |
| Real devices, screen readers | Not checked | Stage 7 |

## States built and exercised in the browser
- Buy box: pack change updates price, suffix, total and the buy bar; quantity 1 to 20; limit line shows at 20 and hides below; add shows confirmation and announces "Added 3 × 500g to your cart"; cart count and name update ("Cart, 3 items").
- Buy bar (375 × 812): hidden at the top, shown after the hero, hidden while the buy box is on screen, shown again below it, adds 73px bottom padding.
- Cart: opens with focus on Close; lines, subtotal; remove empties it, shows "Removed 500g." with Undo focused; Undo restores; empty state with Shop the rooibos; checkout note; Esc closes and focus returns to the cart button.
- Bulk: opens with focus on name; submit empty gives "Check 3 things before sending" with focus on the summary and all three fields flagged; bad email message on leaving the field; Esc with text shows "Discard your enquiry?" with focus on Keep writing; sending shows "Sending…" with aria-busy; sent shows "Thanks, Thandi." with focus on it; offline (simulated) shows the failed message, keeps input and changes the button to "Try again"; retry then succeeds; form resets after Done.
- Menu: opens with focus on the first link; choosing Shop closes it, scrolls and focuses the shop heading.

## Placeholders still showing proposed copy (await Erick)
Craft step 2 ("then sifted" left out); delivery cost line; cap of 20; FAQ 1 wording; antioxidant line in the story.
