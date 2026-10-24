---
name: Raw Rooibos
description: Unpasteurised rooibos from a small family farm, sold direct.
version: 2026-10-24 redesign (Fynbos Fresh, evolved)
tokens: tokens.json
colors:
  canvas: "#EEEFE5"
  container: "#FFFFFF"
  inverse: "#2F4B3A"
  action: "#2F4B3A"
  action-hover: "#B03F1C"
  action-pressed: "#8F3217"
  accent-text: "#B03F1C"
  text: "#1E2420"
  text-secondary: "#566057"
  border-control: "#73836D"
  border-divider: "#D9E1D3"
  note: "#F3E6D6"
typography:
  family: "Albert Sans, system-ui, sans-serif"
  display: "500, clamp(2.75rem, 6.4vw, 5.25rem), 1, -0.035em"
  headline: "500, clamp(2rem, 4vw, 3.25rem), 1.05, -0.03em"
  title: "600, 1.5rem, 1.15, -0.02em"
  price: "600, 2.5rem"
  lead: "400, 1.1875rem, 1.55"
  body: "400, 1rem, 1.6"
  small: "400 or 600, 0.875rem (floor for readable text)"
  button: "600, 1rem"
rounded:
  control: "12px"
  card: "20px"
  panel: "28px"
spacing: "8px base: 4, 8, 12, 16, 24, 32, 48, 64, 96"
---

# DESIGN.md: Raw Rooibos

Skill: 05-ai-design-systems/context-files. Values come from `tokens.json`; this file explains how to use them. Decisions: `../decisions.md` (D03 to D10).

## Hard rules
1. Use tokens only. No raw hex, sizes or radii in components.
2. Never put Ember (#B03F1C) on Deep Fynbos (#2F4B3A). It is 1.63:1.
3. Ember is an accent and a button state (hover, pressed), never a resting button fill.
4. One primary button per block. Every CTA has a trailing arrow. Secondary CTAs are arrow text with no border.
5. Buttons, inputs, pack sizes and the stepper have 12px corners. Containers have 20px (cards) or 28px (panels).
6. Flat: no gradients, shadows, glass or blur.
7. Content is visible on first paint. No fade-in or reveal on content. Motion only on buttons, the drawer, dialogs and the buy bar, and none under reduced motion.
8. Sentence case everywhere. No uppercase or tracked small caps.
9. Real farm photos only (`public/images/`), with descriptive alt text. No stock, no faces.
10. Text no smaller than 0.875rem, except the cart count numerals (0.75rem).
11. Light theme only (D04); declare `color-scheme: light`.
12. All words come from `content.md`. Never write new copy; leave a visible `[copy needed: …]` placeholder instead.

## Tokens in CSS
Generate one custom property per semantic token, named `--{category}-{name}` without the tier: `semantic.color.action-primary` becomes `--color-action-primary`, `semantic.space.stack-md` becomes `--space-stack-md`, `semantic.radius.control` becomes `--radius-control`, `semantic.line-height.title` becomes `--line-height-title`. Component tokens become `--button-{name}`. Global tokens are emitted only so semantic ones can point at them; components never use them.

## Photos
Every photo ships in sized versions with `srcset` and `sizes` (C2): 800px and up to 1600px for full-width and half-width photos, plus 400px for the craft-step thumbnails. JPEG quality 78. Only the hero loads eagerly.

## Icons
One icon: the arrow, inline SVG, `viewBox="0 0 24 24"`, path `M5 12h14M13 6l6 6-6 6`, stroke `currentColor`, width 2, round caps and joins, 16px, `aria-hidden="true"`. Cart and menu icons use the same stroke style.

## Direction
"Fresh off the farm." The bush is green and the cured leaf is red, so the site uses both: a sage canvas with white containers, Deep Fynbos for actions and for solid dark blocks (delivery strip, closing block, footer, buy bar), and Ember for emphasis. Pepperplane informed the CTAs: short verb-first labels, a solid primary with an arrow, an arrow-text secondary, a closing block that repeats the main action.

## Hierarchy
- One display headline per page (the hero h1).
- Section titles are headline style, h2.
- In each block, the primary button is the only solid colour shape besides photos.
- Price is the largest text inside the buy box. The buy box's own h2 ("Raw Rooibos") therefore uses the title style, the one exception to section h2s using headline style; the shop section has no separate headline.

## Layout
Max content width 1200px. Gutters 16px phones, 24px from 768px, 48px from 1024px. Shop section: photo and buy box in two equal columns (`minmax(0, 1fr)`) with a 24px gap from 768px, 32px from 1024px; the photo fills the buy box's height (`object-fit: cover`, `radius-panel`); on phones the photo sits above at 4:3. Section gaps 64px phones, 96px desktop. Text capped at 60ch. Breakpoints: 520px (stepper on its own row, CTAs stack, buttons may wrap), 768px (buy bar and Menu below; inline nav and header CTA from here), 1024px.

## Components (specs in `components/`)
| Need | Use |
|---|---|
| Any call to action | `button.md` |
| Choose a size | `pack-size.md` |
| Change quantity | `quantity-stepper.md` |
| Buy | `buy-box.md`; on phones also `buy-bar.md` |
| Delivery terms | `delivery-strip.md` and the buy box delivery line |
| Navigation | `header.md` |
| Show the process | `craft-steps.md` |
| Review items | `cart-drawer.md` |
| 10kg+ orders | `bulk-dialog.md` |
| Questions | `faq-item.md` |
| End of page | `closing-block.md` |

## Colour pairings (all calculated)
Ink on white 15.81, ink on sage 13.64, ink soft on white 6.55, ink soft on sage 5.65, white on fynbos 9.60, sage on fynbos 8.28, white on ember 5.88, white on ember deep 7.96, ember on white 5.88, ember on sage 5.07, control border on white 4.04 and on sage 3.49. Banned: ember on fynbos 1.63.

## Anti-patterns
Content hidden behind animation; two primaries in one block; arrows on navigation anchors or FAQ rows; pills (superseded by D10); ember on dark blocks; light grey as a control's only edge; text by opacity; em dashes in interface copy; a second typeface; "Raw Red", "organic", sand and terracotta blocks.
