# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (as of 2026-10-15):** a hiring manager or recruiter evaluating Jacob Stein for a Senior PM through Head of Product role, and a prospective client deciding whether to work with him. Both arrive from LinkedIn, a résumé link or a referral, and want to know in one scroll who he is, how strong the background is, and what he has actually built. Their job on the site is to decide to email him.

**Secondary:** a nonprofit or small-business lead who lands here first. The site points them to NetGoodLabs, the consulting practice, and does not sell services itself.

## Product Purpose

steinproduct.com is Jacob Stein's personal portfolio, in his own voice, on four pages (as of 2026-10-16):

- **Home** (`/`): hero, who I am with education, the résumé numbers, contact band. No builds on the home page (Jacob's call, 2026-10-16).
- **Journey** (`/journey`): the two worlds, the timeline (Boeing, Maxar, Tipico, LeoVegas, then independent; education stays on the home page, not the timeline), capabilities.
- **Work** (`/work`): the two ways to hire him. NetGoodLabs (what it is, why he started it, link to its site) and part-time product advisory (scoped over email). Matthew's testimonial sits under them, because it is about working with him.
- **Builds** (`/builds`): every real thing he has built, as cards in `src/content/work.ts`.

Fully static, no backend. The one conversion is an email; LinkedIn is the second action.

Consulting for nonprofits lives at NetGoodLabs (`CONSULTING` in `src/config/links.ts`); the Work page describes it and links there. Product advisory is the one offer sold on this site, and it is sold by email, not a form or a price. The previous consulting offer structure (buckets, Quick-Win, retainer, FAQ) was removed on 2026-10-15; the Calendly intro call is parked in config.

## Positioning

High-stakes engineering, fast consumer product, one product leader. The claims that hold up:

- **Two worlds.** Boeing avionics and Maxar satellite software taught verification, validation and program-scale coordination. Tipico and LeoVegas taught weekly shipping, experimentation, search and personalization across three international markets. Each makes him better at the other.
- **Numbers on the résumé:** 9+ years in product; three markets (Finland, Denmark, Brazil); first of 150+ teams in Boeing's internal product challenge; 15% search engagement lift and 12% search-to-bet conversion lift in two months at LeoVegas; managed and coached two product managers.
- **Builder.** Ships his own products and tools with AI agents daily: Pick Receipts (live), Ambient (prototype), Scout (weekly lead and job agent), the command center, Tasha (Discord second brain), the NFL and MLB friend-group trackers, NetGoodLabs and this site. Facts for the agents and internal tools come from the vault's `Brain/Projects/*/CLAUDE.md` mirrors (2026-10-16).
- **Education:** M.S. ECE, University of Washington; B.S. ECE, Boise State, minors in physics and applied mathematics.

## Terminology and naming

Employers are named as on the résumé and LinkedIn: The Boeing Company, Maxar Technologies, Tipico, LeoVegas Group (an MGM Resorts subsidiary). "Home repair program", never the acronym "MORE". No phone number on the site. No résumé PDF is hosted (it carries the phone number); the journey section is the résumé.

## Capabilities and Constraints

**Technical:** Next.js App Router static export, no server runtime, Tailwind v4 with shadcn primitives restyled to First Light tokens, self-hosted fonts, PostHog analytics. All copy is typed data in `src/content/`; every outbound URL is declared once in `src/config/links.ts`. Deploy target Vercel, Git-connected: pushes to `main` go to production, so redesigns happen on a branch and ship by merge. Lighthouse baseline 98 to 100 on performance and 100 on accessibility; keep it.

**Absences that must not be fabricated:** one client testimonial and one client case study exist. No user or pick counts exist for Pick Receipts. Ambient has no camera installed yet. Scout, the command center and Tasha have no public links (internal tools); the trackers link to the NFL app. No advisory client is named and no advisory price is published. No press, no additional logos.

## Brand Commitments

- **Name:** Stein Product, wordmark "SteinProduct". Never "Stein Products". Domain steinproduct.com, contact jacob@steinproduct.com, Denver, CO (California relocation planned).
- **Voice (2026-10-15, binding):** first person. Jacob speaks as "I" everywhere; "Stein Product" is the wordmark, not a narrator. Never fabricate plurality.
- **Writing rules (brand book):** plain, specific, warm, short sentences, numbers over adjectives, sentence case everywhere including buttons, uppercase only in the signal face. No em or en dashes as separators. No emoji, exclamation marks or AI-sparkle glyphs. Banned words: "our team", "leverage", "synergy", "revolutionize", "unlock".
- **Brand system:** First Light, Night theme only, finalized 2026-09-25. Rules of record in `brand/first-light/BRAND-BOOK.md`; tokens in `src/app/globals.css`; `/styleguide` renders the system. The logo is outlined artwork (signature, wordmark, tile/porthole) and is never retyped, recolored or reshaped. The Warm Technical look and Unbounded are rejected, not to be restored. The OG card is a generated PNG; regenerate it whenever the logo or tagline changes.

## Evidence on Hand

- **Résumé of record:** `/Users/jacobstein/Documents/Claude/Projects/Job Applications/For_Obsidian_Transfer/Jacob_Stein_Resume.docx` and `Job_Search_Context.md` (LinkedIn About text, employment dates, writing rule). Every journey bullet traces to it.
- **Testimonial:** Matthew, Home Repair Program, Habitat for Humanity Inland Valley, verbatim in `src/content/testimonials.ts`. Cleared in writing. Never tightened, paraphrased or re-anonymized.
- **Case study:** document automation for Habitat for Humanity Inland Valley, in `src/content/work.ts`.
- **Own products:** Pick Receipts (live at pickreceipts.com; repo `betting-creator-tracker`, private) and Ambient (prototype; `Ambient AI Project Sensors`). Facts in `src/content/work.ts` come from those repos' READMEs and docs.
- **Own builds:** NetGoodLabs (live) and this site.
- **Credentials:** named employers and degrees as on the résumé. Headshot at `public/jacob-headshot.jpg`.
- **Brand pack:** `brand/first-light/` and every logo round in `brand/logo-iterations/`.

## Product Principles

1. **Show, then tell.** The work grid and the journey carry the argument; adjectives do not.
2. **Proof, not promises.** Every claim is on the résumé or in a shipped repo. No invented metrics, users, press or logos.
3. **One page, one scroll.** A hiring manager should get who, how strong, and what he built without clicking.
4. **One action.** Email first, LinkedIn second. Nonprofit consulting is described on the Work page and pointed to NetGoodLabs; product advisory is scoped over email. Neither gets a price or a form here.
5. **First person, named employers.** Jacob speaks as himself; the résumé's employer names are public, so the site uses them.
6. **Content is data.** Changing the journey, adding work or a testimonial is a data edit in `src/content/`, not a rebuild.

## Accessibility & Inclusion

Non-technical readers are the primary audience, so copy avoids jargon and names tools by what they do. The site holds Lighthouse accessibility 100 and all motion is CSS that stops under `prefers-reduced-motion`; both are standing requirements, not aspirations.
