# Buy box (signature component)
**Use** once, in the shop section. It holds everything needed to commit (principle 2). All copy is in `content.md` under "Shop / buy box".

**Anatomy, in order:**
1. Name, h2 "Raw Rooibos", in title style (DESIGN.md hierarchy: price is the largest text here)
2. Tagline in `text-accent`
3. Description
4. Price for the selected pack (`font-size-price`, weight 600) with "per {pack} pack", which updates with the pack
5. Pack size selector
6. Delivery line (`font-size-small`, `text-secondary`), placed before the commit row so it is read first (UX hard rule 2)
7. Quantity stepper and Add to cart (button size lg, "Add to cart · {price}")
8. Add confirmation

**Tokens:** surface `surface-container`; radius `radius-panel`; padding `container-padding`; gaps `stack-sm` and `stack-md`.

**Commit row layout:** flex with wrap. From 521px the stepper and button share the row and the button's label stays on one line; when the label can't fit (large totals in a narrow column), the button wraps onto its own full-width row rather than squeezing the photo column. Under 521px the stepper always has its own row (D10).

**Add confirmation behaviour:**
- Visible text: "Added to your cart." with a "View cart" secondary button, shown for 4 seconds.
- Announcement: a separate visually hidden `role="status"` region says "Added {qty} × {pack} to your cart". The visible text is not itself a live region, to avoid double announcements.
- Adding again within 4 seconds restarts the timer.
- If focus is on "View cart" when time runs out, the confirmation stays until focus leaves it.

**States:** default; added; stepper limit (see the stepper spec).

**Order with the shop photo (C1):** the buy box comes first in the DOM and on phones, so "Shop the rooibos" lands on the buy box and Add to cart is inside the first screen. From 768px the photo moves to the left column with CSS `order`; focus order is unaffected because the photo isn't focusable.

**Never** sticky, and never scrolls inside itself.
