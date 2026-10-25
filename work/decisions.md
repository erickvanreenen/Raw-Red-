# Decisions

## D01 Brand name and wordmark
Date / Decider: 2026-10-22, Erick
Context: The project was named "Raw Red"; Erick chose a new name.
Decision: The brand is "Raw Rooibos" (site rawrooibos.com). "Raw Red" is retired.
Options rejected: RAWROOIBOS, rawrooibos (wordmark styling): Erick chose "Raw Rooibos".
Evidence: Erick's messages this session; rename merged to main (f439810).
Trade-offs: Logo text lockup is out of date; circle-and-branch mark kept as a placeholder until a new logo is designed.
Revisit when: new logo is delivered.

## D02 Use the real farm photos, not stock
Date / Decider: 2026-10-22, Erick
Context: Placeholder stock images did not match the product (a grey-blue leaf close-up; an Asian tea picker).
Decision: Replace all placeholder photos with the photos in the project `Images` folder.
Options rejected: Keep stock as fallback: it misrepresents the product.
Evidence: Erick's messages; 14 photos processed to `public/images/` with metadata stripped (public repo).
Trade-offs: No packed-product or cup photo exists yet; the product shot will use the red drying-yard photo until one does.
Revisit when: product photography is taken.

## D03 Visual direction: A Fynbos Fresh
Date / Decider: 2026-10-22, Erick
Context: Erick found the site stale and "olde", disliked the font, and wanted earthy but fresh.
Decision: Build on direction A (Fynbos Fresh): white canvas, fynbos green and sage with rooibos-red action colour (#B03F1C), Bricolage Grotesque headings with Figtree body, pill shapes, arch-cropped hero photo, real farm photography.
Options rejected: B Clay & Sun (full red hero, serif): biggest departure, leaves the white-canvas direction. C Rooibos Pop (tomato/amber, sticker collage): highest personality risk.
Evidence: Side-by-side preview `work/ui-directions.html`; all palette pairings checked for AA contrast.
Trade-offs: Introduces green into the palette (the old brand sheet had none); old brand-sheet tokens are superseded. Nav is white (the earlier "colour in the nav" request is superseded by this direction).
Revisit when: the new logo is designed.

## D04 Light theme only
Date / Decider: 2026-10-22, Erick
Context: The site has only ever been light. Gate G4 asks for contrast in both themes.
Decision: Light theme only for now. No dark theme.
Options rejected: Design a dark theme too: doubles colour work for no current need.
Evidence: Erick's answer to the direction question.
Trade-offs: Accessibility trade-off: people who prefer dark mode get the light site. `color-scheme: light` is declared so the browser does not auto-darken form controls.
Revisit when: analytics show meaningful dark-mode traffic, or on request.

## D05 Font: Albert Sans. Hero: soft rectangle, golden-hour field
Date / Decider: 2026-10-22, Erick
Context: After the first build of direction A, Erick said he did not like the hero image treatment (arch, sunset photo) or the font (Bricolage Grotesque); the rest was fine.
Decision: One family, Albert Sans, weight 500 for headlines. Hero image is a 28px-rounded rectangle with the golden-hour field photo (`farm-golden-hour`).
Options rejected: Bricolage Grotesque, Figtree (replaced), arch crop and sunset photo; other fonts shown (Manrope, Fraunces, Red Hat Display, Nunito, Instrument Serif) and hero treatments (circle, banner, two photos, valley banner).
Evidence: `work/ui-hero-options.html`, Erick answers to the pick-list.
Trade-offs: The photo is mostly sky at 4:3, so it is zoomed 1.45x to show more field; a better-framed hero photo would be an improvement. The hero chip ("Unpasteurised") was removed with the arch.
Revisit when: new photography is taken.

## D06 Hero as an edge-to-edge banner
Date / Decider: 2026-10-22, Erick
Context: Erick asked for the hero to be an edge-to-edge banner at the top, headline beneath it, call-to-action buttons inline on the right. He also sent the uncropped H2 photo as the look he wanted (my 1.45x zoom had cut off the cliff).
Decision: Full-bleed banner (21:9 desktop, 16:9 tablet, 4:3 phone) of `farm-golden-hour`, uncropped, under the nav. Below it, headline and lead on the left, Shop and Our story buttons on the right of the same row (stacked on phones).
Options rejected: Rounded hero beside the headline (previous layout); zoomed crop of the photo.
Evidence: Erick message and screenshot; checked at desktop and 375px.
Trade-offs: The banner is tall on desktop (about 540px), so the headline starts below the first screen on short laptops.
Revisit when: new photography is taken or analytics show low click-through on the hero buttons.

## D07 Compact shop, green buttons, sage canvas with white containers
Date / Decider: 2026-10-22, Erick
Context: Erick reviewed the live shop section: the buy box was far too big and created a scroll inside the page scroll (sticky photo beside a tall column). He also asked that brick red be only an accent and a button state colour, not the resting colour of buttons; preferred the green of the footer; and asked for the light green from his reference screenshot to be the site-wide fill with white containers for contrast.
Decision: (1) Shop restructured: photo and one compact white buy box side by side (about 480px), details and bulk enquiry in white containers beneath; no sticky, no inner scroll; Add to cart sits beside the stepper and shows the total. (2) Primary buttons are Deep Fynbos at rest, Ember on hover, Ember Deep pressed; ember stays as accent only. (3) Page canvas is #EEEFE5 (sampled from his screenshot); all content containers, FAQ rows, forms and the nav bar are white.
Options rejected: Keeping the sticky photo column; ember as the resting button colour.
Evidence: Erick message and screenshot; measured box height before (about 900px) and after (478px); contrast of all text colours on #EEEFE5 calculated (ink 13.6, ink-soft 5.65, ember 5.07, deep green 8.28).
Trade-offs: White containers on #EEEFE5 are a soft contrast (1.16:1, decorative only); controls keep a 3:1 border so nothing relies on that edge. Subtotal is now only in the button label.
Revisit when: the new logo or photography changes the palette.

## Gate G4 Look, 2026-10-22
Result: proceed with risks
Passed: A person chose the direction (Erick); every colour pairing passes AA in the (only) light theme.
Failed / pending: none. Type at 200 per cent text size was checked after the build: no overflow, nothing clipped.
Assumed: Light-only is acceptable (D04).
Decided by: Erick

## D08 Redesign evolves Fynbos Fresh
Date / Decider: 2026-10-24, Erick
Context: New brief: a current, responsive redesign of rawrooibos.com delivered as one HTML file, with pepperplane.com as the CTA and UX reference.
Decision: Evolve the existing Fynbos Fresh direction (green, sage, Albert Sans). Do not reset the look.
Options rejected: Reset the visual direction from scratch.
Evidence: Erick's G0 answer.
Trade-offs: Pepperplane's 12px rectangle buttons clash with the pill shape in D03; to be settled at G4.
Revisit when: G4 Look.

## Gate G0 Scope, 2026-10-24
Result: proceed
Passed: problem stated without a solution; out of scope listed (6 items); platform mapped, redesign placed, ripple owners named (Erick).
Pending: Erick's answers on pepperplane emphasis, photo embedding, fixed content and bulk priority (questions 2 to 5 of the brief); research runs meanwhile, with assumptions A3, A5 and the bulk priority kept open.
Assumed: prices and delivery times current (A6).
Decided by: Erick

## Gate G1 Evidence, 2026-10-24
Result: proceed
Passed: each finding in 01-research.md links to a source (S1 to S6); confidence stated; assumptions separate; gaps listed.
Risks carried: no user evidence (desk research only); F11 food-safety wording rests on a search summary; Carmién not studied.
Pending: Erick's answers on pepperplane emphasis, photo embedding, fixed content, bulk priority, delivery cost, bulk reply time. Ideation proceeds with these as open assumptions.
Decided by: Erick

## D09 Concept B: story first, buy bar follows
Date / Decider: 2026-10-24, Erick
Context: Three concepts scored in 02-direction.md; A and B each won on different trade-offs (A: speed, delivery visibility, simplest build; B: story prominence, keeps D06 banner). Erick first clicked A, then corrected to B ("concept 1st sorry", confirmed by question).
Decision: Concept B. Keep the D06 edge-to-edge banner and headline; then the craft steps, the shop, story, bulk, FAQ and a closing CTA. On phones a slim buy bar (size, price, Add) pins to the bottom once the hero has scrolled away; on desktop the header carries a "Shop the rooibos" button.
Options rejected: A Shop first (shrinks the D06 banner; price before the story). C Two front doors (extra choice for retail buyers; breaks principle 4). Baseline (fails T2 to T4).
Evidence: 02-direction.md scores; F1 to F3, F6, F7 in 01-research.md.
Trade-offs: The pinned bar adds build complexity (focus order, screen readers) and may cover content at large text sizes (bet B2, riskiest assumption). Mitigation specified in stage 3: the bar hides while the shop section is on screen and when text is zoomed large.
Revisit when: the stage 7 walkthrough shows the bar covers content or is dismissed by 2 of 5 people; then fall back to A.

## Gate G2 Direction, 2026-10-24
Result: proceed
Passed: three concepts plus baseline explored; criteria fixed before scoring; one direction chosen by Erick (B); success metrics defined.
Assumed: bet B2 (a pinned bar does not get in the way of reading or zoomed text).
Decided by: Erick

## Gate G3 Spec, 2026-10-24
Result: proceed
Passed: every flow in 03-ux-spec.md lists empty, loading, error, success and edge states; copy uses the agreed vocabulary; AI behaviour not applicable; every action works by keyboard.
Pending: Erick's answers on the six [confirm] items (craft step "then sifted", delivery cost, quantity cap of 20, FAQ 1 wording, antioxidant line, photo embedding). They stay as labelled placeholders until answered.
Decided by: Erick

## D10 Buttons: soft rectangle, 12px corners
Date / Decider: 2026-10-24, Erick
Context: Pepperplane uses 12px-radius rectangles (F4, F12); Fynbos Fresh used pills (D03). Compared side by side in `work/ui-cta-options.html`.
Decision: Buttons, pack size options and the quantity stepper use a 12px radius. Containers keep 20 to 28px. Every CTA carries a trailing arrow; secondary CTAs are arrow text with no border. Primary on Deep Fynbos blocks is Paper with Ink text.
Options rejected: Pill (keeps D03's shape).
Evidence: Erick's G4 answer; preview checked at 375px and 200% text.
Trade-offs: Supersedes the pill shape in D03 and DESIGN.md. On phones (under 521px) the quantity stepper takes its own row with Add to cart full width below, a change to D07 for phones only.
Revisit when: the brand mark is redesigned.

## Gate G4 Look, 2026-10-24
Result: proceed
Passed: Erick chose the button shape (option 2); all 14 colour pairings calculated and passing AA (Ember on Deep Fynbos banned at 1.63:1); 200% text at 375px with nothing clipped.
Assumed: light theme only (D04).
Decided by: Erick

## D11 Photos sit in an images folder beside the HTML file
Date / Decider: 2026-10-24, Erick
Context: G0 question 2: embed photos in one file (about 5 to 6 MB) or ship the HTML with an images folder.
Decision: Separate `images/` folder alongside the HTML file.
Options rejected: Embedding as data URIs (heavy single file, slow first load).
Evidence: Erick's G5 answer.
Trade-offs: The deliverable is a folder, not one file; sharing means zipping it.
Revisit when: a single portable file is needed for sharing.

## Gate G5 System, 2026-10-24
Result: proceed
Passed: tokens.json and 12 component specs exist before screens; audit verdict "ready with limits" recorded; DESIGN.md and UX.md tested by an independent AI agent; its 13 gaps fixed (content.md added).
Not done: re-run of the test on the fixed files (stage 6 build exercises them).
Decided by: Erick

## Gate G6 Taste, 2026-10-24
Result: proceed
Passed: screens built from work/05-system only (one noted exception: the buy bar select's arrow image repeats the ink value); every state built and exercised in the browser; pre-delivery check passed at 375, 768, 1280, 1440px and 200% text; taste pass done by Erick.
Not checked: landscape phone, real devices, screen readers, reduced motion toggled in a browser (stage 7/8).
Decided by: Erick

## Gate G7 Fixes, 2026-10-24
Result: proceed
Accepted: C1 (buy box before photo on phones), C2 (responsive photo sizes), C3 (visible limit message in the cart), C4 (delivery strip inside the header landmark), C7 (complete the UX.md label table), C8 (named data-event hooks for later analytics), C9 (Google Fonts and POPIA, routed to stage 8 compliance-check).
Rejected: C5, keep the delivery wording in the closing block ("it's reassurance"). C6, keep the header CTA beside the hero CTA ("matches pepperplane").
Routed deeper: C8 to hand-off; C9 to QA.
Decided by: Erick

## D12 Skip stage 8 (QA and accessibility)
Date / Decider: 2026-10-24, Erick
Context: Critique fixes verified in the browser; stage 8 would run accessibility-audit, cognitive-load-check, compliance-check, design-qa and usability-test-plan.
Decision: Skip QA for this run.
Options rejected: Run stage 8 in full.
Evidence: Erick's message "Skip QA".
Trade-offs (risks carried, unowned until revisited): no screen-reader or real-device test; landscape phone and reduced motion not checked in a browser; C9 (Google Fonts and POPIA) not assessed; the antioxidant line and the reworded FAQ 1 not checked for compliance; no usability walkthrough, so bets B2 (pinned bar) and the success metric "first-screen understanding" stay untested.
Revisit when: before the redesign is ported to the live site.

## Gate G8 Ship, 2026-10-24
Result: skipped by decision D12 (not passed). No critical issues are known, but none were looked for in a QA pass.
Decided by: Erick

## Gate G9 Next, 2026-10-24
Result: stop (run complete)
Passed: attribution stated honestly in 08-measurement.md; next iteration options named (A QA then port, B port now, C subscriptions).
Not applicable: results against targets (not live, no analytics).
Decision: Erick ended the run here ("it's a small project") and asked for the final file. No next iteration chosen yet; options A to C stay in 08-measurement.md.
Carried into the final file: proposed copy for the five unconfirmed items (delivery cost line, cap of 20, "then sifted" left out, FAQ 1 wording, antioxidant line); QA risks from D12.
Decided by: Erick

## D13 Redesign ported into the live Next.js app
Date / Decider: 2026-10-25, Erick
Context: Erick asked to replace the live site with the redesign, then to merge straight to main without a preview check ("low risk, want to get it done").
Decision: Homepage rebuilt in the Next.js app from work/final/rawrooibos-redesign and work/05-system (tokens in app/globals.css; new components for craft steps, bulk block, closing block, buy bar; cart drawer and bulk dialog on native <dialog>). Checkout page kept, restyled by the shared tokens. Albert Sans now served by next/font from the site itself (closes C9: no request to Google). Photos served by next/image at sized versions.
Change from the design file: the bulk form opens the visitor's email app with the enquiry filled in, addressed to hello@rawrooibos.com, because the site has no backend; the sent message says so ("Almost done… press send there"). The old live form showed "Thanks, we'll be in touch" without sending anything.
Known gap carried: checkout still sends nothing; it shows "Your details are saved" but no order reaches anyone. Pre-existing, not changed here.
Options rejected: serving the static HTML file instead of the app (would drop the checkout page); a Vercel preview check before merge (Erick declined).
Evidence: npm run build passed (types, lint); local production server checked at 375 and 1280px: add to cart, cart undo, Esc and focus return, bulk validation, buy bar rules, checkout render.
Revisit when: a payment provider or form backend is chosen.

## D14 Orders reach the shop inbox by email
Date / Decider: 2026-10-25, Erick
Context: Checkout showed "Your details are saved" but sent nothing, so orders were silently lost (found while porting, D13).
Decision: Checkout validates the form (error summary, field errors) and "Email my order" opens the customer's email app with the order, subtotal and delivery address filled in, addressed to hello@rawrooibos.com. The confirmation says to press send there; "I've sent it, clear my cart" empties the cart. Delivery-cost wording corrected everywhere to "We confirm the delivery cost by email before you pay", since checkout never showed one.
Options rejected: a form backend or payment provider (needs a provider decision; later).
Evidence: Erick's request; build passed; validation checked in the browser. The mailto launch itself was not triggered in testing (it would open the email app on Erick's machine).
Trade-offs: an order only arrives if the customer presses send; customers without a mail app must email by hand (the address is shown).
Revisit when: a payment provider is chosen.
