import { Container, Eyebrow } from "@/components/section";
import { Aurora } from "@/components/first-light";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { CALENDLY, PRIMARY_CTA, CALL_REASSURANCE } from "@/config/links";

/**
 * The three claims that answer a wary owner's fears before the first scroll:
 * open-ended cost, loss of control, new software. Brand-book reuse copy.
 */
const PROOF_ROW = [
  "Fixed scope, never hourly",
  "You own the finished thing",
  "Tools you already pay for",
] as const;

/**
 * The hero sits on the first of the page's two Aurora grounds (the closing
 * CTA is the other). It holds the LCP element (the headline), so the headline
 * and lead render fully static; the pure-CSS `.intro` entrance runs only on
 * the eyebrow and the buttons, never gated on hydration.
 *
 * The lead speaks to the reader first and names Jacob second (2026-10-07);
 * the credential claims (Boeing, Maxar, real-money sports betting, millions
 * of players) are the site naming policy and must survive any rewording.
 */
export function Hero() {
  return (
    <section className="border-b border-line">
      <Aurora flat deep>
        {/* Extra bottom padding keeps the lower fifth clear for the limb glow. */}
        <Container className="pt-16 pb-32 sm:pt-32 sm:pb-40">
          <div>
            <Eyebrow className="intro">
              AI PRODUCT BUILDS · AUTOMATION · CONSULTING
            </Eyebrow>
            <h1 className="display-xl mt-6">
              <span className="block">
                Your busy work, <span className="highlight">automated.</span>
              </span>
              <span className="block">Live within a week.</span>
            </h1>
            {/* 18/28 on phones so the primary button stays above the fold;
                the brand's 20/32 lead from 640px up. */}
            <p className="lead mt-8 max-w-2xl text-lg leading-7 sm:text-xl sm:leading-8">
              Three or four things on your plate have needed fixing for a year:
              the report nobody wants to assemble, the data copied between tools
              by hand. Stein Product builds the fix and hands it over working,
              led by Jacob Stein, a Principal product manager who shipped
              software at Boeing, Maxar, and real-money sports-betting apps used
              by millions of players.
            </p>
            <div className="intro mt-10" style={{ animationDelay: "180ms" }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton
                  label={PRIMARY_CTA.label}
                  href={CALENDLY.introCall}
                  kind="calendly"
                  className={ctaLg}
                />
                <p className="signal text-ink-muted sm:pl-1">{CALL_REASSURANCE}</p>
              </div>
              <ul className="signal mt-8 flex flex-wrap gap-x-3 gap-y-2 text-ink-muted">
                {PROOF_ROW.map((claim, i) => (
                  <li key={claim} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span aria-hidden="true" className="text-ink-faint">
                        ·
                      </span>
                    ) : null}
                    {claim}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Aurora>
    </section>
  );
}
