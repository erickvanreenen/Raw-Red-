# Cart drawer
**Element:** `<dialog>` opened with `showModal()`; h2 "Your cart"; close button named "Close cart".

**Anatomy:** lines (pack, unit price, stepper md, "Remove" text button, line total); footer with subtotal, "Delivery cost shown at checkout." and primary "Go to checkout".

**States:**
- Empty: "Your cart is empty." plus primary "Shop the rooibos", which closes the drawer and moves to the shop.
- Has items.
- Removed: "Removed 250g. Undo" for 5 seconds.
- Checkout pressed: "Checkout isn't connected in this design file."
- Line at the 20 limit (C3): "Need more? Ask about bulk" under that line, visible as well as announced. "Ask about bulk" closes the cart first, then opens the bulk dialog; closing that returns focus to the cart button.

**Tokens:** surface `surface-container`; from 768px a 420px panel with `radius-panel` on its leading edge, full screen below; backdrop `backdrop`; enters with `duration-enter` and `easing-out`, leaves with `duration-exit` and `easing-in`.

**Accessibility:** focus moves to the close button on open and back to the trigger on close; Esc and a backdrop click close it; cart count changes are announced politely.
