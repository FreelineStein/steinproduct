Pill-shaped action that glows; the primary variant is the brightest object on any screen.

**Provide:** `children` (the label), optional `variant` (`primary` | `secondary` | `ghost`, default `primary`), `size` (`md` | `lg`), `arrow` (appends a sliding arrow), `href` (renders an `<a>`), and any native button props.

- One `primary` per view. It is the call to act: "Book a free intro call", "Get started".
- `secondary` is glass with a `border` edge; pair it beside a primary for the alternate path ("See how it works").
- `ghost` is for inline, low-stakes links inside panels and footers.
- Labels are sentence case, verb first, two to five words. No exclamation marks.
- Use `lg` in heroes and closing CTAs; `md` everywhere else.
- Do not put two glowing buttons side by side, and never place a primary on an `aurora` fill.
