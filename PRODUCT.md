# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (confirmed 2026-10-07):** owners and operations leads at small businesses *with revenue* and an obvious repetitive workflow: agencies, law and accounting firms, real-estate teams, clinics, contractors, e-commerce shops. They are not technical, they are busy, and they arrive wary of open-ended cost, of a stranger working inside their systems, and of depending on a single individual. Their job on the site is to decide whether to book a free 30-minute intro call.

Nonprofits are evidence, not the target. Habitat for Humanity Inland Valley is the named case study because it is the perfect picture of the problem, not because nonprofits are who the site sells to.

**Secondary, warm and slower:** product teams and operators in regulated consumer and defense-adjacent industries (sports betting and iGaming, aerospace and defense) who want principal-level product and AI advisory. The site keeps that work visible without letting it set the tone.

## Product Purpose

steinproduct.com is the marketing site for Stein Product, an independent product consultancy led by Jacob Stein. It explains what the practice builds, shows proof it has done so, and pushes the visitor to book a free intro call. It is a fully static site with no backend, database, CMS or payment code; booking runs through Calendly and payment happens later in the funnel.

**Success (confirmed 2026-10-07):** booked intro calls. That is the one conversion. Everything else on the page supports it.

## Positioning

A principal-level product manager who ships real software, now pointed at a small business's backlog. The claims a neighbor cannot truthfully copy:

- **Speed to delivered, never session as delivery.** A 90-minute kickoff picks the workflow and locks scope; the build happens asynchronously; it is live and documented within a week of kickoff. The 90-minute figure describes the kickoff only.
- **You own the finished thing.** The finished automation runs in the client's accounts, on their keys. Ownership is an outcome claim about the finished work, never a process claim about where the build happens (their systems or a sandbox handed over at the end).
- **Tools you already pay for.** The assessment recommends the cheapest path, including no new software and no per-use fees; the Habitat engagement skipped AI entirely because a plain automation was the smarter answer.
- **Fixed scope, priced on the outcome, never hourly.** Scope is the variable, never the number.
- **A real handoff**, not ship-and-vanish: live demo, recorded walkthrough, written docs the team can run on its own.
- **The practice runs on these tools itself.** AI assistants are built and operated for Stein Product's own work every day. That is the honest proof-of-work claim for bucket 2.

The tagline of record: "Modern AI, shipped as working software."

## Operating Context

- **Funnel:** every site CTA routes to the free 30-minute intro call on Calendly (the specific intro event link, never the base profile). Intro call → scope → agreed price → 50% deposit → kickoff. Payment links are not on the site (decided 2026-07-16); Stripe is invoicing and subscriptions inside the funnel.
- **Delivery:** 90-minute kickoff, async build, demo plus recorded walkthrough plus written docs, live within a week. Guarantee: if it is not live and documented within a week of kickoff, the follow-up session is free. Never refund or money-back language.
- **Client tools in play:** Google Workspace and Apps Script, spreadsheets, document templates, the no-code automation layer (Zapier, Make, n8n) and model platforms (ChatGPT, Claude, Gemini). The framework clients pay for: adopt an existing tool, configure a no-code workflow, or build custom.
- **Referral moment:** the three outcome buckets exist so a past client can answer "how do I refer you?" in one sentence.
- **Content engine:** an early-stage Substack exists and is linked in the footer; it is not a site conversion goal.

## Capabilities and Constraints

**Offer structure (site-facing, shipped 2026-07-14, repriced 2026-07-16):**

| Bucket | Entry and price | Status |
|---|---|---|
| Custom automation for your business | AI Quick-Win, $1,500 flat; larger builds fixed-scope from $2,500 | Proven, named case study |
| A custom AI assistant for your business | No public price; "Let's scope it" | Design-partner stage, never delivered for a client; keep bespoke, not unproven |
| Product & AI advisory | Pricing on request | Home for the regulated-industry track |

The Enablement Retainer ($2,000/mo: one automation of Quick-Win scope each month plus upkeep of everything already built, month-to-month) is a distinct "keep going" layer, never a fourth bucket and never split per bucket. Retired tiers (Paid Strategy Session, AI Workflow Sprint, the $750/$1,000 intro pricing) stay retired; the Strategy Session Calendly link is parked in config for a data-edit restore.

**Terminology:** "AI assistant" is the only user-facing term. "AI agent" is allowed in SEO keyword metadata only. "Nanoclaw" never appears. "MORE" is an internal program acronym; say "home repair program". Employer naming: Boeing and Maxar named; the betting employers are never named and are always described as "real-money consumer sports-betting products used by millions of players" (all three claims must survive any rewording).

**Technical:** Next.js App Router static export, no server runtime, no env vars, Tailwind v4 with shadcn primitives restyled to brand tokens, self-hosted fonts. All editable copy is typed data in `src/content/`; every outbound URL is declared once in `src/config/links.ts`, where `null` renders a disabled CTA rather than a broken one. Deploy target Vercel (Cloudflare Pages works). Lighthouse baseline 98 to 100 on performance and 100 on accessibility, measured against a compressing preview server; keep it.

**Explicitly undecided:**
- Whether to restore direct Quick-Win checkout once a $1,500 Stripe Payment Link exists, or keep the call-first funnel.
- Public pricing for the AI assistant bucket and the agent maintenance plan (after the first delivered build).
- Whether own-built products (Pick Receipts, MLB Draft Tracker) appear on the site as named proof. **Confirmed 2026-10-07: not yet.** They are available but undecided; do not add them without a go-ahead.
- iGaming sub-positioning if that track is activated.

## Brand Commitments

- **Name:** Stein Product, wordmark "SteinProduct". Never "Stein Products". Domain steinproduct.com, contact jacob@steinproduct.com, Denver, CO (California relocation planned).
- **Voice (2026-08-13, binding):** firm-led, named-principal. Structural and positioning copy speaks as "Stein Product"; Jacob is named where the claim is personal (hero credential line, bio, testimonial). "We" only where it plainly means client plus consultant. Never fabricate plurality. Firm voice is not passive voice: keep a live subject, prefer second person when the practice as subject reads stiff. `about.tsx` keeps its first-person bio and FAQ questions stay in the buyer's voice, both on purpose. "The practice" is used sparingly and never as a section label; eyebrows keep the reader or the proof as subject.
- **Writing rules (brand book):** plain, specific, warm, short sentences, numbers over adjectives, sentence case everywhere including buttons, uppercase only in the signal face. No em or en dashes as separators. No emoji, exclamation marks or AI-sparkle glyphs. Banned words: "our team", "leverage", "synergy", "revolutionize", "unlock".
- **Brand system:** First Light, Night theme only, finalized 2026-09-25. Rules of record in `brand/first-light/BRAND-BOOK.md`; tokens in `src/app/globals.css`; `/styleguide` renders the system. The logo is outlined artwork (signature, wordmark, tile/porthole) and is never retyped, recolored or reshaped. The Warm Technical look and Unbounded are rejected, not to be restored. The OG card is a generated PNG; regenerate it whenever the logo or tagline changes.

## Evidence on Hand

- **Testimonial:** Matthew, Home Repair Program, Habitat for Humanity Inland Valley, verbatim in `src/content/testimonials.ts`. Cleared in writing (vault: `Areas/Consulting/MORE-Automation/matthew-testimonial.md`). Never tightened, paraphrased or re-anonymized.
- **Case study:** document automation for Habitat for Humanity Inland Valley, structured problem/built/outcome in `src/content/projects.ts` (13 hand-filled documents per homeowner turned into a one-click generator in the Google Sheet they already used; the team maintains it; the engagement earned a referral).
- **Own build:** this site, listed as proof of the same AI-augmented workflow.
- **Credentials:** Principal IC product at Boeing and Maxar; real-money consumer sports-betting products used by millions of players. Headshot at `public/jacob-headshot.jpg`.
- **Brand pack:** `brand/first-light/` (brand book, tokens, logos, fonts, reference implementation) and every logo round in `brand/logo-iterations/`.
- **Absences that must not be fabricated:** only one client testimonial and one client case study exist. No AI assistant has been delivered for a client. No published hourly rate, no metrics or benchmarks beyond the Habitat outcome, no press, no additional logos. Own products are not cleared for the page yet.

## Product Principles

1. **Sell solved problems, not strategy.** SMBs buy outcomes; the assessment is the front door of a bucket, never its own product.
2. **Proof, not promises.** Every claim on the page must be true today and traceable to something shipped or cleared in writing. Narrow the scope before softening the truth.
3. **Remove the buyer's three fears in the copy itself:** open-ended cost (flat and fixed-scope pricing), loss of control (you own the finished thing), and dependence (handoff that lets them run it alone).
4. **One funnel, one conversion.** Every path ends at the free intro call. Do not add a second ask that competes with it.
5. **Firm-led, human-named.** Present a practice, never a team that does not exist, and never erase the person the proof is attached to.
6. **Content is data.** Adding a testimonial, project or offer must stay a data edit, not a rebuild.

## Accessibility & Inclusion

Non-technical readers are the primary audience, so copy avoids jargon and names tools by what they do. The site holds Lighthouse accessibility 100 and all motion is CSS that stops under `prefers-reduced-motion`; both are standing requirements, not aspirations.
