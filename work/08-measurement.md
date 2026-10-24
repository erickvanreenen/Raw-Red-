# Measurement: rawrooibos.com redesign

Stage 9 of the line (library stage 08), 2026-10-24. Skills used: 08-analysis/read-analytics, 08-analysis/experiment-design, 08-analysis/impact-report. Metrics come from `02-direction.md` (08-analysis/success-metrics).

**Status:** there are no results to read. The redesign is a design file, not live, and the live site has no analytics (brief assumption A7). This stage is therefore a measurement plan, as the brief anticipated, plus the choice of next iteration.

## 1. Data check (read-analytics)
| Check | Finding |
|---|---|
| Events that exist today | None found on the live site or in the repo |
| Events named in the redesign | 11 `data-event` hooks (UX.md "Analytics hooks"): shop_click, story_click, add_to_cart, bulk_open, bulk_enquiry_submit, bulk_enquiry_sent, checkout_click |
| Denominator | Sessions, split by new and returning visitor and by phone or desktop. Needs a privacy-respecting analytics tool; choice is Erick's (POPIA applies, see C9) |
| Confounders to log | Launch date, any campaigns, seasonal gifting (December), price changes |

## 2. Measurement plan
| Metric (from 02-direction) | Event or method | Baseline | Target |
|---|---|---|---|
| Add-to-cart rate | add_to_cart ÷ sessions | Measure the **current** site for 4 full weeks before launch (needs the same events added to the live app first) | Set once the baseline exists; no number invented now |
| Time to add, returning visitors | first add_to_cart minus session start, returning flag | Same 4 weeks | Lower than baseline |
| Bulk enquiries | bulk_enquiry_sent per month; cross-check with Erick's inbox | Erick's inbox count for the last 3 months | Not lower than baseline |
| Hero and closing CTA use | shop_click by source | None (new) | Descriptive only: shows whether the closing block earns its place (F3) |
| Buy bar use | add_to_cart where source = buy_bar | None (new) | Descriptive; feeds bet B2 |
| Ease rating; first-screen understanding | 5-person walkthrough (was stage 8, skipped under D12) | n/a | Median 6 of 7; 4 of 5 people |
| **Guardrails** | Accessibility issues; first-load weight; "do you deliver to…?" emails | Inbox count | No critical issues; under 2 MB first load (hero now 61 KB on phones); no rise |

## 3. Experiment design
A small direct-to-consumer shop is unlikely to have the traffic for a valid A/B test. A rough check: detecting a 20 per cent relative lift on a 3 per cent add-to-cart rate needs on the order of 10,000+ sessions per variant (illustrative; real numbers need the real baseline). So:
- **Default: before and after.** 4 weeks before launch, 4 weeks after, same events, same weekdays. Report it as a comparison, not proof (see attribution).
- **If traffic allows: one A/B test on the buy bar** (bet B2). Hypothesis: "If phones show the buy bar, then add-to-cart rate on phones rises, because the action stays one tap away." Primary metric: phone add-to-cart rate. Guardrail: bounce rate. Decide sample size from the baseline before starting; run whole weeks; no peeking.
- **Decision rule, set now:** ship the bar if phone add-to-cart is not lower and the walkthrough shows no one blocked by it; remove it (fall back to concept A) if 2 of 5 walkthrough participants are hindered by it, whatever the numbers say.

## 4. Impact report: how it will be written (impact-report)
- Three layers: user (walkthrough ease, task success), product (add-to-cart rate, bulk enquiries), business (orders and revenue, from Erick's shop records).
- **Attribution, stated honestly now:** a before-and-after change can't be credited to the design alone. Season, campaigns, word of mouth and price all move the same numbers. Only the buy-bar A/B test, if run, isolates a design effect.
- Include what didn't work, with the walkthrough observations that explain it.

## 5. Next iteration: candidates for G9
| Option | Why | Carries |
|---|---|---|
| **A. Close the QA gap, then port** (recommended) | D12 left screen readers, real devices, compliance (C9, antioxidant line, FAQ 1) and the walkthrough untested. A 5-person walkthrough also tests bets B1 and B2 before code is written | Delays the port by the length of the walkthrough |
| B. Port the redesign into the Next.js app now | The design file is complete; tokens and component specs are ready in `work/05-system/`; analytics events already named | Ships untested assumptions to real customers |
| C. Subscriptions for repeat buyers | F9: both comparison roasters make subscriptions a main path; it fits the primary user | New scope; needs a payment provider decision first |

Open copy items still waiting on Erick before any of these ship: delivery cost line, cap of 20, "then sifted", FAQ 1 wording, antioxidant line.

## AI check (00-governance/ai-output-check)
Accuracy 4/5, relevance 5/5, completeness 4/5, clarity 4/5, fit 5/5. The sample-size figure is illustrative and labelled; no baselines or targets invented.
