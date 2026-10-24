# System audit: Fynbos Fresh, before the redesign

Stage 5, 2026-10-24. Skill used: 05-ai-design-systems/audit-system.
Scope: the existing system that the redesign evolves: `DESIGN.md`, `design-tokens.json`, `app/globals.css`, and the 11 components in `components/`. Method: read the files and searched the components for hard-coded values.

## Readiness verdict: ready with limits
The system can drive the redesign file once the gaps below are closed in `work/05-system/tokens.json`. The limits: no spacing or motion tokens, and the old JSON tokens disagree with the live CSS.

### AI-readiness (four tests)
| Test | Result |
|---|---|
| One source of truth an AI can read | Partial. `globals.css` holds the live values; `design-tokens.json` says DESIGN.md is the source, and its sage value is out of date |
| Explicit documentation | Pass. DESIGN.md documents colours, type, components, do's and don'ts |
| Real examples and quality criteria | Partial. The live site is the example; the contrast table is the only stated criterion |
| Standard instructions with guardrails | Partial. DESIGN.md has named rules; no UX.md exists |

## Token audit
| Finding | Detail | Fix |
|---|---|---|
| Duplicate with different values | `design-tokens.json` sage is #EAF0E3; `globals.css` and DESIGN.md say #EEEFE5 (D07) | New tokens.json uses #EEEFE5 |
| Hard-coded type sizes | 19 arbitrary font sizes in components: 0.9375rem (8), 1.25rem (4), 1.0625rem (2), 2.5rem, 1.375rem, 0.8125rem, 0.7rem, clamp(1.75rem,3vw,2.5rem) | Map to role tokens; add `font-size-small` (0.875rem) and `font-size-price` (2.5rem) |
| Type below the 14px floor | Cart count badge in `Nav.tsx` at 0.7rem (11.2px); pack-size price at 0.8125rem (13px) with opacity 0.9 | Badge to 0.75rem minimum with weight 600 (numerals only, decorative count also in the button's accessible name); pack price to 0.875rem, no opacity |
| Text colour by opacity | Pack-size price uses `opacity-90` | Use a solid colour token |
| Missing scale: spacing | Tailwind defaults used; no named spacing tokens | Add an 8px-based scale |
| Missing scale: motion | One easing, no durations | Add durations 120, 160, 200ms and two easings |
| Radius clash | `radius-field` 14px vs the D10 control radius of 12px | One control radius, 12px, for buttons, inputs, pack sizes, stepper |

Token adoption: colours 100% tokenised; type sizes about 40% (role classes used for headings, arbitrary values for most small text); spacing 0% (framework defaults).

## Component audit
| Component | Status for the redesign |
|---|---|
| Button | Exists (pill). Needs: 12px radius, trailing arrow, arrow-text secondary, on-dark variant |
| Size selector | Exists. Needs radius change and price text fix |
| Quantity stepper | Inline in ProductSection, not its own component. Needs spec, and the phone layout rule (own row under 521px) |
| Buy box | Exists. Needs delivery line and limit message |
| Buy bar (phones) | Missing. New |
| Delivery strip | Missing. New |
| Craft steps | Missing. New |
| Closing CTA block | Missing. New |
| Cart drawer | Exists. Needs undo on remove, empty-state CTA |
| Bulk enquiry dialog | Exists (ContactSheet). Needs error summary, failed and sent states, discard confirm |
| FAQ item | Exists (`<details>`) |
| Header and nav | Exists. Needs Bulk orders anchor, desktop CTA, "Menu" text label |

## Debt by type, prioritised (frequency × impact)
1. **Accessibility:** content hidden by fade-in on load and scroll (F2), everywhere; badge and pack price under 14px.
2. **Documentation:** no UX.md; flows, states and vocabulary live only in components.
3. **Visual:** arbitrary type sizes; JSON and CSS disagree.
4. **Structural:** stepper is not a reusable part; sheets duplicate dialog logic instead of using `<dialog>`.

## Plan
- **Now (before screens):** tokens.json with all scales; component specs for every part in the table; DESIGN.md and UX.md in `work/05-system/`.
- **Before the Next.js app adopts the redesign:** replace `design-tokens.json` and the `@theme` block from the new tokens; remove arbitrary sizes; remove fade-in reveals. (Out of scope for this file, logged as a follow-up.)
- **Track:** dark theme (D04), logo (D01).
