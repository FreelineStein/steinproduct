# SteinProduct.com

Marketing site for **Stein Product** — an independent product consultancy run by
Jacob Stein. _"Principal PM who builds with AI agents."_

A conversion-focused, **fully static** site: it explains who Jacob is, presents
the productized service ladder, and pushes visitors to book a call or buy a
session. It touches no card data — payments run through hosted **Stripe Payment
Links** and **Calendly** (Stripe collected at booking), so the site is just
buttons that link out. No backend, no database, no CMS.

## Stack

- **Next.js (App Router) + TypeScript** — static export (`output: "export"`)
- **Tailwind CSS v4** + **shadcn/ui** (restyled to the brand tokens)
- **Unbounded / Instrument Sans / Archivo Expanded**, self-hosted via `next/font/local` from `brand/first-light/fonts`
- `lucide-react` for the few icons
- Deploy target: **Vercel** (Cloudflare Pages works too — see below)

## Quick start

```bash
npm install
npm run dev          # dev server at http://localhost:3000
npm run build        # production build -> static files in ./out
npm run preview      # serve ./out with brotli/gzip at http://localhost:4322
```

> `npm run build` emits a static `out/` folder. There is **no** `next start`
> (nothing runs server-side). Use `npm run preview` to preview the real output —
> it compresses assets the way Vercel/Cloudflare do, so a local Lighthouse run is
> representative. (A plain `python -m http.server` serves uncompressed and will
> under-report the mobile performance score.)

## Where things live

```
src/
├── app/
│   ├── layout.tsx          # root layout, metadata, fonts, nav + footer
│   ├── page.tsx            # home page — composes the sections in order
│   ├── globals.css         # First Light tokens (Night) + ported component styles
│   ├── styleguide/         # /styleguide design reference (noindex)
│   ├── sitemap.ts robots.ts manifest.ts
│   ├── icon.svg            # favicon (also apple-icon.png, opengraph-image.png)
│   └── opengraph-image.png # social share card (generated — see Brand assets)
├── components/
│   ├── sections/           # hero, services, about, testimonials, projects, cta-band
│   ├── ui/                 # shadcn primitives (button, card, badge, separator)
│   ├── logo.tsx            # <Logo>: the outlined wordmark with First Light as the dot of the i
│   ├── cta-button.tsx      # CTA that disables itself until its link is wired
│   ├── reveal.tsx          # subtle scroll-in animation (degrades gracefully)
│   ├── section.tsx         # Container / Eyebrow / SectionHeader primitives
│   ├── site-nav.tsx site-footer.tsx
├── content/                # ◀ EDIT CONTENT HERE (typed data, no JSX)
│   ├── services.ts         # the four-tier service ladder
│   ├── testimonials.ts     # client testimonials (graceful when empty)
│   └── projects.ts         # portfolio entries (stub / "coming soon" for v1)
└── config/
    └── links.ts            # ◀ WIRE EXTERNAL URLS HERE (Calendly, Stripe, social)
brand/                      # first-light/ brand pack, final logos, source SVGs for gen:assets
scripts/                    # generate-assets.mjs, preview-server.mjs
```

## ✅ Jacob's to-do: wire the real links

Everything visitor-facing that points off-site is centralized in
**`src/config/links.ts`**. Search it for `TODO`. Until a link is filled in, its
button renders **disabled** ("Link coming soon") so the layout stays complete.

| What | Field in `src/config/links.ts` | Notes |
|------|-------------------------------|-------|
| Free intro call | `CALENDLY.introCall` | Use the specific **Intro Call event** link, not the base `calendly.com/steinproduct` profile (the profile exposes the paid session). |
| Paid strategy session | `CALENDLY.strategySession` | Calendly event with Stripe collected at booking. |
| AI Quick-Win Session | `PRODUCTS.quickWin.href` | Hosted **Stripe Payment Link**. |
| Workflow Sprint / Retainer | `PRODUCTS.workflowSprint.href`, `PRODUCTS.retainer.href` | Point these at `CALENDLY.introCall` (or a contact link) once it's live. |
| Substack | `SOCIAL.substack` | Footer link appears automatically once set (it's hidden while `null`). |

Email (`hello@steinproduct.com`) and LinkedIn are already wired.

## Editing content

Content is typed data — no JSX edits needed.

- **Reprice / reword a service** → `src/content/services.ts`. To change where a
  service's button goes, edit the matching entry in `src/config/links.ts`
  (services reference it by `productKey`).
- **Publish a testimonial** → in `src/content/testimonials.ts`, replace the
  placeholder text and set `pending: false`. The Testimonials section stays
  hidden until at least one testimonial is live, then appears automatically.
- **Add a project** → add an entry to `src/content/projects.ts`. Set
  `comingSoon: false` and add an `href` to make it a real link. This is the
  extensibility hook for the future portfolio/studio site — adding work later is
  a data edit, not a refactor.

## Brand assets

The brand is **First Light** (2026-09-25): the rules live in
`brand/first-light/BRAND-BOOK.md`, the final logo files in `brand/first-light/logos/`,
and every earlier logo round in `brand/logo-iterations/`. `brand/favicon.svg` is
the app tile and `brand/logo-wordmark.svg` is the night lockup. The nav/footer
logo is the `<Logo>` React component, which inlines the outlined paths from
`src/components/logo-paths.ts` (never live text; Anybody Expanded is not loaded
as a font). The PNG exports (apple-touch icon, 512px icon, and the 1200×630 OG
card) are generated from the SVGs:

```bash
npm run gen:assets      # regenerate icons + OG image after changing the logo or tagline
```

This writes `src/app/apple-icon.png`, `public/favicon-32.png`, `public/icon-512.png`,
and `src/app/opengraph-image.png`. The OG card embeds the lockup paths and sets the
tagline from `src/config/links.ts` in Instrument Sans (`scripts/fonts/`), so
regenerate it whenever the logo or the tagline changes. (Requires `sharp`, already
a dev dependency.)

## Design system

First Light ships in its **Night** theme only: near-black atmosphere grounds,
aurora mint as the one action color, glass panels with rim light, and ambient CSS
motion that stops under reduced motion. Tokens are defined once in
`src/app/globals.css` and consumed everywhere (shadcn included); the brand's
components (Aurora, GlassPanel, Tag, StepTrack) live in
`src/components/first-light.tsx`. Visit **`/styleguide`** to see the whole system
on one page. Day values exist in the tokens for documents and a later light mode;
there's no toggle.

## Deploying

Nothing deploys automatically. When you're ready:

### Vercel (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New → Project**, import the repo. Framework preset
   **Next.js** is detected; no env vars are needed. Deploy.
3. Point the domain: Vercel → Project → **Settings → Domains** → add
   `steinproduct.com` (and `www`). Vercel shows the exact DNS records.
4. In **Cloudflare** (where DNS lives), add those records. Typical setup:
   - `A` / `CNAME` for the apex → Vercel's target (Cloudflare supports CNAME
     flattening at the root), and a `CNAME` for `www` → `cname.vercel-dns.com`.
   - Set the Cloudflare records to **DNS only** (grey cloud, proxy off) so
     Vercel terminates TLS and serves directly — avoids double-proxying.
5. Wait for DNS to propagate; Vercel issues the certificate automatically.

### Cloudflare Pages (alternative)

Since the site is a static export, Cloudflare Pages works cleanly too:
create a Pages project from the repo, build command `npm run build`, output
directory `out`. Because DNS is already on Cloudflare, domain attachment is a
couple of clicks. Use this if you'd rather keep everything in Cloudflare.

## Lighthouse

Built and measured at **Performance 98 / Accessibility 100 / Best Practices 100
/ SEO 100** (desktop and mobile, against a compressing server like the real
host). To re-check locally:

```bash
npm run build && npm run preview
npx lighthouse http://127.0.0.1:4322/ --view
```
