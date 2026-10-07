---
target: homepage
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/Users/jacobstein/Documents/Claude/Projects/Consulting/Website/src/app/page.tsx"
target_fingerprint: "sha256:f842d6015474c104e0105786af1a22fa5235a82a2deaa14503d6d14a35ad3046"
target_path: /Users/jacobstein/Documents/Claude/Projects/Consulting/Website/src/app/page.tsx
timestamp: 2026-10-07T19-53-43Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector/browser sub-agent), homepage at http://localhost:3000 (source: src/app/page.tsx), Persuade surface.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No button says it opens Calendly in a new tab; "30 minutes, no obligation" appears only in the closing band. |
| 2 | Match System / Real World | 3 | "Principal IC", "on your keys" (3 places), "Let's scope it", tags like "Apps Script" and "Static export" are not the buyer's words. |
| 3 | User Control and Freedom | 3 | Under 768px the four anchor links vanish with no menu; a phone user cannot jump to pricing or FAQ. |
| 4 | Consistency and Standards | 2 | Seven button labels for one Calendly destination; "Start a Quick-Win" and "Start a retainer" imply checkout. 16 em dashes against the brand rule. Eyebrow and H2 both read "Proof, not promises". |
| 5 | Error Prevention | 3 | Null links render disabled, but the disabled state explains itself only via a hover tooltip. |
| 6 | Recognition Rather Than Recall | 3 | The guarantee's "follow-up session" is never defined on the page. |
| 7 | Flexibility and Efficiency | n/a | Single-path persuasion page; anchor nav is the only accelerator it needs. |
| 8 | Aesthetic and Minimalist Design | 3 | Glow rationing holds, but 9 buttons, two half-empty service cards, a 4-line hero lead and a 140-word quote are not minimal. |
| 9 | Error Recovery | 2 | The only error state is a 45%-opacity dead button with a hover-only "Link coming soon". |
| 10 | Help and Documentation | 3 | FAQ does the job; the missing question is "What happens on the intro call?" |
| **Total** | | **25/36** | **Acceptable (69%)** |

## Design Specificity Verdict

**LLM assessment.** Authored at the edges, generic in the body. The hero (Anybody two-line headline, horizon gradient on "automated.", planet limb, sol focus ring) and the closing Aurora band could only be this brand, and the StepTrack's sol-lit step 01 ties the brand metaphor to the funnel: the free call is the first light. The middle 70% of the page is the category template (3 steps, 3 equal cards, bio, upsell band, 2 proof cards, 1 quote, 6 FAQ rows, CTA). The content inside those containers is specific ($1,500 flat, 13 documents, Habitat, "skipped the AI complexity") but the containers are interchangeable, and in the services row the template actively hurts: the proven, priced offer sits at equal weight to two "pricing on request" peers.

**Deterministic scan.** CLI scan of `src/app` and `src/components`: 0 findings, exit 0, confirmed with `--no-config`. In-page detector on the rendered homepage at 1440: 40 anti-patterns. Breakdown: ai-color-palette 9, dark-glow 9, low-contrast 8, kicker-above-heading 6, line-length 6, undersized-ui-text 2, all-caps-body 1, gradient-text 1, thin-border-wide-shadow 1, em-dash-overuse 1 (16 dashes), nested-cards 1.

False positives, with evidence: all 8 low-contrast findings resolved the text background to #0E6B6B, the 0% stop of a radial gradient centered below the viewport. Measured against the actual painted grounds, the muted text holds 8.7:1 to 9.4:1 and the faint text 6.4:1, consistent with the brand book's 4.5:1 claim. The 9 ai-color-palette, 9 dark-glow, 6 kicker-above-heading, gradient-text and all-caps-body findings fire on brand-mandated constructs (atmosphere grounds, glow as the design language, eyebrow-then-headline order, the one Highlight word, the Archivo Expanded eyebrow at exactly the spec). Real findings the detector adds that the review missed: six body paragraphs at 93 to 106 characters per line at 1440 (the brand book sets no measure, and these are over the readable ceiling); the "Own build" and "Client work" tags render at 10.5px; a card nested inside the featured card. The detector also counted 7 atmosphere-class grounds and 4 primary buttons on the page; the brand's cap is per view, so this is a flag to check, not a violation.

**Visual overlays.** Script injection succeeded and the detector ran in the page. The overlays are visible in the **[Human] steinproduct.com** tab in your browser, gold labels over the hero and down the page. The dev server has been stopped, so the tab shows the rendered state as-is; reloading it will fail until you start the server again.

## Overall Impression

The brand work landed: the page no longer looks like every Claude-built site, and the price reveal is the most honest panel in its category. The biggest opportunity is the funnel itself. Nine buttons with seven labels all open one 30-minute call, two of three service cards speak the exact language a burned buyer came here to avoid, and the first number a stranger sees after the price is $2,000 a month before any proof. Fix the funnel's shape and copy and the design is already there to carry it.

## What's Working

1. **Authored moments at both ends.** The horizon gradient on one word, the limb under the hero copy, and the sol-lit active step with its beam are specific to this brand, and glow rationing holds across the page (one primary per view, one featured panel).
2. **The price reveal answers all three buyer fears in one panel** (`services.tsx:46-63`): flat price, exactly what is included, the guarantee in aurora, the "from $2,500" anchor, and "never hourly" in the note.
3. **Candid proof.** A Problem/Built/Outcome case study with real numbers and a verbatim testimonial whose central story is "he told me not to buy AI." Hygiene is solid too: visible sol focus ring, skip link, native details, no-JS fallback, reduced motion honored, no horizontal overflow at 390.

## Priority Issues

1. **[P1] Seven labels, one destination, and "Start" implies checkout.**
   Why it matters: "Start a Quick-Win" and "Start a retainer" promise terms or payment and land on a free Calendly call; the mismatch costs trust at the commitment moment, and seven variants make one funnel look like many offers.
   Fix: one verb family. Card 1 "Book a call about a Quick-Win", card 2 "Book a call to scope it", card 3 and retainer "Book a call". Add a 12px signal line under each card button: "Starts with the free 30-minute intro call." Drop the hero's "See how it works" secondary; the section is 400px away.
   Where: `src/content/services.ts:75, 85, 95, 106`; `services.tsx:73-79`; `retainer.tsx:29-35`.
   Suggested command: /impeccable clarify

2. **[P1] The three-card grid dilutes the one proven offer and leaves two cards half empty.**
   Why it matters: at 1440 the featured card is roughly twice its siblings' height, so the AI-assistant and advisory cards show ~300px of void. "Scoped per engagement." and "Pricing on request." sit at equal weight to "$1,500 flat". The intro sentence lists three formats that do not map to the three cards.
   Fix: promote the Quick-Win to a full-width featured panel with a quieter two-up beneath it, or set `items-start` and cut cards 2 and 3 to title, pitch, button. Rewrite the intro to name the three outcomes, not formats.
   Where: `services.tsx:27`; `services.ts:24`.
   Suggested command: /impeccable layout

3. **[P1] Em dashes as separators throughout, against the brand book and PRODUCT.md.**
   Why it matters: it is the binding writing rule, and the detector confirms 16 in rendered body text. The retainer title, the page title and the meta description (search results and link previews) all use one.
   Fix: period, colon, comma or parentheses. Counts: services.ts 14, faq.ts 6, process.ts 4, projects.ts 4, about.tsx 2, layout.tsx 2, cta-band.tsx 1, projects.tsx 1. Leave the verbatim testimonial alone.
   Where: start with `src/app/layout.tsx:47-50` and `src/content/services.ts:102`.
   Suggested command: /impeccable clarify

4. **[P2] No reassurance beside the primary click, and the hero speaks about Jacob, not the buyer.**
   Why it matters: open-ended cost is fear one and the hero answers only speed and credentials; price and ownership first appear 2.5 viewports down. The buyer clicks a glowing button into another domain without being told it is 30 minutes, free, no prep.
   Fix: under the hero buttons, one signal-face proof row from brand copy: "Fixed scope, never hourly · You own the finished thing · Tools you already pay for". Under the primary button (hero and closing), a 12px line: "30 minutes on Calendly. No prep, no obligation." Trim the lead to two sentences, the first about the reader.
   Where: `hero.tsx:29-49`; `cta-band.tsx:22-25`.
   Suggested command: /impeccable clarify

5. **[P2] The retainer ($2,000/mo) appears before any proof.**
   Why it matters: a stranger sees $1,500, $2,500, 50% deposit and $2,000/mo before the first case study. The section order mirrors a past client's motion, not a first visit.
   Fix: move RetainerBand below Testimonials so the sequence reads Quick-Win, proof, keep going.
   Where: `src/app/page.tsx:17-21`.
   Suggested command: /impeccable layout

6. **[P2] Readability and touch details.** Six paragraphs run 93 to 106 characters per line at 1440; tags render at 10.5px; About on desktop puts the photo above the eyebrow and H2 so the headline lands below the body; the sticky nav CTA is 32px tall on phones; footer links are 18 to 20px; no mobile way to reach pricing or FAQ.
   Fix: cap body paragraphs at `max-w-prose` (about 65ch); raise `sp-tag` to 11px; render Eyebrow, H2, then photo in About; use the default button size for the nav CTA below md; add `py-2` to footer links; add a two-link row (Pricing, FAQ) on mobile.
   Where: `about.tsx:25-42`; `site-nav.tsx:42-47`; `site-footer.tsx:47-60`; `globals.css` tag rule.
   Suggested command: /impeccable adapt

## Persona Red Flags

**Jordan (non-technical first-timer):** eyebrow "AI PRODUCT BUILDS · AUTOMATION · CONSULTING" is a category list, not an answer to "what do I get". Hero lead names a practice, a title and three employers; nothing says what she walks away with. Will not parse "on your keys", "Principal IC", "Let's scope it", or the tags "Apps Script" and "Static export". Her blocker, "what happens on the intro call, do I prepare anything", has no FAQ entry.

**Casey (distracted mobile user):** at 390x844 the 4-line headline plus 7-line lead push the primary button to the fold edge, so the 32px sticky nav button is the real CTA. No way to jump to pricing or FAQ. Two full cards between the $1,500 card and the pricing note. The testimonial is two full screens with no pull line.

**Riley (stress tester):** with a null intro link every primary button ships at 45% opacity still reading "Book a free intro call", explained only by a hover tooltip (`cta-button.tsx:31-43`). At 200% zoom (720px) display-xl jumps from 44px straight to 76px, wrapping the headline to four lines and pushing the CTA off a 450px viewport; a 56px step between 640 and 1024 is missing (`globals.css:338-370`). The projects intro says "click through" but neither card has an href. Dev console shows a hydration mismatch on `<html>` from the inline `js` class script (`layout.tsx:112-116`).

**Morgan (revenue SMB owner burned by an open-ended freelancer quote):** scans for a number and finds it 2.5 viewports down. Two of three cards say "Scoped per engagement." and "Pricing on request." in the signal face, the phrases that burned him. The guarantee promises a free "follow-up session" the Quick-Win description never mentions. "No surprise invoices", the line he needs, is buried in FAQ Q6. "Start a Quick-Win" opening Calendly in a new tab feels like a bait into a sales call.

## Minor Observations

- Eyebrow and H2 for Projects are the identical string "Proof, not promises." Change one.
- The projects intro claims "Live products" while own products are not yet cleared for the page.
- Footer eyebrow "GET IN TOUCH" is the only eyebrow forced to ink-faint; the pricing note is centered under left-aligned cards.
- A card nested inside the featured card (`div.mt-5.rounded-md.border...bg-surface-2/60`) is the one detector finding on structure; consider a hairline divider instead.
- Reveal stagger fades the services row and About paragraphs in mid-screen on a brisk scroll; rootMargin 15% is tight.
- The hero's bottom padding reads as empty space at 1440 because the limb glow is subtle.
- Four `sp-btn-primary` instances on the page (nav, hero, featured card, closing). The brand cap is one per view, which holds, but the nav and hero buttons share a view above the fold.

## Questions to Consider

1. If seven buttons open the same 30-minute call, what would the page lose by having one label everywhere, and what would the buyer gain?
2. Does the three-card grid exist for the visitor or for the referrer's sentence? Could the referral sentence live in one line under a single featured offer?
3. Is $2,000/mo the second number a stranger should see, or a conversation for after the first build ships?
4. The guarantee is the bravest line on the page. Why is its key term, "follow-up session", undefined?
5. What would the hero say if it had to be true for a dental office manager who has never heard "Principal product manager"?
