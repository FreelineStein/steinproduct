import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { CTAButton } from "@/components/cta-button";
import { serviceBuckets, pricingNote } from "@/content/services";
import { PRODUCTS } from "@/config/links";

/**
 * Three outcome buckets over an atmosphere band. The bucket with the entry
 * offer (Custom automation) leads as a full-width featured panel with the
 * rotating horizon rim: the proven, priced offer gets the weight, and the two
 * unpriced buckets sit beneath it as a quieter pair instead of as equal
 * siblings (2026-10-07). Prices and formats sit in the panel footer in the
 * signal face. Copy lives in src/content/services.ts.
 */
export function Services() {
  const featuredBucket = serviceBuckets.find((bucket) => bucket.entryOffer);
  const otherBuckets = serviceBuckets.filter((bucket) => bucket !== featuredBucket);

  return (
    <section
      id="services"
      className="sp-atmosphere-band scroll-mt-20 border-t border-line py-20 sm:py-28"
    >
      <Container>
        <SectionHeader
          eyebrow="WHERE TO START"
          title="Three ways to get things off your plate."
          intro="Each is an outcome, not a block of hours: a workflow automated, an AI assistant doing one job, or a product decision made with someone who has shipped. Start with whichever fits the problem."
        />

        {featuredBucket?.entryOffer ? (
          <Reveal className="mt-12">
            <GlassPanel as="article" featured className="p-6 sm:p-8">
              <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
                <div>
                  <h3 className="sp-panel-title">{featuredBucket.headline}</h3>
                  <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-ink">
                    {featuredBucket.pitch}
                  </p>
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                    {featuredBucket.description}
                  </p>
                  {featuredBucket.priceAnchor ? (
                    <p className="signal mt-6 text-ink-faint">
                      {featuredBucket.priceAnchor}
                    </p>
                  ) : null}
                </div>

                {/* The offer: a hairline-divided column, not a card inside a card. */}
                <div className="border-t border-line pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-12">
                  <p className="eyebrow">{featuredBucket.entryOffer.name}</p>
                  <p className="signal mt-2 text-2xl leading-8 font-semibold text-ink">
                    {featuredBucket.entryOffer.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {featuredBucket.entryOffer.detail}
                  </p>
                  {featuredBucket.entryOffer.guarantee ? (
                    <p className="mt-4 text-sm font-medium leading-relaxed text-aurora">
                      {featuredBucket.entryOffer.guarantee}
                    </p>
                  ) : null}
                  <CTAButton
                    label={featuredBucket.ctaLabel}
                    href={PRODUCTS[featuredBucket.productKey].href}
                    kind={PRODUCTS[featuredBucket.productKey].kind}
                    className="mt-6 w-full sm:w-auto"
                  />
                </div>
              </div>
            </GlassPanel>
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {otherBuckets.map((bucket, i) => {
            const link = PRODUCTS[bucket.productKey];
            return (
              <Reveal key={bucket.id} delay={80 + i * 80} className="flex">
                <GlassPanel as="article" className="flex w-full flex-col p-6 sm:p-8">
                  <h3 className="sp-panel-title">{bucket.headline}</h3>
                  <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-ink">
                    {bucket.pitch}
                  </p>
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                    {bucket.description}
                  </p>
                  <div className="mt-auto">
                    {bucket.priceAnchor ? (
                      <div className="sp-panel-footer">
                        <span className="whitespace-normal">{bucket.priceAnchor}</span>
                      </div>
                    ) : null}
                    <CTAButton
                      label={bucket.ctaLabel}
                      href={link.href}
                      kind={link.kind}
                      variant="secondary"
                      className="mt-5 w-full sm:w-auto"
                    />
                  </div>
                </GlassPanel>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
          {pricingNote}
        </p>
      </Container>
    </section>
  );
}
