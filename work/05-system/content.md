# content.md: approved copy

Source of truth for every word on the page. Use these strings exactly; do not write new copy. If a needed string is missing, leave a visible `[copy needed: …]` placeholder and log it. Sources: live site and `lib/products.ts` [keep], `03-ux-spec.md` section 6 [new]. Items marked [confirm] await Erick.

## Formats
- Price: `Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 })`, which gives "R 165" and "R 5 900" (non-breaking spaces). Always this format, including in pack options.
- Quantities: "2 × 250g".

## Product data
| Pack | Price |
|---|---|
| 100g | R 85 |
| 250g (default) | R 165 |
| 500g | R 295 |

## Global
- Delivery strip: "Delivered across South Africa in 2 to 4 working days"
- Skip link: "Skip to content"
- Nav: "Shop", "Our story", "Bulk orders", "FAQ"; phones: "Menu"
- Cart button name: "Cart, {n} item(s)"

## Hero [keep]
- h1: "Steeped raw, not stripped down." ("raw" in accent colour)
- Lead: "Unpasteurised rooibos from a small family farm. Hand-harvested, sun-dried, and left alone."
- CTAs: "Shop the rooibos", "See our story"
- Banner: `farm-golden-hour.jpg`, alt "Rooibos bushes in golden evening light, a flat-topped cliff on the horizon"

## Craft steps [new]
- h2: "From the bush to your cup"
1. "Harvested by hand" / "Cut on our family farm, row by row." Photo `bale-in-field.jpg`, alt "A freshly cut bale of rooibos in a woven sack in the field, mountains behind"
2. "Dried in the sun" / "Left to dry in the open air." [confirm: add "then sifted" only if true] Photo `drying-yard-red.jpg`, alt "Red rooibos leaf drying in the sun on a concrete yard"
3. "Packed by hand" / "Every bag weighed and packed by the two of us." Photo `harvest-shed.jpg`, alt "Cut rooibos piled in woven sacks inside a shed"

## Shop / buy box [keep unless marked]
- h2: "Raw Rooibos"
- Tagline: "Unpasteurised. Steeped raw."
- Description: "Hand-harvested on a small family farm and left unpasteurised, so the leaf keeps more of what made it worth picking in the first place. Naturally caffeine-free, low in tannins, and good hot, iced, or steeped strong."
- Price suffix: "per {pack} pack"
- Legend: "Pack size"
- Stepper names: "Decrease quantity", "Increase quantity"; limits: "Minimum is 1", "Need more? Ask about bulk" [confirm cap of 20]
- Delivery line [new]: "Delivered in South Africa in 2 to 4 working days. We confirm the delivery cost by email before you pay." [confirm threshold or flat rate]
- Button: "Add to cart · {price}"
- Confirmation: "Added to your cart." + "View cart"; announcement: "Added {qty} × {pack} to your cart"
- Photo: `rows-red-soil-sky.jpg`, alt "Rows of rooibos bushes on red soil under a wide sky, a flat-topped cliff in the distance"
- Details: Ingredients "100% rooibos (Aspalathus linearis). Unpasteurised, no additives, no flavouring." · How to brew "One heaped teaspoon per cup. Steep in freshly boiled water for 5 to 7 minutes, strain, and serve hot or over ice." · Good to know "Naturally caffeine-free and low in tannins, so it's gentle enough to drink throughout the day."

## Story [keep]
- Eyebrow: none (sentence-case rule). h2: "Two sisters, one farm, no shortcuts."
- P1: "Rooibos is usually pasteurised after harvest to extend shelf life and even out the colour. It's a fine process, but it also softens the leaf's natural antioxidants and flattens the flavour into something more uniform. We skip that step. What you get is closer to what came off the bush: a little more variation batch to batch, and a lot more character in the cup." [confirm antioxidant claim, compliance]
- P2: "We're a two-person operation. One of us runs the fields, the other runs everything after the harvest. Every bag is still weighed and packed by hand."
- Photo: `field-rows-cliffs.jpg`, alt "Rows of rooibos on the farm with a flat-topped cliff behind"
- The live site's three-photo gallery is dropped: the craft steps now show the same three moments (stage 6 change, so photos are not repeated on one page).

## Bulk block [new]
- h2: "Ordering 10kg or more?"
- Body: "We supply cafés, shops and events. Tell us what you need and we'll come back with bulk pricing, usually within a couple of working days."
- CTA: "Ask about bulk"

## FAQ
- h2 [keep]: "Questions people ask before their first order"
1. "What does unpasteurised actually change?" / "Pasteurising rooibos after harvest is standard practice. It reduces bacteria on the leaf and evens out the colour from batch to batch. We skip that step so the leaf keeps more of its natural character, which is why our batches can vary a little in colour and taste. Always brew it with freshly boiled water." [confirm]
2. "Is it caffeine-free?" / "Yes, naturally, not decaffeinated. Rooibos doesn't contain caffeine to begin with, so it's safe to drink any time of day." [keep]
3. "How should I store it?" / "Keep it sealed, away from sunlight and heat. It keeps for 18 to 24 months and tastes best in the first year."
4. "Where do you deliver?" / "Anywhere in South Africa, usually in 2 to 4 working days. We confirm the delivery cost by email, based on your address, before you pay."

## Closing block [new]
- h2: "Ready for your next pot?"
- Body: "Pick your pack size and we'll get it to you in 2 to 4 working days."
- CTAs: "Shop the rooibos", "Ask about bulk"

## Footer [keep]
- Tagline: "Unpasteurised rooibos. Family-farmed, hand-packed."
- Email: hello@rawrooibos.com
- "© 2026 Raw Rooibos. All rights reserved."

## Cart drawer
- h2 "Your cart"; close "Close cart"; line name "Raw Rooibos, {pack}"; unit "{price} each"; empty "Your cart is empty." + "Shop the rooibos"; "Remove"; "Removed {pack}. Undo"; "Subtotal"; "Delivery cost confirmed by email before you pay."; "Go to checkout"; prototype note "Checkout isn't connected in this design file."

## Bulk dialog
- h2 "Ask about bulk"; intro "Tell us what you need and we'll reply with bulk pricing and lead times, usually within a couple of working days."
- Fields: "Your name" · "Email" · "Business name (optional)" · "How much do you need?" with hint "Roughly is fine, like 25kg a month" · "Anything else? (optional)"
- Errors: "Enter your name" · "Enter an email address like name@yourcafe.co.za" · "Tell us roughly how much you need"; summary "Check {n} things before sending"
- Buttons: "Send enquiry", "Sending…", "Done", "Try again"; discard: "Discard your enquiry?", "Keep writing", "Discard"
- Sent: "Thanks, {name}. Your enquiry is with us. We'll reply to {email}, usually within a couple of working days."
- Failed: "We couldn't send that. Check your connection and try again, or email hello@rawrooibos.com."
