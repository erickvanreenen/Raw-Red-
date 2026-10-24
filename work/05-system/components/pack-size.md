# Pack size selector
**Use** to choose 100g, 250g or 500g in the buy box. The buy bar uses a native `<select>` instead, for space.

**Anatomy:** fieldset with legend "Pack size"; three options, each showing the size (weight 600) and price (`font-size-small` in solid `text-secondary`; `text-on-inverse-secondary` when selected).

| Property | Type | Default | Description |
|---|---|---|---|
| packs | list of {id, label, price} | product data | 100g R85, 250g R165, 500g R295 |
| value | pack id | 250g | Shared with the buy bar's select |

**Legend style:** label style (weight 600, `font-size-small`), not visually hidden.

**Tokens:** height `control-height-lg`; radius `radius-control`; border `border-width-control` `border-control`; selected fill and border `selected`, selected text `text-on-inverse`.

**States:** unselected; hover (border `text-primary`); focus-visible ring; selected. Selection shows by fill and by the radio's checked state, not colour alone.

**Behaviour:** changing the value updates the price, the Add to cart total and the buy bar.

**Accessibility:** native radio inputs, visually styled; arrow keys move between options; the legend names the group.
