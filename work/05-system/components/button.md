# Button
Skill: 05-ai-design-systems/component-spec. Sources: pepperplane measurements (F4), D10, `03-ux-spec.md` section 6. Uses native `<button>` and `<a>`, so no extra ARIA is needed.

**Use** for every call to action in the label set. **Not for** navigation anchors, FAQ toggles or pack sizes (they have their own specs).

**Anatomy:** label (required), trailing arrow icon (required on CTAs, `aria-hidden`), container.

| Property | Type | Default | Constraints | Description |
|---|---|---|---|---|
| variant | primary, secondary | primary | One primary per block | Primary is a solid fill; secondary is arrow text with no border |
| surface | light, inverse | light | inverse only on `surface-inverse` | Swaps colours for dark blocks |
| size | md, lg | md | lg for Add to cart and dialog submits | md 48px, lg 56px high |
| width | auto, full | auto | full under 521px in stacks and the buy box | |
| element | button, a | button | `a` only when it moves to an anchor | |
| busy | boolean | false | | Shows "Sending…" with `aria-busy="true"` |

**Tokens:** radius `radius-control`; type `component.button.*`. Primary: fill `action-primary`, hover `action-primary-hover`, pressed `action-primary-pressed`, text `action-primary-text`. On inverse: fill `action-inverse`, hover `action-inverse-hover`, text `action-inverse-text`. Secondary text `text-primary`, or `text-on-inverse` on inverse. Focus `focus`, or `focus-on-inverse`.

**States:** default; hover (fill change; secondary underlines and its arrow moves `motion-nudge` right); focus-visible (`border-width-focus` ring, `border-width-focus-offset` offset); pressed (scale `button-press-scale` plus `action-primary-pressed`, or `action-inverse-pressed` on inverse); busy. Arrow icon: see DESIGN.md "Icons". No disabled state: buttons stay enabled and explain on use.

**Behaviour:** colour transition `duration-fast`. The label never wraps from 521px up; below that it may wrap and centre so enlarged text is never clipped.

**Accessibility:** name equals the visible label. Target at least 44 × 44px; the secondary keeps a 48px-tall hit area. The arrow is decorative.

**Do:** "Shop the rooibos" primary beside "See our story" secondary. **Don't:** two primaries side by side; ember text or fills on an inverse block; arrows on things that aren't actions.
