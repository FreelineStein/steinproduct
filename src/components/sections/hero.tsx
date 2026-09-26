import { Container, Eyebrow } from "@/components/section";
import { Aurora } from "@/components/first-light";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { CALENDLY, PRIMARY_CTA } from "@/config/links";

/**
 * The hero sits on the first of the page's two Aurora grounds (the closing
 * CTA is the other). It holds the LCP element (the headline), so the headline
 * and subhead render fully static; the pure-CSS `.intro` entrance runs only
 * on the eyebrow and the buttons, never gated on hydration.
 */
export function Hero() {
  return (
    <section className="border-b border-line">
      <Aurora flat>
        {/* Extra bottom padding keeps the lower fifth clear for the limb glow. */}
        <Container className="pt-24 pb-36 sm:pt-32 sm:pb-44">
          <div className="max-w-4xl">
            <Eyebrow className="intro">
              AI PRODUCT BUILDS · AUTOMATION · CONSULTING
            </Eyebrow>
            <h1 className="display-xl mt-6 text-balance">
              Your busy work,{" "}
              <span className="sm:whitespace-nowrap">
                <span className="highlight">automated</span> —
              </span>{" "}
              live within a week.
            </h1>
            <p className="lead mt-8 max-w-2xl">
              Stein Product is a consulting practice that gets businesses
              organized and puts AI to work on the workflows costing them the
              most. It&apos;s led by Jacob Stein, a Principal product manager who
              shipped software at Boeing, Maxar, and real-money sports-betting
              apps used by millions of players.
            </p>
            <div
              className="intro mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "180ms" }}
            >
              <CTAButton
                label={PRIMARY_CTA.label}
                href={CALENDLY.introCall}
                kind="calendly"
                className={ctaLg}
              />
              <Button asChild variant="secondary" className={ctaLg}>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </div>
        </Container>
      </Aurora>
    </section>
  );
}
