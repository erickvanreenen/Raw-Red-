# Delivery strip
**Use** once, above the header. Text only, not a link.

**Copy:** "Delivered across South Africa in 2 to 4 working days"

**Tokens:** surface `surface-inverse`; text `text-on-inverse` at `font-size-small`; padding `space.2` vertical, `space.4` horizontal.

**Behaviour:** sits inside the `<header>` landmark (C4) so landmark navigation reaches it. The header sticks at minus the strip's measured height, so the strip still scrolls away and only the bar row stays pinned. Wraps to two lines at large text; the height is re-measured on resize.
