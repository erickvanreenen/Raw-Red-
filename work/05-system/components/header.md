# Header and navigation
**Anatomy:**
- Skip link "Skip to content", the first focusable element.
- Logo mark with "Raw Rooibos", linking to the top.
- `<nav aria-label="Main">` with Shop, Our story, Bulk orders, FAQ (from 768px inline).
- Cart button: icon plus count badge; accessible name "Cart, 2 items".
- From 768px: primary button "Shop the rooibos".
- Under 768px: a "Menu" text button that opens the nav as a panel under the header.

**Tokens:** surface `surface-container`; bottom border `border-divider` once the page has scrolled. Badge: fill `action-primary-hover` (ember) with white numerals at `font-size-badge`, `radius-badge`.

**Behaviour:** pinned to the top. Anchor targets get `scroll-margin-top` equal to the header height, and the target heading receives focus. Menu uses `aria-expanded`; Esc closes it and focus returns to the Menu button; choosing a link closes it.
