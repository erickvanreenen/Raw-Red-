# Research: rawrooibos.com redesign

Stage 1, 2026-10-24. Skills used: 01-research/research-plan, 01-research/interaction-teardown, 01-research/competitive-scan, 01-research/domain-glossary, 01-research/synthesise-findings.
This is desk research only. No users were interviewed or observed, so nothing here is evidence of buyer behaviour. It is evidence of what the sites do.

## Plan (01-research/research-plan)
- **Decision this serves:** the CTA system and the page flow for the redesign (stage 2 direction, stage 3 spec). Decider: Erick.
- **Known:** the product, sizes and prices (repo, observed); who buys (PRODUCT.md, assumed, not researched).
- **Priority questions**
  1. What does pepperplane.com do with CTAs (look, labels, placement), and what of it transfers to a one-product shop?
  2. What do comparable small-batch shops put around the buy action (delivery facts, wholesale, repeat buying)?
  3. How is "unpasteurised" heard in this domain, and what wording risk does it carry?
- **Method:** hand walk-through of each site in the browser pane, with computed styles read from the live page, at desktop width and 375 x 812. One web search for the domain question. No sign-ups and no purchases.

## Sources
| ID | Source | What was done | Date |
|---|---|---|---|
| S1 | rawrooibos.com | Walked at desktop and 375 x 812; positions and styles read from the page | 2026-10-24 |
| S2 | pepperplane.com | Walked at desktop and 375 x 812; CTA styles, hover state, section order read | 2026-10-24 |
| S3 | redespresso.com (rooibos brand, South Africa) | Home page only | 2026-10-24 |
| S4 | onyxcoffeelab.com (small-batch roaster, US) | Home page and one product page | 2026-10-24 |
| S5 | rosettaroastery.com (small-batch roaster, South Africa, ZAR) | Home page and one product page | 2026-10-24 |
| S6 | Web search: [Nutritional Outlook, Salmonella control in rooibos](https://www.nutritionaloutlook.com/view/methods-salmonella-control-rooibos-tea); [Stellenbosch University thesis record](https://scholar.sun.ac.za/statistics/items/7baca46d-36a9-4b50-985a-23ec9cf96d85) | Read through a search summary only, not in full | 2026-10-24 |
| — | carmien.co.za (rooibos brand) | Could not load; not studied | — |

## Findings (01-research/synthesise-findings)
| # | Finding | Confidence | Sources | Design implication |
|---|---|---|---|---|
| F1 | On a 375 x 812 phone, "Add to cart" sits 1601px down the page, two screens below the first. The hero "Shop the rooibos" button is at 641px. | Observed (measured) | S1 | Bring buying closer to the top on phones: hero CTA should land on the buy box, and a compact buy bar is worth testing. |
| F2 | Content fades in on load and on scroll. Two seconds after load on a phone, the hero headline and lead were still faint and the buttons not yet visible. On desktop a full screen stayed blank after a fast scroll. | Observed (screenshots) | S1 | Content must be visible by default. Motion may enhance, never hide. |
| F3 | The page ends at the FAQ and the footer has no action. Pepperplane ends with a closing block ("Real people. Real craft. Let's get to work.") that repeats the primary and secondary CTA. | Observed | S1, S2 | Add a closing CTA block before the footer. |
| F4 | Pepperplane CTA look: 12px radius rectangles, 16px text at weight 600, an arrow on the right of every CTA. Each block has one solid primary and one arrow-text secondary with no border. On hover the primary inverts to an outline over 0.3s. On phones the closing CTAs go full width (355px) and stack. The header CTA hides behind the menu on phones. | Observed (computed styles) | S2 | A two-level system (solid primary, arrow-text secondary) with a trailing arrow. Full-width CTAs on phones. Keep a buy action visible on phones, which pepperplane does not. |
| F5 | Pepperplane labels are 2 to 4 words, verb first, conversational ("Let's connect", "See our work", "Book a call"), and each label always means the same outcome ("Book a call" always opens the calendar). | Observed | S2 | One fixed label set, one label per outcome. |
| F6 | Both roasters state delivery terms on every page in a top bar ("FREE SHIPPING ON ORDERS OVER R650"; "Free Shipping On Orders $40+"). Raw Rooibos states delivery (South Africa only, 2 to 4 working days) only in the FAQ. | Observed | S1, S4, S5 | Put delivery facts in the header bar and beside the buy box. Any free-delivery threshold is Erick's call; none is invented. |
| F7 | Both roasters treat wholesale as a top-level path: a "Wholesale" nav item, and at Rosetta a home-page CTA "Contact Us About Wholesale". Raw Rooibos shows bulk only as a link inside the shop section. | Observed | S1, S4, S5 | Give bulk a nav entry and its own block. How prominent depends on Erick's bulk-priority answer. |
| F8 | Price inside the buy button: Onyx "$27 - Subscribe"; Raw Rooibos already does "Add to cart · R 165". | Observed | S1, S4 | Keep the price in the button. |
| F9 | Both roasters make subscriptions a main path (nav "Subscribe" / "Subscriptions"). Raw Rooibos has none. | Observed | S4, S5 | Relevant to repeat buyers but out of scope for this file. Record as an opportunity. |
| F10 | The one rooibos brand studied has no shop action on its home page; its CTAs are "explore" and "learn more about us". | Observed, single source | S3 | The category's bar for buying UX is low; a clear buy path is a differentiator. |
| F11 | Steam pasteurisation is the industry's usual microbial control for rooibos, and research reports Salmonella still found on some pasteurised samples. "Unpasteurised" can therefore be heard as a risk as well as a quality. The site already tells people to brew with freshly boiled water. | Inferred, secondary source read via summary | S6, S1 | Copy must not imply unpasteurised is safer or make health claims. Keep the boiled-water instruction close. Route to compliance-check (stage 7); Erick confirms wording. |
| F12 | Corner shapes: Onyx 0px, Rosetta 5px, pepperplane 12px. Raw Rooibos uses full pills. | Observed | S1, S2, S4, S5 | Input to the G4 shape decision (pill versus 12px). |

## Teardown: primary flows (01-research/interaction-teardown)
Scores are my judgement from the walk-through, 1 to 5.

| Flow | Entry | Steps to commit | Commit point | Clarity | Effort | Confidence | Recovery | Accessibility | Delight |
|---|---|---|---|---|---|---|---|---|---|
| S1 buy 250g | Hero "Shop the rooibos" | 3 (scroll, size, add) | Add to cart | 4 | 3 | 3 | n/a | 3 (content hidden during fades) | 3 |
| S1 bulk enquiry | Shop section link | 3 | Send enquiry | 3 | 3 | 2 (no reply time stated) | not tested | 4 | 2 |
| S2 contact | Hero "Let's connect" | 1 | Calendar / message | 5 | 5 | 4 | not tested | 4 | 4 |
| S4 subscribe | Product page | 1 row: size, frequency, quantity, button | "$27 - Subscribe" | 4 | 5 | 4 | not tested | not checked | 4 |
| S5 buy | Product page | Add to cart | Add to cart | 4 | 4 | 4 (shipping bar) | not tested | not checked | 3 |

### Principles to adopt
- One primary action per block, always the same label for the same outcome.
- Show the total in the commit button.
- State delivery terms before people commit, not in the FAQ.
- End the page with a closing CTA.
- Wholesale is its own front door.

### Anti-patterns to avoid
- Content hidden until an animation finishes.
- Header CTA hidden on phones with no buy action visible.
- Exploratory labels that hide the outcome ("explore", "learn more") where a direct label exists.

### Table stakes, gaps, signature moments
- **Table stakes:** cart in the header, size options, quantity, price in the button, delivery terms visible, wholesale route.
- **Shared gap:** no comparator explains its process as a short, clear sequence near the buy action. Pepperplane does this for its services ("A clear flight path", three steps).
- **Signature moments worth designing:** a three-step "bush to cup" strip (harvest, sun-dry, hand-pack) beside the buy path, written in the brand's plain voice and not borrowing pepperplane's aviation metaphor; and a closing block in the brand's voice.

## Language captured (01-research/domain-glossary)
| Concept | Raw Rooibos (S1) | Others | Note |
|---|---|---|---|
| Primary buy | Shop the rooibos; Add to cart · R 165 | Shop Coffee, Order Now (S4); Shop Single Origin Coffees, Add to cart (S5) | "Shop" plus the object is the common pattern |
| Story | Our story | Learn more about us (S3); Our Story (S5); See our work (S2) | |
| Bulk | Enquire about bulk orders; Bulk & wholesale enquiry; Send enquiry | Wholesale (S4, S5); Contact Us About Wholesale (S5) | Two words in use on S1 (bulk, wholesale) for one thing; pick one in stage 3 |
| Delivery | Where do you ship? (FAQ) | Free Shipping On Orders... (S4, S5); Shipping info (S5) | "Delivery" reads more natural in South Africa; "ship" is used in the FAQ |
| Product | Raw Rooibos; rooibos; loose-leaf (PRODUCT.md) | Rooibos (S3) | |
| Process | unpasteurised, hand-harvested, sun-dried, hand-packed | pasteurised, steam pasteurisation (S6) | "Raw" and "unpasteurised" used as one idea; F11 risk |

## Assumptions (kept separate from findings)
- Repeat buyers want speed over story (PRODUCT.md; not researched).
- Most visits are on phones (context pack; no analytics).
- The pepperplane CTA patterns that work for an agency also work for a one-product shop (to be judged by Erick and tested later).

## Gaps and open questions
- No user evidence at all: no interviews, analytics or support messages. A five-person walkthrough of the finished file is the cheapest fix (stage 7 usability-test-plan).
- Carmién not studied (site would not load). Comparator phones and checkouts were not walked.
- Food-safety wording for "unpasteurised" needs a primary source (Department of Health regulations, SABS or the SA Rooibos Council) and Erick's confirmation.
- Delivery cost rules and any free-delivery threshold: Erick.
- Reply time for bulk enquiries: Erick.

## AI check (00-governance/ai-output-check)
Accuracy 4/5, relevance 5/5, completeness 4/5, clarity 4/5, fit 5/5.
Unverified: F11 rests on a search summary, labelled as such. Teardown scores are judgement, labelled as such.
No invented participants, quotes or numbers. Every number above was measured on the page or quoted from it.
