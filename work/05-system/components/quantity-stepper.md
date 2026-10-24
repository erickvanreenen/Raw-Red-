# Quantity stepper
**Use** in the buy box (size lg) and in cart lines (size md).

**Anatomy:** decrease button (−), current value, increase button (+), inside one bordered control.

| Property | Type | Default | Constraints |
|---|---|---|---|
| value | integer | 1 | 1 to 20 (cap is a proposal, awaiting Erick) |
| size | md, lg | lg | md in the cart |

**Tokens:** height `control-height-lg` (lg) or `control-height` (md); radius `radius-control`; border `border-width-control` `border-control`.

**States:** at 1, pressing − announces "Minimum is 1" and stays enabled. At 20, pressing + announces "Need more? Ask about bulk" and shows that line directly under the commit row, inside the buy box, with an "Ask about bulk" secondary button. The line hides again as soon as the value drops below 20.

**Layout:** in the buy box it sits beside Add to cart from 521px up; under 521px it takes its own full-width row (D10).

**Accessibility:** buttons named "Decrease quantity" and "Increase quantity" (in the cart: "Decrease quantity of 250g"); the value sits in an `<output>` with `aria-live="polite"`.
