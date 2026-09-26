Labeled text input with hint and error states and a glowing focus.

**Provide:** `label`, optional `hint`, `error` (replaces the hint and is prefixed "Error:"), `multiline` (textarea), plus native input props (`placeholder`, `type`, `value`, `onChange`...).

- Always give a visible label; placeholders show an example, never the label.
- Error text says how to fix it: "Enter a full web address, like habitat.org".
- Focus shows the `focus` ring plus `glow-sm`; do not remove the outline.
