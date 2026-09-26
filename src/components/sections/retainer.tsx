import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTAButton } from "@/components/cta-button";
import { retainer } from "@/content/services";
import { PRODUCTS } from "@/config/links";

/**
 * The "keep going" layer: the Enablement Retainer, sold after a delivered
 * Quick-Win. Sits below About (not among the buckets), mirroring the real sales
 * motion. An atmosphere band with one secondary button; no glow here.
 * Content lives in src/content/services.ts.
 */
export function RetainerBand() {
  const retainerLink = PRODUCTS[retainer.productKey];

  return (
    <section id="retainer" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="signal mb-4 text-ink-faint">{retainer.kicker}</p>
          <div className="sp-atmosphere rounded-lg border border-line p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="title text-foreground">{retainer.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {retainer.description}
                </p>
              </div>
              <CTAButton
                label={retainer.ctaLabel}
                href={retainerLink.href}
                kind={retainerLink.kind}
                variant="secondary"
                className="w-full shrink-0 sm:w-auto"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
