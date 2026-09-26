# Stein Product brand book: First Light

## The idea: First Light

Stein Product helps people hand their busy work to AI and get their time back. The brand pictures that moment as **first light**: the sun cresting a planet's horizon, seen from orbit. It is optimistic rather than ominous, precise rather than flashy, and it borrows its calm from aerospace (where Jacob shipped software) instead of from sci-fi menace. Everything glows as if lit from within; nothing looks like a warning screen.

Three words to design by: **luminous, calm, exact.**

## Voice and content

- Write like a senior product person talking to a busy owner: plain, specific, warm. Short sentences. Numbers over adjectives ("live within a week", "from $2,500").
- Use "you" for the client and "I" or "Stein Product" for the practice. Never "we leverage", "synergy", "revolutionize", or "unlock".
- Sentence case everywhere, including buttons and headings. Uppercase appears only in `eyebrow`, `data` and Tag labels, set in the signal face (Archivo Expanded).
- Punctuation: never use em dashes or en dashes as separators. Use a period, comma, colon or parentheses instead. Headline example: "Your busy work, automated. Live within a week."
- No emoji, no exclamation marks, no stock "AI sparkle" glyphs.
- Real copy to reuse: "Your busy work, automated." · "Fixed scope, never hourly." · "You own the data and the system." · "No new software required."

## Color

- **Night is the home theme.** Default every marketing surface to Night; use Day for documents, proposals, invoices and dense reading.
- Grounds step up in light: `void` (page) → `surface-1` (cards) → `surface-2` (inputs, nested). Text is `ink`, `ink-muted` for secondary, `ink-faint` for meta; all three hold 4.5:1 on every ground in both themes.
- `aurora` is the signature accent: glows, the primary Button, eyebrow labels and accent text. `orbit` is its cool partner for secondary glow and info. `sol` is first light itself: the sun in the mark, the `focus` ring, and at most one warm moment per view. `dawn` is for charts and illustration only.
- `stein-teal` (#0E6B6B) is the original Stein green. It is the deep root of every gradient, the Day theme's primary fill, and a glow source in Night. In Night, never set text in it.
- Fill primary actions with `action` and label them with `on-action`; never put white text on `aurora`.
- Status colors always come with a word or icon. `success` sits on the blue-green side of the wheel, away from `danger`.
- Never introduce purple or blue-violet gradients; the palette runs teal → mint → gold, the colors of a sunrise over a green planet.

## Gradients and glow

- **Horizon** (`grad-horizon`): teal → aurora → sol, left to right, always horizontal, like the limb in the mark. Use it for the mark, rim strokes, progress fills and the `Highlight` word in a headline. On light grounds use `grad-horizon-day`, never as text.
- **Atmosphere** (`grad-atmosphere`): a planet glow rising from below. It is the ground for heroes, closing CTAs and footers (class `sp-atmosphere`, or the `Aurora` component for the animated version).
- **Rim light** (`grad-rim`, `glow-rim`): a thin luminous edge around a window or featured panel, like the glowing frame of a screen floating in space. One rim-lit object per view.
- Glow is emitted light, not a drop shadow. Use `glow-sm` for resting controls, `glow-md` for hover and the active step, `glow-rim` for hero frames. `lift` is the only dark shadow, for menus and popovers.
- Keep glows on the objects that matter. If more than three things glow on a screen, remove glow from the least important.

## Type

- **Unbounded Bold** (display) sets every headline: `display-xl`, `display-l` and `headline` at 700 with tight negative tracking, `title` at 500. It is wide, rounded and heavy: confident without shouting. Display type is always sentence case.
- **Instrument Sans** (sans) carries all reading text: `lead` for intros in `ink-muted`, `body` for running copy, `small` for captions. Keep lines to 60 to 72 characters.
- **Archivo Expanded** (signal) is the instrument panel: `eyebrow` labels in SemiBold caps at 0.14em tracking (`aurora` on Night, `stein-teal` on Day), and `data` for step numbers, prices and times with tabular figures. Never use it for sentences.
- **Anybody Expanded ExtraBold** appears only inside the logo, as outlined letterforms. Do not set text in it; the wordmark is always the supplied artwork or the `Logo` component.
- Pair them in this order on a hero: eyebrow → display line with one `Highlight` → lead → buttons.
- On screens under 640px: `display-xl` 48px, `display-l` 36px, `headline` 28px.

## Space, shape and layout

- 4px base. Card padding `space-5` to `space-6`, grid gutters `space-5`, section padding `space-9` (desktop) and `space-8` (mobile), hero breathing room `space-10`.
- Content max width 1180px; text columns max 640px. Left-align text; center only the closing CTA.
- Corners are generous and soft: `radius-lg` for panels, `radius-xl` for hero frames, `radius-pill` for buttons, Tags and dots. Fields use `radius-sm` so data entry feels exact.
- Borders are hairlines (`line`) that separate, or `border` where a control must be found (3:1). Panels get a catch-light along their top edge.
- Compose with depth: an atmosphere ground, glass panels floating above it, one glowing object in front.

## Motion

Motion should feel like light moving, not objects bouncing.

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out expo) for entrances and hovers; `cubic-bezier(0.65, 0, 0.35, 1)` for ambient loops. Durations: 160ms (press), 320ms (hover, color), 900ms (reveals), 18s (ambient drift).
- Entrances rise 14px and un-blur (`sp-reveal`, staggered 90ms via `--sp-i`). Never slide in from the side, never bounce or overshoot.
- Signature loops: the rotating rim on a featured panel (8s), the drifting aurora blooms in a hero (18s and 23s), a beam of light traveling along the StepTrack (4.5s), a soft pulse on live Tags.
- Hover is a glow that brightens and a lift of 1 to 3px, plus a light sweep across the primary Button.
- Honor `prefers-reduced-motion`: all loops stop and reveals render in place (the stylesheet already does this).

## Logo

- The mark is **First Light**: a curved planet limb in the Horizon gradient with the sun cresting to the right of its peak and a thin lens streak along the horizon. It nods to orbital sunrise imagery and to work that suddenly becomes easy.
- In the wordmark, the mark is the dot of the i: "Stein Product" is set in Anybody Expanded ExtraBold, the i is dotless, and First Light sits above "ein", starting just after the t and ending over the n, with the sun directly above the i stem.
- The mark also stands alone as the icon, with no letter underneath. Use the lockup wherever the name fits; use the mark or `stein-tile.svg` for favicons, avatars, app icons and social profiles.
- Files live in the Logos group: `stein-lockup-night.svg` on dark grounds, `stein-lockup-day.svg` on light ones, the `ink` versions for one-color use. In React, use the `Logo` component.
- Clear space is one sun diameter on every side of the lockup. Minimum lockup height 20px; minimum mark width 24px, below that use the tile.
- Do not recolor, rotate, outline, re-space, add glow to, or animate the lockup files, and never move the sun off the i. The only sanctioned animation is the sun brightening once on page load.

## Iconography and imagery

- Icons: [Lucide](https://lucide.dev) outline icons at 1.5px stroke, 20px or 24px, in `ink` or `ink-muted`; an active icon may take `aurora`. No filled icons, no emoji, no sparkle glyphs to mean "AI".
- Imagery: prefer abstract light (atmosphere grounds, horizon arcs, star grids) and real screenshots of client automations framed in a rim-lit window with `radius-xl`. Avoid stock photos of people pointing at screens and any robot or brain imagery.
- Screenshots sit inside a GlassPanel or Aurora frame, slightly tilted toward the viewer is fine; never add fake UI.
