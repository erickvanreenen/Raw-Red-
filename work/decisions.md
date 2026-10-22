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
