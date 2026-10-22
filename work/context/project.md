# Context pack: rawrooibos (light mode)

Skill: 00-governance/context-pack. Written 2026-10-22. Single-stage run of 04-ui-design.

## Problem
Erick is unhappy with the current UI of rawrooibos.com. In his words: it "feels stale and olde", he doesn't like the font, he doesn't like how it looks generally, and he still wants it to feel earthy "but that does not mean stale". He also wants the placeholder stock photography replaced with the real farm photos in `Raw Red\Images`.

## Audience
Casual repeat buyers who already know the tea and reorder their size (100g, 250g, 500g); first-time visitors who must understand "unpasteurised, small-batch, family farm" quickly. South Africa first (ZAR, local payments planned). Mostly phones. Source: PRODUCT.md.

## Success criteria
- Erick's reaction to the page flips from "stale" to "fresh", while staying earthy.
- Fast reorder is still easy: price, size, quantity and add to cart in one unified buy box (a convention agreed earlier; keep).
- Real farm photography is the hero of the page, not stock.

## Hard constraints (ordered; accessibility wins any clash)
1. Text contrast 4.5:1, large text and controls 3:1; touch targets 44px (48px for the size selector); respects `prefers-reduced-motion`.
2. Brand name is "Raw Rooibos". "Raw Red" is retired and must not appear in copy, code or docs.
3. Use the real photos in `public/images/` (metadata already stripped; repo is public). No stock images.
4. Real, working Next.js 15 + Tailwind v4 site: tokens first, no one-off values in components.
5. Responsive from 375px up.

## Soft preferences
- Earthy but fresh. Palette may change ("potentially, not definitely"); keep rooibos red as the signature hue.
- The circle-and-branch mark stays as a placeholder logo until Erick designs a new one.
- Earlier art direction still holds unless he reverses it: white canvas, solid colour blocks (no gradients or shading), flat surfaces.

## Glossary
Buy box: the single panel holding price, pack size, quantity and the add-to-cart button. Direction: a named visual approach (palette, type, shape, motion).

## Never do
- Gradients, drop shadows, glass effects.
- Stock photos, or photos of people's faces; no emoji as icons.
- Centre everything; one radius on everything; uppercase tracked small type for headings (it is the "olde" feel Erick rejected).
- Redraw or invent a logo.
- Claim a farm location, certification or numbers not given by Erick.

## Sources of truth
- Visual rules: `DESIGN.md` (to be rewritten once Erick chooses a direction) and `.impeccable/design.json`.
- Product and audience: `PRODUCT.md`.
- Photos: `public/images/` (see `work/04-ui-spec.md` for what each shows).
- UX.md: none yet.
