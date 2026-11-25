# Payments and delivery: Paystack + Bob Go

Date: 2026-11-25. Status: built and tested in demo mode on a local build. Not committed, not live.

## Recommendation

**Use Paystack for payments and Bob Go for delivery.**

Why Paystack over Stitch:

- **Instant EFT.** Paystack takes card, Instant EFT (via Ozow) and Capitec Pay. Stitch's small-business product (Stitch Express) takes card, Capitec Pay, Apple/Google Pay and Pay Later, but **no Instant EFT**. Lots of South Africans pay by EFT, and it's cheaper for you (2% vs about 3%).
- **Slightly cheaper on cards.** Paystack 2.9% + R1; Stitch Express 2.95%.
- **Free payouts.** Paystack pays out free, 2 working days after the sale. Stitch charges R2 per payout (R10 for instant).
- **Easier to build on and test.** Paystack has a clean API, a full test mode with test cards, and lots of documentation. Your friend already uses it, so you have someone to ask.
- **Sole proprietors are accepted.** Paystack's South Africa rules let a sole proprietor sign up without a CIPC registration (see documents below).

Where Stitch would win: quicker payouts (instant, for R10), Pay Later, and Apple/Google Pay. None matter much for a R85 to R295 tea order.

### Fees on a typical order (R415 of tea + R99 delivery = R514)

| | Card | Instant EFT / Capitec Pay |
|---|---|---|
| Paystack | 2.9% + R1 = R15.91, + 15% VAT on the fee = **R18.29** | 2% = R10.28 + VAT = **R11.82** |
| Stitch Express | 2.95% = R15.16 + VAT = **R17.44**, plus R2 per payout | Capitec Pay 2%; no Instant EFT |

Fees are on Paystack's and Stitch's own pricing pages, excluding VAT. Neither has a monthly fee.

## Comparison detail

| | Paystack | Stitch Express |
|---|---|---|
| Local cards | 2.9% + R1 (R1 waived under R10) | 2.95% |
| International cards | 3.1% + R1 | 3.4% |
| Instant EFT | 2%, via Ozow | Not offered |
| Capitec Pay | 2% | 2% |
| Other | Amex, SnapScan/Scan to Pay QR | Apple Pay, Google Pay, Pay Later 5.7% |
| Payouts | Free, 2 working days (Monday's sales arrive Wednesday) | R2 standard (up to 3 working days), R10 instant |
| Monthly fee | None | None |
| Sign-up | Self sign-up. Sole proprietor: ID, proof of address (under 6 months), bank confirmation letter (under 6 months), all in the same name. Instant EFT and Capitec Pay need an extra check, about 3 working days. | Self sign-up, "verified within 1 business day"; documents depend on business type (not published) |
| Test mode | Yes: test keys and test cards | Yes: test credentials, less documented |
| From a Next.js site on Vercel | Simple REST API, redirect to Paystack's hosted page, webhook with signature | REST API with payment links; webhooks via Svix (one extra package) |

Unconfirmed, ask Paystack if it matters: whether Instant EFT and Capitec Pay can be tried in test mode (card certainly can), and the sole-proprietor collection limit (Paystack's own pages say both R80,000 and R1,000,000).

## Bob Go

- **What it is:** one account that books The Courier Guy, Aramex, Pargo, Fastway, etc., and finds the cheapest.
- **Cost:** pay-as-you-go plan is R0 a month; you pay the courier rate per shipment from a prepaid balance (top up first, or bookings fail). Paid plans (R249 to R1,999 a month) give cheaper courier rates, worth it only at volume. 14-day free trial.
- **API:** full API with a free sandbox (separate account at sandbox.bobgo.co.za, pre-loaded with pretend credit).
  - Live delivery prices at checkout (`rates-at-checkout`), with delivery dates.
  - Orders, shipments, waybill PDFs, tracking, and webhooks.
- **Typical price:** not published per kilo; Bob Go's own examples are R65 to R98. The checkout shows the real price for each address.

## How the new checkout works

1. Customer fills in contact and address (now with mobile number, suburb and province, which couriers need).
2. **See delivery options**: the site asks Bob Go for live door-to-door prices and dates. The customer picks one.
3. **Pay**: the site works out the total from its own price list and the chosen delivery, and sends the customer to Paystack's secure page.
4. Paystack calls the site's webhook when money arrives. The site checks the signature, asks Paystack again for the payment, and checks the amount matches the order. It never trusts the browser.
5. The order goes into **Bob Go > Orders**, marked paid, with the customer's chosen courier and price. **You book the courier there and print the waybill** (one click). Nothing is booked automatically, so you stay in control while it's new.
6. You get an email with the order. The customer gets a confirmation email (from the site) and a receipt (from Paystack), and sees a thank-you page.

Safety built in:

- Prices can't be edited in the browser: delivery quotes are signed by the server, tied to the address and cart. Tested: a forged price, changed cart and changed address are all refused.
- A payment that doesn't add up to a valid order is not sent to Bob Go; you get a "CHECK" email instead.
- Paystack retrying a webhook can't create a duplicate Bob Go order (Bob Go refuses a repeated order number).
- Until the keys are set, checkout falls back to today's "Email my order" flow, so merging this early doesn't break the shop.

Delivery prices are rounded up to the whole rand (R98.50 shows as R99) so all prices look the same.

## Setup checklist for Erick

You need to do these yourself (accounts, ID documents, keys). I can't open accounts or handle your keys.

### 1. Paystack (about 15 minutes, then a few days' review)
- [ ] Sign up at paystack.com/za as a South African business (sole proprietor is fine).
- [ ] Upload: ID, proof of address (under 6 months), bank confirmation letter (under 6 months). Names must match.
- [ ] Settings > Preferences: switch on **Instant EFT** and **Capitec Pay** (extra review, about 3 working days).
- [ ] Settings > API Keys & Webhooks, **Test mode**: copy the test secret key (`sk_test_…`).
- [ ] Same page, test webhook URL: `https://<your preview link>/api/webhooks/paystack` while testing; later the live one: `https://rawrooibos.com/api/webhooks/paystack`.

### 2. Bob Go (about 20 minutes)
- [ ] Sign up at sandbox.bobgo.co.za (the free test account). Settings > API keys: create a key.
- [ ] Check rates at checkout is switched on for the manual sales channel (if quotes come back "401", this is why).
- [ ] Sign up at bobgo.co.za (the real account) and add your collection address and a prepaid balance when you're ready to go live.
- [ ] Weigh and measure one packed 100g, 250g and 500g pouch and send me the numbers. The current ones in `lib/shipping.ts` are guesses.

### 3. Email (optional, recommended, about 10 minutes)
- [ ] Sign up at resend.com (free up to 3,000 emails a month), add rawrooibos.com, and add the DNS records it shows (wherever the domain is managed).
- [ ] Create an API key.
- Without this, the shop email and customer confirmation aren't sent. Paystack still emails the customer a receipt, and every order still lands in Bob Go and the Paystack dashboard.

### 4. Vercel environment variables (Project raw-red > Settings > Environment Variables)
Set these for **Preview** first, with test keys. See `.env.example` for the format.

| Name | Value |
|---|---|
| `ORDER_SIGNING_SECRET` | any long random string (I can generate one) |
| `PAYSTACK_SECRET_KEY` | `sk_test_…` (later `sk_live_…`, Production only) |
| `BOBGO_API_KEY` | sandbox key (later live key) |
| `BOBGO_API_URL` | `https://api.sandbox.bobgo.co.za/v2` (later `https://api.bobgo.co.za/v2`) |
| `BOBGO_COLLECTION_ADDRESS` | your dispatch address as one line of JSON (example in `.env.example`) |
| `RESEND_API_KEY` | from Resend (optional) |
| `SITE_URL` | `https://rawrooibos.com` (Production only) |

### 5. Test on a preview, then go live
- [ ] I push this to a branch; Vercel builds a preview link.
- [ ] Place a test order with Paystack test card `4084 0840 8408 4081`, expiry `11/27`, CVV `408`.
- [ ] Check: the order appears in Bob Go sandbox > Orders, the emails arrive, and the payment shows in Paystack (test mode).
- [ ] When happy: swap to live keys in Production, register the live webhook, and give the OK to merge to `main` (which publishes rawrooibos.com).
- [ ] At the same time, change the "We confirm the delivery cost by email before you pay" wording on the home page, FAQ and cart to "Delivery cost shown at checkout".

## Not done yet (later, if wanted)
- Booking the courier automatically after payment (now: one click in Bob Go).
- Pickup-point delivery (Pargo/locker) options.
- Refunds from the site (do them in the Paystack dashboard).
- Demo mode (pretend payments and delivery prices) for trying the flow without accounts: on automatically for Vercel previews that have no Paystack key, or set `CHECKOUT_DEMO=1` locally. It never runs on the live site, and adding a Paystack test key to Preview turns it off.

## Sources
- Paystack pricing: https://paystack.com/za/pricing
- Paystack pay by bank (Instant EFT, Capitec Pay): https://support.paystack.com/hc/en-us/articles/360019166720-Pay-with-EFT
- Paystack South Africa compliance: https://support.paystack.com/hc/en-us/articles/360021063639
- Paystack API: https://paystack.com/docs/payments/accept-payments/ and /webhooks/
- Stitch Express pricing: https://www.stitch.money/express ; API: https://express.stitch.money/api-docs
- Bob Go pricing: https://www.bobgo.co.za/pricing ; API: https://developer.bobgo.co.za
