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
