---
name: Raw Rooibos
description: Unpasteurised, small-batch rooibos, sold direct from the farm.
colors:
  paper: "#FFFFFF"
  sage: "#EEEFE5"
  deep-fynbos: "#2F4B3A"
  ember: "#B03F1C"
  ember-deep: "#8F3217"
  clay: "#F3E6D6"
  ink: "#1E2420"
  ink-soft: "#566057"
  edge: "#73836D"
  line: "#D9E1D3"
typography:
  display:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.4vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  field: "14px"
  card: "20px"
  panel: "28px"
  section: "40px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.deep-fynbos}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ember}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  size-option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "56px"
  size-option-selected:
    backgroundColor: "{colors.deep-fynbos}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "56px"
  input-default:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "48px"
---

# Design System: Raw Rooibos

Direction A, "Fynbos Fresh", chosen by Erick on 2026-10-22 (see `work/decisions.md` D03), refined in D07 (sage canvas, white containers, green buttons). Supersedes the earlier "Steeped Sun" system and the old brand-sheet palette. Light theme only (D04).

## 1. Overview

**Creative North Star: "Fresh off the farm"**

The plant has two colours, the green of the living bush and the red of the cured leaf, and the site uses both. A soft sage canvas with white containers keeps it fresh; fynbos green carries the farm and the buttons; one warm ember red marks emphasis and state. It should feel earthy without feeling old: crisp white, generous space, real photography of the fields, soft pill shapes, and one quiet, modern typeface.

What it rejects: the uppercase, widely tracked headings of the first version (they read dated), stock photography, gradients and shadows, cluttered Shopify-template conventions, and any "wellness brand" sterility.

**Key Characteristics:**
- A light sage canvas (#EEEFE5) with white containers on it, and a fynbos-green footer. Colour in blocks, never gradients.
- Ember red is an accent and a button state colour (hover, pressed), never a resting button fill. Deep green is the resting colour of primary buttons.
- One typeface family, Albert Sans, at light-to-medium weights with tight tracking for headlines.
- Pill buttons, 20 to 40px rounded panels; real farm photos with soft corners.
- Sentence case everywhere. No uppercase labels or tracked small caps.

## 2. Colors

A sage canvas, white containers, deep green buttons, and one warm red for accent and state.

### Primary
- **Ember** (#B03F1C): accent (the highlighted word in the hero headline, the product tagline, the cart count) and the hover state of buttons and links. Never a resting button fill. Passes AA on white (5.88:1), sage (5.07:1) and clay (4.79:1).
- **Ember Deep** (#8F3217): pressed state of buttons.

### Secondary
- **Deep Fynbos** (#2F4B3A): resting fill of primary buttons, the selected size, the footer block. White text on it is 9.6:1.
- **Sage** (#EEEFE5): the page canvas (sampled from Erick's reference screenshot); also the cart footer and hover fills inside white containers.

### Neutral
- **Paper** (#FFFFFF): containers on the canvas (buy box, product details, bulk card, story text, FAQ rows, forms, nav bar). White against sage is the main contrast.
- **Ink** (#1E2420): body and headlines, a green-tinted near-black.
- **Ink Soft** (#566057): secondary text (6.55:1 on white, 5.64:1 on sage).
- **Edge** (#73836D): borders of controls (3:1 or better against white and sage).
- **Line** (#D9E1D3): decorative dividers only, never the only boundary of a control.
- **Clay** (#F3E6D6): the occasional warm note panel (checkout payment notice).

### Named Rules
**The Ember Accent Rule.** Ember marks emphasis and button state (hover, pressed). It is never the resting fill of a button; Deep Fynbos is the resting colour for actions.

**The Contrast Rule.** Any new pairing is calculated before it ships; text needs 4.5:1, control borders 3:1. Light grey control borders are not allowed.

## 3. Typography

**Family:** Albert Sans (Google Fonts, open licence), with system-ui as fallback. One family for everything.

**Character:** Quiet, humanist, modern. Headlines are set at weight 500 with tight tracking so they feel calm rather than loud.

### Hierarchy
- **Display** (500, clamp 2.75rem to 5.25rem, line-height 1, -0.035em): the hero headline only. One per page.
- **Headline** (500, clamp 2rem to 3.25rem, 1.05, -0.03em): section titles.
- **Title** (600, 1.5rem, 1.15): panel and drawer titles, product details.
- **Lead** (400, 1.1875rem, 1.55, Ink Soft): the line under the hero headline.
- **Body** (400, 1rem, 1.6): copy; keep lines to about 60ch.
- **Label** (600, 0.875rem): form labels and field captions. Sentence case.

### Named Rules
**The Sentence Case Rule.** No uppercase, no widely tracked small caps anywhere, including the wordmark.

## 4. Elevation

Flat. No box-shadows, no gradients, no glass. Depth comes from colour: white containers on the sage canvas, deep green for the footer, and generous space. The only overlay is the dimmed backdrop behind the cart and enquiry sheets.

## 5. Components

### Buttons
Pills, 48px minimum height. Primary: Deep Fynbos with white text, Ember on hover, Ember Deep when pressed. Secondary: 1.5px Ink outline, fills Deep Fynbos on hover. Press: scale 0.97 on transform only. The 56px Add to cart in the buy box sits beside the quantity stepper and shows the live total in its label.

### Buy Box (signature)
One compact white container (about 480px tall on desktop) holding title, tagline, short description, price for the selected size, the Size Selector, then the Quantity stepper beside the Add to cart button (label: "Add to cart · R total"). A photo beside it fills the same height. Product details (three columns) and the Bulk Order card sit in their own white containers underneath. No sticky elements and no inner scrolling: the page scrolls once.

### Size Selector
Three pills, 56px high, label plus price. Unselected: white, 1.5px Edge border. Selected: Deep Fynbos fill with white text. `role=radiogroup`.

### Inputs
White, 1.5px Edge border, 14px radius, 48px high; border turns Ember on focus and the global 2px Ink focus outline stays visible. Labels sit above in Label style.

### Navigation
White bar, wordmark "Raw Rooibos" with the placeholder circle-and-branch mark, links grouped on the right beside the cart. A Line hairline appears once scrolled. Under 768px links collapse into a panel; the cart stays visible.

### Sheets (cart, bulk enquiry)
Slide in from the right, white, 28px rounded left edge, dimmed backdrop, Escape and backdrop close, focus moves in on open (the enquiry sheet focuses the Name field).

### Photography
Real farm photos in `public/images/` only (see `work/04-ui-spec.md` for what each shows). The hero is an edge-to-edge banner (no rounding, 21:9 on desktop, 16:9 tablet, 4:3 phone) shown uncropped to include sky, cliff and field, with the headline beneath it and the two buttons inline on the right; the shop photo is 28px rounded and the farm strip 20px. Every image has descriptive alt text. No stock photos.

## 6. Do's and Don'ts

### Do:
- **Do** keep Ember to accents and the hover/pressed state of buttons, and check any new colour pairing for contrast first.
- **Do** put content in white containers on the sage canvas.
- **Do** write headlines and labels in sentence case.
- **Do** use real farm photography with accurate alt text.
- **Do** keep touch targets at least 44px (48px for primary controls).
- **Do** respect `prefers-reduced-motion` (the global rule collapses animation and transition durations).

### Don't:
- **Don't** use gradients, drop shadows, glass or blur effects.
- **Don't** use uppercase or tracked small-caps text.
- **Don't** use stock photography or photos of identifiable people.
- **Don't** use light grey (Line) as the only edge of an input or button.
- **Don't** use Ember as the resting fill of a button, or make any container taller than the screen with sticky or nested scrolling.
- **Don't** use em dashes in interface copy.
- **Don't** add a second typeface or a second accent colour.
- **Don't** reintroduce the old names or colours (Raw Red, Jost, sand and terracotta blocks).
