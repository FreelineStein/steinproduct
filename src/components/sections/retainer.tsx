import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTAButton } from "@/components/cta-button";
import { retainer } from "@/content/services";
import { PRODUCTS } from "@/config/links";

/**
 * The "keep going" layer — the Enablement Retainer, sold after a delivered
 * Quick-Win. Sits below About (not among the buckets), mirroring the real sales
 * motion. Content lives in src/content/services.ts.
 */
export function RetainerBand() {
  const retainerLink = PRODUCTS[retainer.productKey];

  return (
    <section id="retainer" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {retainer.kicker}
          </p>
          <div className="rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-sans text-lg font-semibold tracking-[-0.01em] text-foreground">
                  {retainer.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {retainer.description}
                </p>
              </div>
              <CTAButton
                label={retainer.ctaLabel}
                href={retainerLink.href}
                kind={retainerLink.kind}
                variant="outline"
                className="h-10 w-full shrink-0 px-5 sm:w-auto"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
