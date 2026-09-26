# First Light brand pack

The Stein Product brand system, exported from the Stein Product design system artifact on 2026-09-25. Everything the site needs to adopt the new brand is here.

- `BRAND-BOOK.md`: the rules. Voice, color, gradients and glow, type, layout, motion, logo, iconography. Read this first.
- `tokens.json`: every token (colors per theme, type scale, spacing, radius, shadows, gradients, blur). `reference/tokens.css` is the same thing as CSS custom properties.
- `logos/`: final logo artwork (lockups, mark, app tile) in night, day and one-color versions. Text is outlined; no font needed.
- `fonts/`: self-hostable woff2 files for Unbounded, Instrument Sans and Archivo Expanded.
- `reference/`: the design system's own implementation. `bundle.css` holds the exact component styles and animations; `bundle.js` is a React 18 reference implementation (namespace `window.Stein`); `components/*.md` are the usage rules per component. Port these into the site's own conventions; do not import `bundle.js` directly.

Earlier logo iterations live next door in `../logo-iterations/`.
