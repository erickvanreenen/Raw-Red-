---
name: Raw Rooibos
description: Unpasteurised rooibos from a small family farm, sold direct.
version: 2026-11-10 lime and olive colourway (D15)
tokens: tokens.json
colors:
  canvas: "#F7EEE8"
  container: "#FFFAF6"
  inverse: "#5E6537"
  contrast: "#141310"
  action: "#CED964"
  action-text: "#26221D"
  action-hover: "#26221D"
  action-pressed: "#141310"
  accent-text: "#A74B2B"
  text: "#26221D"
  text-secondary: "#5C554D"
  border-control: "#7A7D5E"
  border-divider: "#DFDAD6"
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
2. Lime (#CED964) always carries dark text (#26221D). White on lime is 1.53:1 and is banned.
3. Rust (#A74B2B) is an accent on light surfaces only, never a button fill. Rust on olive is 1.09:1 and is banned.
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
"Fresh off the farm", recoloured from Erick's reference screenshot (D15): a warm cream canvas with warm white containers, an olive strip, footer and buy bar, lime for every primary button and the cart badge, rust for the accent word, and black for button hover and press, the selected pack and the closing block. Pepperplane informed the CTAs: short verb-first labels, a solid primary with an arrow, an arrow-text secondary, a closing block that repeats the main action.

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

## Colour pairings (all calculated, 2026-11-10)
Ink on paper 15.24, ink on cream 13.81, ink soft on paper 7.08, ink soft on cream 6.41, rust on paper 5.50, rust on cream 4.98, white on olive 6.19, cream on olive 5.41, ink on lime 10.33, lime on ink 10.33, lime on black 12.15, white on black 18.58, control border on paper 4.12 and on cream 3.73, error on paper 7.48. Banned: white on lime 1.53, rust on olive 1.09.

## Anti-patterns
Content hidden behind animation; two primaries in one block; arrows on navigation anchors or FAQ rows; pills (superseded by D10); white text on lime; rust on olive; light grey as a control's only edge; text by opacity; em dashes in interface copy; a second typeface; "Raw Red", "organic", sand and terracotta blocks.
