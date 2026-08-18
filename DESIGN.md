---
name: Raw Red
description: Organic, unpasteurised, small-batch rooibos — sold direct.
colors:
  rooibos-red: "#A8402F"
  deep-russet: "#7C2D21"
  cream: "#F6EFE4"
  ink: "#2B211E"
  sand: "#E3D6C2"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Jost, Avenir Next, Futura, Century Gothic, Trebuchet MS, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Jost, Avenir Next, Futura, Century Gothic, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Jost, Avenir Next, Futura, Century Gothic, Trebuchet MS, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Jost, Avenir Next, Futura, Century Gothic, Trebuchet MS, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Jost, Avenir Next, Futura, Century Gothic, Trebuchet MS, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.rooibos-red}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.deep-russet}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-secondary-hover:
    backgroundColor: "{colors.sand}"
  input-default:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  size-selector-option:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  size-selector-option-selected:
    backgroundColor: "{colors.rooibos-red}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
---

# Design System: Raw Red

## 1. Overview

**Creative North Star: "The Steeped Sun"**

The mark is a red circle: read one way it's a cup of rooibos seen from above, read another it's a sun low on the horizon. Everything in this system takes its cue from that ambiguity — a single warm, saturated color that means something precisely because it's rare. The canvas is White: crisp, bright, and undecorated, so the earth tones (Rooibos Red, Warm Sand, Deep Russet) read as deliberate pops of colour rather than blending into a beige haze. This is a **Restrained** strategy for the accent (Rooibos Red stays rare) combined with **solid colour-blocking** for the neutrals: Sand appears as a genuine full-strength section background, not a tint or a blend, so it commits the way a real colour should.

The brand is warm and artisanal, not loud. It rejects three things explicitly: the clinical, corporate feel of a wellness-supplement brand; the generic, badge-cluttered look of an off-the-shelf Shopify template; and murky, blended near-white backgrounds that all read as "the same beige." Depth comes from genuine colour contrast, not shadow and not subtle gradients. Type is a single confident geometric sans, used the way the logo already uses it — wide-tracked capitals for the brand's own name, quieter tracking everywhere else — rather than a designed-to-look-editorial serif pairing.

**Key Characteristics:**
- White is the dominant canvas across the whole site (hero, footer, most body copy); the nav is the one persistent exception, carrying a solid Sand block so the brand has colour on screen at every scroll position
- Rooibos Red stays rare and dedicated to CTAs, price emphasis, and short accent text — its scarcity is what makes it pop
- Warm Sand is used as a genuine, full-strength solid colour block for one or two sections per page (the shop/conversion moment, an info panel) — never a faded tint of itself
- White panels nest inside Sand sections (and vice versa) for contrast-on-contrast, instead of relying on shadows
- Flat surfaces, always; no gradients, no drop shadows, no glassmorphism
- A single geometric sans family (Jost, standing in for the licensed Futura PT / Avenir Next) carries the whole system
- Generous, rounded-but-not-pill components that feel hand-finished rather than templated
- Real photography of tea, leaf, and harvest — never a colored block standing in for an image
- A brief staggered fade-up on first load for hero content, and a `scale(0.97)` press state on every interactive element, so the interface feels responsive without feeling busy

## 2. Colors

White canvas, one rare saturated accent, and earth-tone neutrals used as genuine solid colour, not diluted tints of themselves.

### Primary
- **Rooibos Red** (#A8402F): Primary CTAs, price emphasis, the "ORGANIC ROOIBOS" sub-line, active/selected states. Used on roughly 10-12% of any given screen — its scarcity against White is what makes it pop.
- **Deep Russet** (#7C2D21) — *primary-deep*: Hover and active state for anything using Rooibos Red. The sun a little lower, a little further into shadow.

### Neutral
- **White** (#FFFFFF): The dominant canvas. Nav, hero, footer, and most body copy live here. This is a deliberate exception to "never use pure white" made directly by brand art direction: the earth tones need a true-white anchor to pop against, not another warm off-white.
- **Warm Sand** (#E3D6C2): A genuine solid colour, used at full strength as a section or panel background for the shop/conversion moment and similar high-emphasis blocks — not a hairline tint. Also used as hairlines/dividers on White.
- **Steeped Cream** (#F6EFE4): A secondary, minor-use neutral now — the logo's own reversal colour, and the text colour set against a Rooibos Red button. Not a page background.
- **Fireside Ink** (#2B211E): Body copy and the wordmark. Warm near-black, never true black (`#000`).

### Named Rules
**The Steeped Sun Rule.** Rooibos Red never exceeds roughly 12% of a screen's surface. If a layout needs more visual weight, add whitespace or a larger photograph before reaching for more red.

**The Solid Block Rule.** When Sand is used as a section or panel background, it runs at full, undiluted strength (`bg-sand`, not `bg-sand/30`). A faded tint reads as "dirty white," not as colour; commit to the block or don't use it. Nest a White panel inside a Sand block (or a Sand element inside a White section) for contrast, rather than reaching for a shadow.

**No gradients, no shading.** This system does not use gradients, radial washes, or any other soft-shading effect anywhere, on brand art direction. Contrast comes from flat, solid colour blocking only.

## 3. Typography

**Display / Body / Label Font:** Jost (with Avenir Next, Futura, Century Gothic, Trebuchet MS, sans-serif as fallback) — Jost is the free, self-hostable stand-in for the brand's licensed Futura PT / Avenir Next; swap the `@font-face` source if the license is acquired later, the token names don't change.

**Character:** A single geometric sans carries the entire system, deliberately — the same choice the logo already made. It reads confident and unfussy rather than editorial or corporate; there is no second "warm serif" voice competing with it.

### Hierarchy
- **Display** (weight 500, `clamp(2.25rem, 5vw, 4rem)`, line-height 1.05, letter-spacing 0.04em, **uppercase**): Hero statements only — set like a tea-tin label blown up to poster scale. One per page, at most two.
- **Headline** (weight 500, `clamp(1.5rem, 3vw, 2.25rem)`, line-height 1.15, sentence case): Section headers ("How we steep it", "From the harvest").
- **Title** (weight 500, 1.25rem/20px, line-height 1.3, sentence case): Card and subsection headers.
- **Body** (weight 400, 1rem/16px, line-height 1.65, sentence case, max 65-75ch): Product description, story copy, checkout copy.
- **Label** (weight 500, 0.75rem/12px, line-height 1.4, letter-spacing 0.1em, **uppercase**): Nav links, buttons, size-selector options, form labels, eyebrows.

### Named Rules
**The Branded Label Rule.** The logo's own extreme tracking (0.33em on the wordmark, 0.42em on its tagline) belongs to the literal brand mark only. Everyday uppercase UI — nav, buttons, labels — tracks at a legible 0.1em. Copying the logo's tracking onto body-sized UI text makes it unreadable; that is a bug, not fidelity.

## 4. Elevation

Flat by default, no exceptions. This system does not use `box-shadow` anywhere, and does not use gradients or soft tonal blending either. Depth and rhythm come from alternating genuine, solid colours section by section — White and Warm Sand at full strength — the way a printed page uses actual colour blocks, not from shading, shadow, or blurred transitions.

On a long page, alternate White and Sand sections rather than leaving every section on White. A page that never leaves White reads as flat and clinical; a page that tries to fake variation with near-white blends reads as muddy (that was the actual bug in the first pass of this system — a "raised" tone only 5-12 RGB points off White is invisible, and a 30%-opacity Sand tint reads as "dirty white," not as colour). A typical rhythm: White (hero) → solid Sand (the primary conversion moment, with a White panel nested inside it) → White (storytelling beat) → White or Sand (closing).

**Every tone shift must be a real, checkable colour difference, not a blend.** Prove it by naming the exact utility (`bg-white` next to `bg-sand`), never by tuning an opacity value until it "feels subtle enough." Subtlety here is the failure mode the brand explicitly rejected.

### Named Rules
**The Flat Sunlight Rule.** No drop shadows on cards, buttons, popovers, or the nav bar. If something needs to feel "above" the page, give it a lighter background tone and more surrounding whitespace instead.

## 5. Components

Warm and generous: components should feel like touching a well-made physical object — soft-edged, roomy, unhurried — never cramped or clinical.

### Buttons
- **Shape:** 10px radius (`{rounded.md}`) — enough softness to feel hand-finished, not enough to read as a pill.
- **Primary:** Rooibos Red background, Steeped Cream text, label typography, `16px 32px` padding.
- **Hover / Focus:** Background shifts to Deep Russet over 180ms ease-out-quart; no shadow, no lift. Focus-visible adds a 2px Fireside Ink outline offset 2px (never remove focus rings).
- **Press:** `scale(0.97)` on `:active` (transform only, never a layout property) for tactile, snappy feedback on tap and click.
- **Secondary / Ghost:** Transparent fill, 1px Warm Sand border (a full border, never a single-side accent stripe), Fireside Ink text. Hover fills with Warm Sand.

### Size Selector (signature component)
The three pack sizes (100g / 250g / 500g) as large tap-friendly segments, not a dropdown — this is the single most-used control on the site given the "fast reorder" principle.
- **Shape:** 10px radius, minimum 48px height (touch target).
- **Unselected:** White background, Warm Sand 1px border, Fireside Ink text.
- **Selected:** Rooibos Red background, Steeped Cream text, no border.
- **Transition:** background and border-color only, 150ms ease-out-quart.

### Buy Box (signature component)
Every purchase control lives in a single White panel, never split across separate boxed and unboxed pieces — that split read as unfinished/unconventional in an early pass and was corrected. Top to bottom: large price for the selected size (Rooibos Red, with a small "per [size] pack" caption), the Size Selector, a Quantity stepper paired with a Subtotal readout, a full-width primary button, and a small bulk-order contact line underneath. This is the one full-width primary button on the page; everywhere else buttons stay content-width.

### Cards / Product Surface
- **Corner Style:** 16px radius (`{rounded.lg}`) — the most generous radius in the system, reserved for the largest surfaces.
- **Background:** White by default; solid Warm Sand when the surface itself needs to read as the accent block within a White section (see Elevation). Never a blended or tinted in-between.
- **Shadow Strategy:** none — separation comes from real colour contrast (White against Sand, or vice versa) plus generous surrounding whitespace (`{spacing.lg}` or `{spacing.xl}` between cards).
- **Border:** none by default; a 1px Warm Sand hairline only where two White surfaces actually touch.
- **Internal Padding:** `{spacing.lg}` (32px) minimum.

### Inputs / Fields
- **Style:** White background, 1px Warm Sand border, 6px radius (`{rounded.sm}`), `12px 16px` padding.
- **Focus:** border shifts to Rooibos Red, 2px, no glow/blur effect.
- **Error:** border and helper text in Deep Russet, never a saturated pure red that fights the brand accent.

### Navigation
- Solid Warm Sand background (the one persistent colour block on every page — see the Solid Block Rule), no shadow at rest; a 1px Ink-at-15%-opacity hairline appears at the bottom only once the page has scrolled, as the sole depth cue. Interactive icon buttons (cart, mobile menu) hover to White, mirroring the White-panel-inside-Sand-block pattern used elsewhere.
- Logo mark + wordmark left, label-typography links right, uppercase, 0.1em tracking (not the wordmark's 0.33em).
- Hover/active: text shifts to Rooibos Red; no underline, no background pill.
- **Mobile (< 768px):** links collapse behind a single icon-button (cart stays visible, always). No hamburger-triggered full-screen takeover animation; a simple slide-down panel, `grid-template-rows` transition, respecting `prefers-reduced-motion`.

### Responsive behavior
- Layout is mobile-first: single column below 640px, the grid opens up at `sm`/`md`/`lg` breakpoints (640px / 768px / 1024px) using `repeat(auto-fit, minmax(280px, 1fr))` where cards are the right affordance, so it never breaks at an untested width.
- The Size Selector stays a horizontal row of 3 segments at every width (never collapses to a dropdown) — the fast-reorder principle applies most on mobile, where most repeat purchases happen.
- Display-tier headlines use `clamp()` so they scale continuously rather than jumping at breakpoints.
- Touch targets stay ≥44×44px (48px for the Size Selector) at every width; nothing shrinks below that on mobile to save space.

## 6. Do's and Don'ts

### Do:
- **Do** keep Rooibos Red to roughly 10-12% of any screen (the Steeped Sun Rule) — let White and solid Warm Sand blocks carry most of the surface.
- **Do** use White as the default canvas and Sand at full strength for accent sections/panels (the Solid Block Rule) — real colour contrast, not opacity tricks.
- **Do** ship real rooibos/tea photography for hero and story sections; a colored block or icon standing in for a photo is a bug, not restraint.
- **Do** reserve the wordmark's extreme letter-spacing (0.33em / 0.42em) for the literal logo and tagline only; everyday uppercase UI tracks at 0.1em.
- **Do** keep every interactive target at least 44×44px (48px for the size selector) for touch and motor accessibility.
- **Do** maintain WCAG AA contrast for Rooibos Red and Fireside Ink text against White and Sand surfaces.
- **Do** execute familiar ecommerce conventions (cart, checkout, quantity steppers) — they're expected — just with this system's warmth and craft, per PRODUCT.md.

### Don't:
- **Don't** add `box-shadow` to cards, buttons, or the nav bar; use solid colour blocking instead (the Flat Sunlight Rule).
- **Don't** use gradients, radial washes, or any other soft-shading effect anywhere, on brand art direction — flat colour only.
- **Don't** use a faded/tinted opacity of Sand (e.g. `sand/30`) as a section background; use it at full strength or not at all (the Solid Block Rule).
- **Don't** use `border-left` / `border-right` as a colored accent stripe on any card, list item, or callout.
- **Don't** use gradient text (`background-clip: text`) or decorative glassmorphism panels.
- **Don't** set body copy in all-caps; caps are reserved for labels, buttons, nav, and the wordmark.
- **Don't** default to a generic Shopify-template layout — dense badge rows, wishlist/compare icon clusters, stock trust-badge strips — PRODUCT.md explicitly names this as what RawRed should not look like.
- **Don't** use em dashes in interface copy; use a period, comma, or colon instead.
- **Don't** use pure black (`#000`) anywhere. Pure White (`#FFFFFF`) is the deliberate exception to the "no pure neutrals" default, per direct brand art direction — it's the system's canvas, not an oversight.
