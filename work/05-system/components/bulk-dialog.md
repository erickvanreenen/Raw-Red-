# Bulk enquiry dialog and form field
**Element:** `<dialog>`; h2 "Ask about bulk"; intro line; form. States: draft, sending, sent, failed.

**Form field anatomy:** label above (weight 600, `font-size-small`) with "(optional)" where it applies; hint under the label; input (height `control-height`, 1.5px `border-control`, `radius-control`, `surface-container`); error under the input (icon and text in `error`, linked by `aria-describedby`, with `aria-invalid="true"` on the input).

**Validation:** when a field is left and on submit. On submit with errors, a focusable summary "Check {n} things before sending" links to each field.

**States:**
- Sending: submit is busy for about 1 second.
- Sent: "Thanks, {name}. Your enquiry is with us…" with primary "Done".
- Failed (offline): message with the email link, primary "Try again", input kept.
- Closing with typed text: "Discard your enquiry?" with "Keep writing" and "Discard".

**Accessibility:** focus goes to the first field on open, to the summary on error, to the sent heading on success, and back to the trigger on close.
