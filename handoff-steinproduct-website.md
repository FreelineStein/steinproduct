# Handoff Prompt — SteinProduct.com Website Build

Paste everything below the line into Claude Code, run from an empty directory where you want the repo to live (e.g. `~/code/steinproduct`).

---

## Context

You're building the marketing/brand site for **Stein Product** — an independent product consultancy run by Jacob Stein, a Principal-level PM who now builds AI agents and automations for small businesses. Brand spine / one-line positioning: **"Principal PM who builds with AI agents."** Wordmark is **SteinProduct** (longer descriptor: "Stein Product Studio"). Domain `steinproduct.com` is already registered (DNS on Cloudflare).

This is a **conversion-focused marketing site, not a web app.** Its job: explain who Jacob is, present the productized service ladder, show proof (testimonials/projects), and push the visitor to book a call or buy a session. It must look professionally designed — explicitly NOT "vibe-coded." It also needs to be **extendable later** into a portfolio/studio site (Substack posts, shipped projects, case studies) without a rebuild.

**Key architecture decision — do NOT build a custom Stripe checkout.** Payments already run through **hosted Stripe Payment Links** and **Calendly** (Stripe collected at booking). The site never touches card data, needs no Stripe SDK, no API keys, no backend for payments. "Stripe integration" here means **buttons that link out to hosted Payment Links.** This keeps the site fully static, fast, secure, and free to host. Rejected alternatives: custom Stripe Checkout/Elements (unnecessary PCI surface and backend for a one-person practice), and a CMS like Sanity/Contentful (overkill — content is small and lives in typed files in-repo).

## Design Direction — "Warm Technical"

A blend of a precise product-studio aesthetic and an approachable SMB feel. Credible enough that a betting/defense PM looks legit, warm enough that a non-technical small-business owner isn't intimidated.

- **Type:** humanist sans for body/headings (Geist Sans or Inter), **monospace for eyebrows/labels/metadata** (Geist Mono or JetBrains Mono). The mono accents are what signal "I build things."
- **Color:** warm off-white background (not pure `#fff`, ~`#FAF8F5`), near-black charcoal text (not pure `#000`, ~`#1A1A1A`), **one** confident accent color: **deep teal `#0E6B6B`** (hover/darker `#0A5757`). Use it sparingly — links, eyebrow ticks, primary buttons, key rules. No second accent.
- **Shape & depth:** rounded cards (`rounded-2xl`), soft hairline borders, very subtle shadows. A faint dotted/grid background texture in one or two sections only — not everywhere.
- **Layout:** generous whitespace, a consistent spacing scale, max content width ~`max-w-5xl`, strong typographic hierarchy.
- **Dark mode:** build tokens so dark mode is possible, default to light. Don't over-invest in dark mode for v1.

**Anti-"vibe-coded" guardrails (enforce these):**
- No emoji as UI. No purple/blue hero gradients. No glassmorphism. No generic stock illustrations or rocket/AI clipart.
- No `lorem ipsum` — use the real copy provided below.
- Consistent spacing (use the Tailwind scale, no random `mt-[13px]`). Accessible contrast (WCAG AA). Semantic HTML, real focus states, keyboard navigable.
- Subtle, tasteful motion only (a small fade/translate on scroll-in at most). No bouncing, no parallax.

## Brand Assets (final — use exactly)

Two source SVGs ship alongside this prompt in a `brand/` folder: `brand/favicon.svg` and `brand/logo-wordmark.svg`. Copy them into the repo. The mark is a **teal prompt chevron** (`›`) — it signals "command prompt / AI agent" and is the through-line between the logo and the favicon.

- **Exact colors:** accent teal `#0E6B6B` (hover `#0A5757`), charcoal text `#1A1A1A`, warm off-white bg `#FAF8F5`, hairline border `#E4DED5`, muted text `#6B6560`. These are the only brand colors — wire them into the Tailwind theme tokens from Step 2.
- **Wordmark:** "Stein Product" in the site's sans (Geist), `font-weight: 600`, `letter-spacing: -0.5`, preceded by the teal chevron mark. Build it as a reusable **`<Logo>` React component**, NOT a flat image — render the chevron as inline SVG (`brand/logo-wordmark.svg` is the reference geometry) and the words as live text so it inherits Geist and stays crisp. Used in the nav and footer. `brand/logo-wordmark.svg` is the standalone-image fallback for OG/email only.
- **Favicon / icon:** `brand/favicon.svg` — solid teal rounded square with an off-white chevron. Use it for `favicon.svg`, the apple-touch-icon, and as the basis for the OG image. In Step 5, also export PNGs at 32×32, 180×180 (apple-touch), and 512×512 (use `sharp` or `@resvg/resvg-js` in a small build script, or note for Jacob to run it once).

## Tech Stack

- **Next.js (latest, App Router) + TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** for accessible primitives (Button, Card, etc.) — restyle tokens to the palette above so it doesn't look like default shadcn.
- **Static export / SSG** — no server runtime needed. Deploy target **Vercel** (best Next.js DX; point the Cloudflare-managed `steinproduct.com` DNS at Vercel). Note in the README that Cloudflare Pages is a fine alternative if preferred.
- Fonts via `next/font` (Geist + Geist Mono ship with Next).
- `next/image` for any imagery. `lucide-react` for icons (used minimally).

## Current State

Greenfield — nothing exists yet. Real values to wire in (use placeholders only where noted, and leave an obvious `// TODO:` so Jacob can drop the final URLs in):

- **Calendly (free intro):** the **Intro Call event link** — `// TODO: paste Intro Call event URL` (base profile is `calendly.com/steinproduct`, but use the specific *event* link so the paid session isn't exposed on the public site).
- **Stripe Payment Links:** one per buyable product — `// TODO: AI Quick-Win Session payment link`, etc.
- **Email:** `hello@steinproduct.com` (Cloudflare Email Routing → Gmail).
- **Social:** LinkedIn `https://www.linkedin.com/in/jacobstein22/`. Substack `// TODO`.

## Content (ready-to-use copy — use verbatim)

**Hero**
- Eyebrow (mono): `PRODUCT CONSULTING · AI AUTOMATION`
- Headline: `I build the AI tools your business keeps meaning to.`
- Subhead: `I'm Jacob Stein — a Principal-level product manager who now ships AI agents and automations for small teams. In one session, we turn a repetitive, time-sucking workflow into a working tool you own.`
- Primary CTA: `Book a free intro call` → Calendly intro event
- Secondary CTA: `See how it works` → scrolls to Services

**Services / Product Ladder** (section eyebrow: `WHAT YOU CAN BUY`)
Render as cards. Each: name, price, one-line outcome, 2–3 bullet details, a CTA.
1. **AI Quick-Win Session** — `$1,000` (note: `$750 for the first few`). Outcome: *One repetitive workflow, turned into a working tool — live, in ~90 minutes.* Details: a single focused session; we build one real automation together; you keep it plus a Loom walkthrough. CTA: `Book a Quick-Win` → Stripe Payment Link.
2. **AI Workflow Sprint** — `$3,000–$6,000` over two weeks. Outcome: *A bigger workflow rebuilt end-to-end, tested and handed off.* Details: scoped to one meaningful process; built, documented, and shipped; async-friendly. CTA: `Start a sprint` → Calendly / contact.
3. **Enablement Retainer** — `$1,500/mo`, month-to-month. Outcome: *One new working tool or automation shipped every month.* Details: shared backlog you prioritize; same-day weekday async; monthly "what's new" briefing; cancel anytime (30 days). CTA: `Talk about a retainer` → Calendly.
4. **Paid Strategy Session** — `$200–$400`. Outcome: *60 minutes to pressure-test where AI actually helps your business.* Details: no build, just sharp direction; book and pay in one step. CTA: `Book a strategy session` → Calendly paid event.

**About** (eyebrow: `WHO YOU'RE WORKING WITH`)
`I spent my career as a product manager shipping software at companies where the stakes were high — aerospace and defense at Boeing and Maxar, real-money sports betting at Tipico. I led product as a Principal IC: figuring out what to build, why it matters, and how to ship it without breaking things that can't break.`

`Now I do that for small businesses, with AI. Most teams have three or four workflows they've been meaning to automate for a year — the report nobody wants to assemble, the data that gets copied between tools by hand, the follow-up that slips. I find the one with the highest payoff and build it with you, fast. You don't get a slide deck. You get a working tool.`

`I build with modern AI tooling and ship real software — Next.js, TypeScript, AI agents — so "automation" means something that actually runs, not a fragile prototype.`

**Testimonials** (eyebrow: `WHAT CLIENTS SAY`)
Build the section + a typed data structure, but seed with **one placeholder** clearly marked, since the first testimonial is pending. Render gracefully when the array has 0–N items (don't show an empty section header if there are none — but keep the component ready).

**Work / Projects** (eyebrow: `THINGS I'VE BUILT`)
Stub section, hidden or "coming soon" for v1, with a typed `projects` array ready to populate. Seed entries (mark as personal projects): *Pick Receipts* (sports-betting transparency platform), *MLB Draft Tracker*, *Client Reporting Dashboard*. Each entry: title, one-line description, optional link, tag(s). This is the extensibility hook for the future portfolio.

**Footer**
Wordmark `SteinProduct`, one-line positioning, email link, LinkedIn, `// TODO Substack`, copyright `© {year} Stein Product`. Small mono tagline: `Built and run by Jacob Stein. Denver, CO.`

## Implementation Steps

### Step 1: Scaffold the project
**Do:** Create a new Next.js app (App Router, TypeScript, Tailwind, ESLint, `src/` dir, import alias `@/*`). Initialize git. Install `shadcn/ui`, `lucide-react`. Set up `next/font` with Geist Sans + Geist Mono.
**Why:** Clean, conventional foundation that's easy to extend.
**Validate:** `npm run dev` serves the default page with no errors; `npm run build` succeeds.

### Step 2: Establish the design system / tokens
**Do:** In the global CSS / Tailwind theme, define semantic tokens: `--background` (warm off-white), `--foreground` (charcoal), `--accent` (chosen amber OR teal), `--muted`, `--border`, plus mono/sans font variables. Wire shadcn components to these tokens so nothing looks like stock shadcn. Create a tiny `/styleguide` route (or a Storybook-lite page) rendering headings, body, mono labels, buttons, and a card so the system is visible.
**Why:** Locking tokens first prevents inconsistent one-off styling later — the main defense against "vibe-coded."
**Validate:** Visit `/styleguide`; confirm one accent color, consistent spacing, mono eyebrows, AA contrast. Screenshot it.

### Step 3: Content layer
**Do:** Create typed content modules under `src/content/`: `services.ts`, `testimonials.ts`, `projects.ts` (exported typed arrays matching the copy above). Components read from these — no hard-coded content in JSX.
**Why:** This is the extensibility contract — adding a project/testimonial/Substack post later is a data edit, not a code change.
**Validate:** `tsc` passes; importing each array in a test page renders the data.

### Step 4: Build the page sections
**Do:** Build, in order, as composable sections on the home route (`/`): Nav (sticky, minimal), Hero, Services (cards from `services.ts`), About, Testimonials (graceful empty state), Projects (stub/"coming soon"), CTA band, Footer. Use the provided copy verbatim. CTAs link to the `// TODO` Calendly/Stripe placeholders. Make Services and About their own routes too (`/services`, `/about`) if it keeps the home page from getting too long — your call, but home must stand alone as a complete pitch.
**Why:** Single strong landing page that converts, with room to grow into multi-page.
**Validate:** Home page renders all sections with real copy, responsive at 375px / 768px / 1280px. No console errors. Take screenshots at each breakpoint and confirm layout holds.

### Step 5: Wire CTAs, SEO, and polish
**Do:** Centralize all external links (Calendly, Stripe links, email, social) in one `src/config/links.ts` with clear `TODO` markers. Add metadata: title, description, Open Graph tags, a generated OG image or a simple branded static one, favicon, `sitemap.ts`, `robots.ts`. Add subtle scroll-in animation (one tasteful variant). Ensure all interactive elements are keyboard-accessible with visible focus rings.
**Why:** Link centralization makes Jacob's final wiring trivial; SEO/OG makes shared links look professional.
**Validate:** Run Lighthouse (or `npx unlighthouse`) — target Performance ≥ 95, Accessibility ≥ 95, Best Practices & SEO ≥ 95. Report scores. Verify the OG card renders.

### Step 6: Deploy config + docs
**Do:** Write a `README.md` covering: local dev, where content lives, how to add a project/testimonial, where to paste the real Calendly/Stripe/Substack URLs (`src/config/links.ts`), and step-by-step Vercel deploy + pointing `steinproduct.com` DNS (currently on Cloudflare) at Vercel (note Cloudflare Pages as the alternative). Do NOT deploy automatically — leave it to Jacob.
**Why:** Jacob finishes the wiring and ships when ready; nothing is hard-coded that he can't find.
**Validate:** README is followable by someone who didn't build the site; `npm run build` passes clean one final time.

## Constraints
- **No payment backend.** Stripe = outbound links to hosted Payment Links only. No Stripe SDK, no secret keys in the repo.
- **No CMS, no database.** Content lives in typed files in `src/content/`.
- All external URLs go through `src/config/links.ts` with `// TODO` markers — never inline a placeholder URL in a component.
- Keep dependencies lean. Justify anything beyond Next, Tailwind, shadcn, lucide, and fonts.
- Mobile-first and accessible (WCAG AA) are non-negotiable.
- No emoji in UI, no gradient hero, no glassmorphism, no lorem ipsum.

## Definition of Done
A Next.js + Tailwind + shadcn site that builds clean and runs statically. Home page delivers the full pitch — hero, the four-tier service ladder, about, testimonials (graceful when empty), a projects stub, and clear CTAs — in the warm-technical visual style with one accent color and mono accents. All content is typed and editable in `src/content/`; all external links are centralized in `src/config/links.ts` with obvious TODOs for Jacob's Calendly/Stripe/Substack URLs. Lighthouse ≥ 95 across the board. README explains editing, link-wiring, and Vercel deployment. Nothing is deployed automatically. The codebase is structured so adding portfolio/Substack content later is a data edit, not a refactor.
