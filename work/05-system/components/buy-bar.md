# Buy bar (phones)
**Use** under 768px only, to keep the main action one tap away (concept B, D09).

**Anatomy:** `<aside aria-label="Quick add">` pinned to the bottom, holding a pack size `<select>` (label "Pack size", visually hidden) and an Add to cart button (size md, label "Add to cart · R {total}", surface inverse).

**Tokens:** surface `surface-inverse`; height `buy-bar-height` plus `env(safe-area-inset-bottom)`; select uses `surface-container` and `radius-control`.

**Visibility rules (bet B2 mitigation).** Shown only when all of these are true:
- the hero has scrolled out of view;
- the buy box is not on screen;
- no dialog is open;
- the viewport is 520px tall or more;
- text is under 150% (1rem renders under 24px).
While it shows, the page gets bottom padding equal to its height, so it never covers the footer.

**Behaviour:** shares state with the buy box (pack and confirmation) and adds a quantity of 1. Enters with a 200ms slide, instant under reduced motion. It is last in the DOM, so keyboard users reach it after the page content.

**Accessibility:** a named landmark; hiding uses the `hidden` attribute so it also leaves the accessibility tree.
