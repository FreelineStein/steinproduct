@AGENTS.md

## Purpose (as of 2026-10-16)
steinproduct.com is Jacob Stein's personal portfolio on four pages: `/` (who he is and contact;
no builds and no stat row on the home page), `/journey` (worlds, timeline, capabilities), `/work` (the two ways to
hire him: NetGoodLabs for nonprofits, product advisory by email, then the client testimonial)
and `/builds` (every real thing he built, data in `src/content/work.ts`). The nav is those
three pages plus the email CTA; never a hash link to a home-page section. The consulting
practice for nonprofits lives at NetGoodLabs (`CONSULTING` in `src/config/links.ts`, repo
`/Users/jacobstein/Documents/Claude/Projects/Nonprofits`); the Work page describes what it is
and why Jacob started it, and links there. Product advisory is the one offer sold here, with
no price and no form. The audience is a hiring manager for Senior PM through Head of Product
roles, and a prospective client deciding whether to work with Jacob. The one action is email
(`PRIMARY_CTA`), with LinkedIn second. The Calendly intro call is parked in `links.ts` and not
rendered.

## Voice
First person, as of 2026-10-15. This supersedes the firm-led voice of 2026-08-13. Jacob
speaks as "I"; "Stein Product" is the wordmark and the name of the independent chapter, not
a narrator. Plain, specific, warm, short sentences, numbers over adjectives. Every claim is
on the résumé or in a shipped repo; nothing is fabricated. Employers are named (Boeing,
Maxar, Tipico, LeoVegas as an MGM Resorts subsidiary) because the résumé and LinkedIn name
them. Own products (Pick Receipts, Ambient) are cleared for the page as of 2026-10-15; the
agents and internal tools (Scout, command center, Tasha, the NFL and MLB trackers) as of
2026-10-16, with facts taken from the vault's `Brain/Projects/*/CLAUDE.md` mirrors. Education
is on the home page (`about.ts`), not in the timeline.

## Brand: First Light (as of 2026-09-25)
The site ships the **First Light** brand in its **Night theme only**: near-black atmosphere
grounds (`void`, `surface-1`, `surface-2`), aurora mint `#34F5C5` as the one action color,
orbit cyan and sol gold as partners, and the original Stein teal `#0E6B6B` kept as the root
of the teal-to-mint-to-gold horizon gradient. This supersedes the Warm Technical palette
(cream, charcoal, single teal accent, Geist, chevron logo). Do not restore it. Rules of
record: `brand/first-light/BRAND-BOOK.md`; tokens and ported components in
`src/app/globals.css`; `/styleguide` renders the system. Day values exist in the tokens for
documents and a later light mode; there is no toggle.

- **Type roles (final, 2026-09-25).** Anybody Semi-Condensed for headlines (ExtraBold 800
  for `display-xl`, `display-l`, `headline`; Bold 700 for `title`), Instrument Sans for
  body, Archivo Expanded SemiBold caps as the "signal" face (eyebrows, tags, step numbers,
  prices, times). All three self-hosted from `brand/first-light/fonts` via `next/font/local`.
  Unbounded was tried first and rejected (too soft and wide beside the condensed logo); do
  not restore it. Anybody Condensed (the logo lettering) is never loaded as a font.
- **The logo is outlined artwork on an orbital sunrise.** Three variants, all "Stein
  Product" in Anybody Condensed ExtraBold as paths (`src/components/logo-paths.ts`,
  generated from `brand/first-light/logos`, ids prefixed per instance): the **signature**
  (horizon arcs over the whole name, sun at center; the OG card and link previews, not on the page itself as of 2026-09-25), the
  everyday **wordmark** (dotless i, horizon spans "ein", sun over the i; nav and footer), and
  the **tile** or **porthole** icon (favicon, app icon, mobile nav; avatars). Dark first,
  no flat or one-color version. Never retype, recolor the horizon, move the sun or stretch
  the arc.
- **Content column is 1180px** (`Container` in `section.tsx`), the brand's max content width. It was widened from 1024px so the 76px hero line breaks on two lines at 1440px; do not narrow it back.
- **Glow is rationed.** One primary button per view, one `featured` panel per group, one sol
  moment per view, at most two Aurora grounds per page (hero and closing CTA). No purple or
  blue-violet gradients. All motion is CSS and stops under `prefers-reduced-motion`.
- **Regenerate the OG card** (`npm run gen:assets`) whenever the logo or the tagline in
  `src/config/links.ts` changes; it is a generated PNG that no copy or CSS change touches.
- **Content is data.** Sections read from `src/content/{hero,about,worlds,journey,work,
  capabilities,consulting,testimonials}.ts`. Editing the journey or adding a project is a
  data edit, not a code change.

## Client proof
Habitat for Humanity Inland Valley is named on the site, and Matthew's testimonial runs
verbatim, as of 2026-08-12 — both cleared by the client in writing (permission on record at
`Areas/Consulting/MORE-Automation/matthew-testimonial.md` in the vault). Do not re-anonymize
either one. Testimonial quotes are never tightened or paraphrased. "MORE" is an internal
program acronym and stays out of user-facing copy — say "home repair program".

## Vault mirror
Tracked in Jacob's Obsidian vault at `/Users/jacobstein/Brain/Projects/SteinProduct-Site/CLAUDE.md`.
Architecture-of-record and thinking live there; record new decisions in the mirror.
