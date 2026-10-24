# UX.md: Raw Rooibos

Skill: 05-ai-design-systems/context-files. Sources: `../01-research.md`, `../02-direction.md`, `../03-ux-spec.md`, `../decisions.md`. Visual rules: `DESIGN.md`.

## Hard rules
1. One label, one outcome. Use only these CTA labels:
   | Label | Outcome |
   |---|---|
   | Shop the rooibos | Go to the shop section and focus its heading |
   | See our story | Go to the story |
   | Add to cart · R {total} | Add the chosen pack and quantity |
   | View cart | Open the cart |
   | Go to checkout | Checkout |
   | Ask about bulk | Open the bulk enquiry |
   | Send enquiry, Try again, Done | Bulk form actions |
   | Keep writing, Discard | Answer "Discard your enquiry?" |
   | Remove, Undo | Take a line out of the cart; put it back within 5 seconds |
   | Menu | Open the phone navigation |
2. Price and delivery are visible before any commit button: the delivery strip at the top of the page, and the delivery line above the buy box's commit row.
3. Retail is the main door; bulk is always reachable but is a primary button only inside its own block.
4. Every action works by keyboard. Dialogs use `<dialog>`: focus moves in, Esc closes, focus returns to the trigger.
5. Every component lists empty, loading, error, success and edge states before it is built.
6. Never imply unpasteurised is safer, and make no health claims. Keep "brew with freshly boiled water" near any mention of unpasteurised.
7. Never invent facts: farm location, certifications, reviews, numbers, delivery prices.
8. All copy and price formatting come from `content.md`. Missing copy gets a visible `[copy needed: …]` placeholder, never an invented line.

## Principles, ranked (higher wins)
1. Content shows before motion does.
2. Price and delivery before the button.
3. One label, one outcome.
4. One main door, one side door.
5. Show the craft as steps, not badges.
6. Say "unpasteurised" with care.

## Users (assumed, not researched)
- **Repeat buyer:** knows the tea and their pack size; wants to reorder fast, mostly on a phone.
- **First-time visitor:** needs to grasp "unpasteurised, family farm, small batch" quickly, and may worry whether unpasteurised is safe.
- **Café or shop owner:** wants 10kg or more and a person to talk to.

## World
South Africa only, ZAR, delivery in 2 to 4 working days. Mostly phones, possibly on mobile data, so photos are lazy-loaded and sized. People with enlarged text, keyboard-only and screen-reader users must be able to buy.

## Findings that act as guardrails
| Finding | Confidence | Rule |
|---|---|---|
| F1 Add to cart sat two screens down on phones | Observed | Buy bar on phones; hero CTA goes to the shop |
| F2 Fade-in hid the hero for 2s+ | Observed | Hard rule 7 in DESIGN.md |
| F3 No closing CTA | Observed | Closing block |
| F6 Delivery only in the FAQ | Observed | Delivery strip and buy box line |
| F7 Wholesale is a front door at peers | Observed | "Bulk orders" in the nav |
| F11 "Unpasteurised" can read as a risk | Inferred | Hard rule 6 |

## Vocabulary
pack size (not size or weight); bulk (not wholesale); delivery (not shipping); cart (not basket); unpasteurised for the process; "raw" only in the brand name and headline.

## Interaction standards
- **Feedback:** inline and close to the action; announce with `aria-live="polite"`; confirmations disappear after 4 to 5 seconds; errors stay until fixed.
- **Undo** instead of "are you sure?" (cart remove). Confirm only when typed input would be lost.
- **Forms:** labels above, optional fields marked, validate on leaving a field, error summary on submit, input kept on failure.
- **Errors** say what happened and what to do, in plain words, without blame.
- **Empty states** invite the next action.

## Analytics hooks (C8)
Elements carry `data-event` and `data-source`; nothing is tracked in the design file.
| Event | Sources |
|---|---|
| shop_click | header, hero, closing |
| story_click | hero |
| add_to_cart | buybox, buy_bar |
| bulk_open | bulk_block, closing, buybox_limit, cart_limit |
| bulk_enquiry_submit | bulk dialog submit |
| bulk_enquiry_sent | fired in code on success (comment marks the spot) |
| checkout_click | cart drawer |

## Open items (awaiting Erick)
Delivery cost or threshold; quantity cap of 20; "then sifted" in craft step 2; FAQ 1 wording; the antioxidant line in the story; photos embedded or alongside the file.
