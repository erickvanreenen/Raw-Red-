# Context-file test, 2026-10-24

Skill: 05-ai-design-systems/context-files step 5; graded with 06-design-critique/slop-check (interface) and critique-screen.
**Method:** a fresh AI agent with no access to this conversation was given only `DESIGN.md`, `UX.md`, `tokens.json` and `components/`, plus a listing of the image folder. Task: build the shop section (photo and buy box, working) and the closing block as one responsive HTML file, logging every gap instead of guessing silently. Output: `shop-test.html` in this folder.

## What it got right (checked in the browser)
- Only system colours used: all 10 hex values in the file are tokens.
- Only system radii: 12px and 28px.
- Visible type sizes all on the scale (16, 24, 32, 40, 14px). The only 13.3px elements are the visually hidden radio inputs.
- Pack size, quantity and add work; no horizontal scroll at 375, 768, 800 or 1280px (agent's check).
- No gradients, shadows, emoji or centred-everything layout.

## What it got wrong, and why (gaps in the files, not in the agent)
| # | Problem in the output | Cause in the files | Fix made |
|---|---|---|---|
| 1 | Tagline "Fresh off the farm." and an invented description ("sold direct…") | No copy in the context files | New `content.md` holds every approved string; DESIGN.md rule 12 and UX.md rule 8: use it, never invent |
| 2 | "per 250g pack" risked staying fixed | Spec text hard-coded the pack | buy-box: "per {pack} pack" |
| 3 | Price formats mixed ("R85" vs "R 165") | No format rule | content.md: `Intl.NumberFormat('en-ZA', …)` |
| 4 | Its own CSS variable naming | No naming rule | DESIGN.md "Tokens in CSS" |
| 5 | Delivery line after the button, against UX rule 2 | Contradiction between buy-box anatomy and UX.md | Delivery line moved above the commit row in buy-box, UX.md and 03-ux-spec |
| 6 | Name as title style versus "section h2s use headline style" | Contradiction | DESIGN.md: stated exception |
| 7 | Line heights invented for title and lead | Missing from tokens.json | Added line-height tokens |
| 8 | Raw 1.5px border and 3px arrow shift | Missing tokens | Added `border-width-*` and `motion-nudge` |
| 9 | Its own confirmation and announcement handling | Spec unclear | buy-box: separate status region, timer restarts, waits for focus to leave |
| 10 | Limit line hiding undefined | Missing | stepper: hides when the value drops below 20 |
| 11 | Wrong shop photo (drying yard) and its own alt | Not specified | content.md names `rows-red-soil-sky.jpg` and its alt |
| 12 | Column split, gutters, arrow icon, legend style, inverse pressed fill guessed | Not specified | DESIGN.md layout and icons; pack-size legend; `action-inverse-pressed` token |
| 13 | A long total could squeeze the photo at 768px | nowrap rule with no fallback | buy-box: commit row wraps the button onto its own row |

Not a file gap: the relative image path in the brief was wrong by one folder (my brief, not the files).

## Verdict
The files were enough for colour, shape, type scale and component behaviour; they were not enough for copy and several layout details. All 13 gaps are now closed in the files. A re-run is optional; the stage 6 build will exercise the fixed files.
