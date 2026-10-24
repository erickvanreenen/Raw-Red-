# Direction: rawrooibos.com redesign

Stage 2, 2026-10-24. Skills used: 02-ideation/frame-problem, 02-ideation/assumptions-and-bets, 02-ideation/design-principles, 02-ideation/explore-concepts, 02-ideation/select-concept, 08-analysis/success-metrics.
Inputs: `00-brief.md`, `01-research.md` (findings F1 to F12), PRODUCT.md, decisions D01 to D08.

## Problem frame (02-ideation/frame-problem)

**Outcome:** more visits end in an add to cart or a sent bulk enquiry. Business line: conversion.

**Opportunities, in the buyer's words, by journey moment** (inferred from findings, not said by real buyers):
| Moment | Opportunity | Evidence |
|---|---|---|
| Landing | "I can't tell yet what this is or why it's different." | F2 (hero text faint during fade) |
| Choosing | "I know my size; let me just get to it." | F1 (buy box two screens down on phones), PRODUCT.md |
| Before committing | "What will delivery cost, and do you deliver to me?" | F6 |
| Doubting | "Unpasteurised: is that safe?" | F11 |
| Buying for a business | "Can I get 10kg for my café, and who do I talk to?" | F7 |
| Finishing the page | "I've read it all; now what?" | F3 |

**Chosen opportunity (highest importance × worst served, judgement):** "I know my size; let me just get to it", with delivery terms before committing as part of it.

**Problem statement:** A returning buyer on a phone who wants their usual pack has to scroll about two screens, past a slowly fading hero, to reach size and add to cart, and only learns delivery terms if they open the FAQ. The cost is a slower, less certain reorder for the core customer. Evidence: F1, F2, F6 (observed on the live site).

**How might we**
- How might we let someone who knows what they want commit in the first screen, without losing the people who need the story first?
- How might we make delivery terms and price obvious before anyone presses a button?
- How might we give café and shop buyers a clear front door without slowing the retail buyer?

## Bets (02-ideation/assumptions-and-bets)
| Bet | Riskiest assumption | Kind | Cheapest test | Kill result |
|---|---|---|---|---|
| B1 Put the buy box in the first screen; we believe repeat buyers will commit faster because nothing stands between landing and adding. | First-time visitors still trust the price without the story above it. | Desirability | 5-person walkthrough of the file: first-timers explain the product after the first screen | 3 of 5 cannot say what makes it different |
| B2 Keep the story first but add a buy bar that follows the visitor on phones; we believe both groups are served because the action is always one tap away. | A pinned bar does not get in the way of reading or zoomed text. | Usability | Same walkthrough at 200 per cent text on a phone | The bar covers content or is dismissed by 2 of 5 |
| B3 Split the page into two front doors (home buyer, café or shop) after the hero; we believe bulk enquiries rise and retail is not slowed. | Bulk matters enough to justify an extra choice for every retail buyer. | Viability | Erick's answer on bulk share; later, enquiry count before and after | Bulk is a minor share of revenue |

Evidence versus craft judgement: the problems behind each bet are observed (F1, F3, F6, F7). That each bet would fix them is judgement until tested.

## Principles, ranked (02-ideation/design-principles)
1. **Content shows before motion does.** Everything is readable on first paint; motion only adds. *Why:* F2. *Example:* the headline is solid on load; a gentle rise is optional and switched off by reduced motion. *Counter-example:* the live site's fade-in hero. *Trade-off:* less "reveal" drama.
2. **Price and delivery before the button.** *Why:* F6, F8. *Example:* "Delivered in South Africa in 2 to 4 working days" under the add button; price in the button. *Counter-example:* delivery only in the FAQ. *Trade-off:* a busier buy box.
3. **One label, one outcome.** *Why:* F5. *Example:* "Shop the rooibos" always scrolls to the buy box; "Ask about bulk" always opens the bulk form. *Counter-example:* "Shop" in the nav and "Shop the rooibos" in the hero doing the same thing under two names. *Trade-off:* less variety in copy.
4. **One main door, one side door.** Retail is primary on every screen; bulk is always reachable but never competes as the main button. *Why:* PRODUCT.md (repeat buyers first), F7. *Example:* bulk in the nav and in its own block with a secondary button. *Counter-example:* two equal buttons for retail and bulk in the hero. *Trade-off:* bulk is less prominent than at Rosetta. Revisit when Erick answers the bulk-priority question.
5. **Show the craft as steps, not badges.** *Why:* PRODUCT.md, the teardown's signature moment. *Example:* a three-step "harvested, sun-dried, hand-packed" strip with real photos. *Counter-example:* a row of trust icons. *Trade-off:* takes more vertical space than badges.
6. **Say "unpasteurised" with care.** Describe what was skipped and why, never imply it is safer, and keep the boiled-water instruction near it. *Why:* F11. *Trade-off:* a less punchy claim.

Tested against three current decisions: principle 1 would change the live hero animation; principle 2 would change the FAQ-only delivery note; principle 4 would change the in-shop-only bulk link. Each changes something, so none is decoration.

## Concepts (02-ideation/explore-concepts)
Question the set answers: **where does the visitor commit, and what do they see first?**
Dimension that differs: commitment point and entry point. All three share the same look (Fynbos Fresh, D08), the same CTA system and the same content, so only the behaviour differs.

### Concept A: Shop first
The first screen is the product. Photo, a short headline, price, size, quantity and "Add to cart" sit together at the top. The story, the three craft steps, bulk and the FAQ follow, and a closing block ends the page.
- **The visitor:** lands, picks a size, adds, and can be done without scrolling.
- **What it tests that the others don't:** committing in the first screen.
- **Main risk:** first-time visitors meet the price before the reason; the edge-to-edge banner from D06 shrinks into the product block.

### Concept B: Story first, buy bar follows
Keeps the D06 banner and headline. Next come the three craft steps, then the shop. On phones a slim bar (size, price, "Add") pins to the bottom once the hero has scrolled away; on desktop the header holds a "Shop the rooibos" button.
- **The visitor:** reads at their own pace, with the action always one tap away.
- **What it tests:** a persistent action alongside a story-first page.
- **Main risk:** the pinned bar covers content at large text sizes and adds build complexity (focus order, screen readers).

### Concept C: Two front doors
The hero is followed by two equal cards, pepperplane's audience pattern: "For your cupboard" (100g to 500g, with size and add to cart) and "For your café or shop" (10kg and up, ask for pricing). The story and FAQ follow.
- **The visitor:** first says who they are, then sees only what fits.
- **What it tests:** whether bulk deserves equal footing with retail.
- **Main risk:** an extra choice for the majority, the retail buyer; it breaks principle 4.

### Baseline: the current live page
Banner, headline, then the shop (two screens down on phones), then story, then FAQ. No closing CTA.

## Selection (02-ideation/select-concept)
**Decider:** Erick.
**Criteria, fixed before scoring** (T = threshold, fail and the concept is out; W = trade-off):
| # | Criterion | Type | From |
|---|---|---|---|
| T1 | On a 375 x 812 phone, size and "Add to cart" are reachable within one screen of scrolling or one tap | T | Brief criterion 2 |
| T2 | The first screen says what the product is and what makes it different | T | Brief criterion 1 |
| T3 | Every CTA uses the fixed label set and one of two styles | T | Brief criterion 3 |
| T4 | All content is readable with motion off and before any animation finishes | T | Principle 1 |
| W1 | Delivery terms visible before committing | W | Principle 2 |
| W2 | Bulk reachable from the nav and from its own block | W | Principle 4 |
| W3 | Page ends with a closing CTA | W | F3 |
| W4 | Keeps the craft story prominent | W | Principle 5 |
| W5 | Build effort and risk in one HTML file (lower is better) | W | Brief |
| W6 | Keeps Erick's D06 banner hero | W | D06 |

**Scores** (my judgement; ✓ pass, ✗ fail, numbers 1 to 5 for trade-offs):
| | Baseline | A Shop first | B Story first, bar follows | C Two doors |
|---|---|---|---|---|
| T1 | ✓ just (Add to cart at 1601px, 23px inside two screens) | ✓ first screen | ✓ one tap from anywhere | ✓ after the choice |
| T2 | ✗ hero faint for 2s+ (F2) | ✓ | ✓ | ✓ |
| T3 | ✗ (two button styles plus pill outline and text links mixed) | ✓ | ✓ | ✓ |
| T4 | ✗ (F2) | ✓ | ✓ | ✓ |
| W1 | 1 | 5 | 4 | 4 |
| W2 | 2 | 4 | 4 | 5 |
| W3 | 1 | 5 | 5 | 5 |
| W4 | 4 | 3 | 5 | 3 |
| W5 | n/a | 5 (simplest) | 3 (pinned bar) | 4 |
| W6 | 5 | 2 | 5 | 4 |

All three concepts pass the thresholds; the baseline fails three. A and B each win on different trade-offs: A on speed and simplicity (W1, W5), B on keeping the story and the D06 banner (W4, W6). Per the skill, that is a conflict between criteria, not something to average. **The priority question for Erick:** is the fastest reorder worth shrinking the D06 banner hero (A), or should the banner and story lead with a buy bar that follows (B)?

**My recommendation: B.** It keeps your two recent decisions (D06 banner, D07 compact shop) and fixes F1 to F3 and F6 to F7. The risk of the pinned bar is testable at QA, and it can be hidden when text is zoomed. A is the fallback if you want the simplest build. C breaks principle 4 unless you tell me bulk is as important as retail.

**What would bring the others back:** A, if the walkthrough shows the pinned bar gets in the way. C, if bulk turns out to be a large share of sales.

## Success metrics (08-analysis/success-metrics)
No analytics exist, so every baseline is unknown. These need events added when the design is ported to the live site.
| Metric | Definition | Collected by | Baseline | Target | When |
|---|---|---|---|---|---|
| Add-to-cart rate (task success) | Sessions with an add to cart ÷ sessions | `add_to_cart` event | Unknown | Set after 4 weeks of data | 4 weeks after launch |
| Time to add (task success) | Seconds from landing to first add to cart, repeat visitors | Same event plus a returning-visitor flag | Unknown | Lower than baseline | 4 weeks |
| Bulk enquiries (adoption) | Bulk forms sent per month | `bulk_enquiry_sent` event | Unknown (Erick's inbox) | Not lower than before | Monthly |
| Ease rating (happiness) | "How easy was it to order your usual pack?" 1 to 7 | 5-person walkthrough (QA stage) | n/a | Median 6 or higher | Stage 7 |
| First-screen understanding (task success) | Can the person say what it is and why it's different after the first screen | Same walkthrough | n/a | 4 of 5 | Stage 7 |
| **Guardrails** | Accessibility issues (none critical); page weight under 2 MB on first load excluding below-the-fold photos; no rise in "do you deliver to...?" questions | Audit, browser dev tools, Erick's inbox | | | Each release |

## AI check (00-governance/ai-output-check)
Accuracy 4/5, relevance 5/5, completeness 4/5, clarity 4/5, fit 5/5.
Opportunity quotes are written by me as first-person framings of the findings, not said by buyers; labelled as inferred. Scores are judgement, labelled. No invented numbers; the only numbers are measured (F1) or targets for later.
