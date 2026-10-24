# Brief: rawrooibos.com responsive redesign (single HTML file)

Run: `erick-design-process`, started 2026-10-24. Skills used: 00-governance/intake-brief, 03-ux-design/platform-map, 03-ux-design/feature-placement.
Raw brief: Erick's message, kept in `work/inputs/raw-brief.md`.

## Problem
rawrooibos.com does not yet read as current, and its calls to action, labels and page flow make buying and enquiring harder than they need to be. (Source: Erick's request; the "harder than needed" part is my reading of the live page and the repo, not tested with users.)

## Proposed solutions in the brief (kept out of the problem)
- Redesign the site so it is current and fits the subject matter (unpasteurised, small-batch, family-farm rooibos).
- Deliver one responsive HTML file.
- Take pepperplane.com as the reference for how CTAs look, how they are labelled, and the UX of the platform as a whole.

## Audience
Primary: casual repeat buyers who reorder a known size (100g / 250g / 500g). Secondary: first-time visitors who must grasp "raw, unpasteurised, family farm" quickly. Cafés and shops buying 10kg or more (bulk enquiry). South Africa only for delivery, ZAR. Mostly phones. (Source: PRODUCT.md and `work/context/project.md`; not re-researched.)

## Success criteria (observable)
1. A first-time visitor can say what the product is and why it is different from the first screen alone (check by showing the first screen to Erick, and later to 3 to 5 people).
2. A repeat buyer reaches "Add to cart" with size and quantity chosen without scrolling past more than one screen on a 375px phone.
3. Every CTA uses one of a short, fixed set of labels and one of two visual styles (primary, secondary); no label is used for two different outcomes.
4. The file works at 375, 768 and 1280px with no horizontal scroll, text at 200 per cent, and keyboard-only use; text contrast 4.5:1, controls 3:1.
5. Erick judges the look "current" and "earthy, not stale" (his call at G4 and G6).

## In scope
- One self-contained, responsive `.html` file: header with a visible cart, hero, shop, details, bulk, story, FAQ, closing CTA, footer.
- A CTA system (labels, two styles, states, placement rhythm) informed by pepperplane.com.
- Working front-end behaviour inside the file: size and quantity, cart drawer, FAQ, bulk enquiry form (no server).
- The full line to screens, critique and QA, with a gate after each stage.

## Out of scope
- Real checkout, payment, order or shipping logic; any backend or the Next.js app itself. The file is a design deliverable, not a replacement for the codebase.
- A new logo or wordmark (D01: the circle-and-branch mark stays a placeholder).
- New photography, packed-product shots, copying photos of people.
- Copying pepperplane's brand, copy, dark theme or aviation metaphor. Only its CTA and UX patterns are borrowed.
- Additional products, accounts, reviews, subscriptions, blog, multi-page structure.
- Inventing facts: farm location, certifications, testimonials, customer numbers, shipping prices.

## Constraints
- Brand is "Raw Rooibos"; "Raw Red" must not appear. No "organic" in copy (commit ef3db36).
- Real photos from `public/images/` only. No stock.
- No gradients, drop shadows or glass (standing art direction, `work/context/project.md`) unless Erick reverses it.
- Light theme only (D04) unless Erick reverses it.
- Contrast and touch targets as in criterion 4; `prefers-reduced-motion` honoured.
- Public repo: no personal data in the file.

## Assumptions
| # | Assumption | Testable in |
|---|---|---|
| A1 | Previous decisions D03 to D07 (Fynbos Fresh palette, Albert Sans, sage canvas with white containers, green resting buttons) still stand and the redesign evolves them. | G0 question 1 |
| A2 | "Redesign" is about structure, UX, CTAs and a refreshed look inside the same brand, not a new brand direction. | G0 question 1 |
| A3 | pepperplane.com is a reference for CTA treatment and UX pattern, not for brand look. It is a design agency with no cart, so shop patterns come from elsewhere. | G0 question 2 |
| A4 | The live site matches the repo (checked: the repo has a header cart button; a web summary of the live page said it had none, so that summary is unreliable on this point). | Walk the live site in stage 1 |
| A5 | The 14 photos (4.2 MB) can be referenced by relative path, or embedded as data in the file. Embedding makes one portable file but a heavy one. | G0 question 3 |
| A6 | Pricing R85 / R165 / R295 and 2 to 4 working days delivery are current. | Erick confirms |
| A7 | No analytics exist, so success can only be judged by Erick and a small walkthrough. | Stage 9 |

## Layer audit
| Layer | Rating | Note |
|---|---|---|
| Observed behaviour | Not started | No analytics, no interviews, no session recordings. PRODUCT.md describes users but cites no data. |
| Domain | Partial | Product facts are on the site (unpasteurised, caffeine-free, storage). Food-safety wording around "unpasteurised" is thin. Unverified farm facts. |
| User needs | Assumed | Repeat-buyer and first-visit needs come from PRODUCT.md, not from people. |
| Product strategy | Partial | Direct-to-consumer, one product, bulk as a second path. Not stated: why bulk matters, what share of sales. |
| Conceptual model | Partial | Objects: pack size, quantity, cart, bulk enquiry, story. Bulk is not a pack size, which splits the model. |
| Interaction flow | Weak | From a web summary of the live page, not yet walked by hand (unverified): bulk enquiry is a link inside the shop section; shipping limits are stated only in the FAQ; the header's only action is the cart. |
| Surface | Partial | Fresh look chosen (D03 to D07) but Erick is asking for a "current" redesign again, so it is not settled. |

## Bottleneck
Interaction flow (Weak), sitting on top of unvalidated user needs (Assumed). Risk: a better-looking page can still mislead repeat buyers if the CTA labels and the buy path are guesses. Mitigation: map the current flow and teardown the reference first, mark conclusions as assumptions, and ask Erick to confirm priorities.

## Stages to run (recommended)
1. **Landscape (00, 03)** done in draft: `00-landscape.md`.
2. **Research, light (01)**: interaction teardown of pepperplane.com (done in part, measured), competitive scan of 3 to 4 small-batch tea and coffee shops, and a domain-language check ("unpasteurised", "raw", "loose-leaf"). No user interviews: none are available, so findings are heuristic, not evidence of user behaviour.
3. **Ideation (02)**: frame the problem, 2 to 3 concepts for the page, choose one. Reason: the main direction question (evolve or reset) is open.
4. **UX design (03)**: flows, CTA label set, states and errors (cart empty, form error, sold-out not applicable), copy, wireframe. Reason: this is the bottleneck layer.
5. **UI foundations (04), design system (05), screens (04)**: tokens first, then the HTML file.
6. **Critique (06), QA (07)**: required before ship.
7. **Analysis (08)**: shrink to a measurement plan, since no analytics exist.
Skipping research further is a stated risk: the redesign would rest on heuristics only.

## Open questions
1. Evolve the existing Fynbos Fresh direction (green, sage, Albert Sans), or reset the look?
2. Which parts of pepperplane.com matter most: button look, label wording, page rhythm, or all three?
3. One file with embedded photos, or one HTML file plus the images folder?
4. Is anything on the live site that must stay exactly as it is (copy, prices, FAQ answers)?
5. Is bulk (10kg+) a priority path, equal to retail, or secondary?

## AI check (00-governance/ai-output-check)
Accuracy 4/5, relevance 5/5, completeness 4/5, clarity 4/5, fit 5/5.
Unverified claims: flow problems drawn from a web summary of the live page (labelled in the layer audit); prices and delivery times (A6).
Failures fixed before review: one invented trigger rule in the landscape ("quantity over 500g triggers the bulk link") removed (invented content, high); flow notes relabelled as unverified (wrong detail, medium).
Harm: low. The one real-world risk is wrong shipping or food-safety wording; both need Erick's confirmation before copy is final.
