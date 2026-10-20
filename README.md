# steinproduct.com

Source for [steinproduct.com](https://www.steinproduct.com), the personal site of
Jacob Stein, a product leader in Denver. The site is a four-page portfolio: who I
am, the career so far, the two ways to work with me, and the things I have built.

It is fully static. There is no backend, no database, no CMS and no form
handling. The one action on the site is an email link.

This repository is public so the site can double as one of the builds it
describes. Feel free to read the code and borrow patterns. The brand, copy,
photography and logo artwork are mine and are not for reuse.

## Stack

- **Next.js 16 (App Router) + TypeScript**, built as a static export (`output: "export"`)
- **Tailwind CSS v4** with **shadcn/ui** primitives restyled to the brand tokens
- **Three.js** for the tiled planet on the home page, with a static WebP fallback
- **PostHog** (`posthog-js`) for product analytics, routed through a managed reverse proxy
- Self-hosted fonts via `next/font/local`: Anybody Semi-Condensed, Instrument Sans, Archivo Expanded
- Hosted on **Vercel**

## Run it locally

```bash
npm install
cp .env.example .env.local   # optional: PostHog token and host
npm run dev                  # http://localhost:3000
```

The two environment variables are both `NEXT_PUBLIC_` and are inlined at build
time. Without them the site still runs; analytics just does not initialise.
`.env.example` explains where each value comes from.

To check the production output:

```bash
npm run build     # writes static files to ./out
npm run preview   # serves ./out with brotli/gzip at http://localhost:4322
```

There is no `next start`, because nothing runs server-side. The preview server
compresses assets the way Vercel does, so a local Lighthouse run against it is
representative. A plain `python -m http.server` serves uncompressed and
under-reports the mobile performance score.

Other scripts:

```bash
npm run lint         # eslint
npm run gen:assets   # regenerate icons and the OG card from the logo SVGs
```

## Where things live

```
src/
├── app/
│   ├── page.tsx              # /         home: hero, about, contact band
│   ├── journey/page.tsx      # /journey  worlds, timeline, capabilities
│   ├── work/page.tsx         # /work     how to hire me, plus a testimonial
│   ├── builds/page.tsx       # /builds   everything I have shipped
│   ├── privacy/page.tsx      # /privacy  policy for the site and my tools
│   ├── styleguide/page.tsx   # /styleguide design system on one page (noindex)
│   ├── layout.tsx            # root layout, metadata, fonts, nav + footer
│   ├── globals.css           # First Light tokens and component styles
│   ├── fonts/                # self-hosted woff2 subsets
│   └── sitemap.ts robots.ts manifest.ts icon.svg opengraph-image.png
├── components/
│   ├── sections/             # one file per page section
│   ├── ui/                   # shadcn primitives (button, card, badge, separator)
│   ├── first-light.tsx       # brand components: Aurora, GlassPanel, Tag, StepTrack
│   ├── logo.tsx              # <Logo variant>: signature, wordmark, tile, porthole
│   ├── logo-paths.ts         # the logo as SVG paths (generated from brand/)
│   ├── cta-button.tsx        # CTA that disables itself while its link is null
│   └── reveal.tsx section.tsx site-nav.tsx site-footer.tsx
├── content/                  # all page copy and data, typed, no JSX
│   ├── hero.ts about.ts worlds.ts journey.ts capabilities.ts
│   ├── work.ts               # the builds cards
│   ├── consulting.ts         # the Work page offers
│   └── testimonials.ts
├── config/
│   └── links.ts              # every external URL and the site identity
├── lib/
│   ├── analytics.ts          # typed track() wrapper; the only PostHog import in components
│   └── utils.ts
└── instrumentation-client.ts # PostHog init, runs once in the browser before hydration
brand/                        # First Light brand book, tokens, logo files, iterations
blender/                      # Blender source for the planet model and its tile manifest
public/first-light/           # exported planet GLB, tile manifest, static fallback
scripts/                      # generate-assets.mjs, preview-server.mjs
```

## Content is data

Every section reads from a file in `src/content/`. Changing copy, reordering the
timeline, or adding a build is a data edit, not a component change. Every
external URL lives in `src/config/links.ts`; nothing else in the tree hard-codes
one. A link set to `null` renders its button disabled so the layout stays whole.

## Analytics

PostHog runs client-side only, initialised in `src/instrumentation-client.ts`
with every option stated explicitly and commented, including the ones that match
the SDK default. Components never import `posthog-js` directly. They call
`track()` from `src/lib/analytics.ts`, where the event names and their property
shapes are a typed map, so a misspelled event is a compile error rather than a
new row in PostHog. No event carries personal data. The privacy page at
`/privacy` describes what is collected.

## Brand

The brand is **First Light**: near-black atmosphere grounds, aurora mint as the
single action color, glass panels with rim light, and ambient CSS motion that
stops under `prefers-reduced-motion`. The rules of record are in
`brand/first-light/BRAND-BOOK.md`, the tokens in `brand/first-light/tokens.json`
and `src/app/globals.css`, and `/styleguide` renders the whole system on one page.
The site ships the Night theme only.

The logo is outlined artwork, never live text. Three variants, all "Stein Product"
in Anybody Condensed ExtraBold on an orbital sunrise: the signature (used on the
OG card), the everyday wordmark (nav and footer), and the tile or porthole icon
(favicon, app icon). The PNG exports are generated from the SVGs:

```bash
npm run gen:assets
```

This rewrites the apple-touch icon, the 32px and 512px favicons, and the
1200×630 OG card. The OG card embeds the tagline from `src/config/links.ts`, so
rerun it whenever the logo or the tagline changes.

## The planet

The home page hero is a tiled planet rendered with Three.js. The model is built
in Blender from `blender/first-light/build_planet.py`, exported to
`public/first-light/first-light-planet.glb` with a tile manifest, and drawn by
`src/components/sections/tiled-planet.tsx`. Visitors with reduced motion, no
WebGL, or a slow connection get `planet-rest.webp` instead.

## Deploying

The repository is connected to a Vercel project. Every push to `main` builds and
deploys to production; pull requests get preview URLs. The two PostHog variables
are set in the Vercel project for the Production and Preview environments.

Because the output is plain static files, the site also runs on Cloudflare Pages
or any static host: build command `npm run build`, output directory `out`.

## Lighthouse

Last measured at Performance 98, Accessibility 100, Best Practices 100, SEO 100
on both desktop and mobile. To re-check:

```bash
npm run build && npm run preview
npx lighthouse http://127.0.0.1:4322/ --view
```

## License

No open-source license is attached yet. The code is public to read and learn
from. The brand assets, written content and photography are all rights reserved.
