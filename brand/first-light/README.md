# First Light brand pack

The Stein Product brand system, exported from the Stein Product design system artifact on 2026-09-25 (final type and logo). Everything the site needs to adopt the brand is here.

- `BRAND-BOOK.md`: the rules. Voice, color, gradients and glow, type, layout, motion, logo, iconography. Read this first.
- `tokens.json`: every token (colors per theme, type scale, spacing, radius, shadows, gradients, blur). `reference/tokens.css` is the same as CSS custom properties plus type-scale classes.
- `logos/`: final logo artwork. Signature and everyday wordmark in night and day versions, plus the tile and porthole icons. Lettering is outlined; no font needed.
- `fonts/`: self-hostable woff2 files for Anybody Semi-Condensed, Instrument Sans and Archivo Expanded.
- `reference/`: the design system's own implementation. `bundle.css` holds the exact component styles and animations; `bundle.js` is a React 18 reference implementation (namespace `window.Stein`, including the inline `Logo`); `components/*.md` are usage rules; `homepage-example.html` shows how the pieces compose on the homepage. Port these into the site's own conventions; do not import `bundle.js` directly.

Every earlier logo round lives next door in `../logo-iterations/`.
