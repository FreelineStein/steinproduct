import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { CTAButton } from "@/components/cta-button";
import { serviceBuckets, pricingNote } from "@/content/services";
import { PRODUCTS } from "@/config/links";

/**
 * Three outcome buckets as GlassPanels over an atmosphere band. The bucket
 * with the entry offer (Custom automation) is the group's one featured panel,
 * with the rotating horizon rim. Prices and formats sit in the panel footer in
 * the signal face. Copy lives in src/content/services.ts.
 */
export function Services() {
  return (
    <section
      id="services"
      className="sp-atmosphere scroll-mt-20 border-t border-line py-20 sm:py-28"
    >
      <Container>
        <SectionHeader
          eyebrow="WHERE TO START"
          title="Three ways to get things off your plate."
          intro="Each is an outcome, not a block of hours. Start with a Quick-Win, a fixed-scope build, or an advisory call — whichever fits the problem."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serviceBuckets.map((bucket, i) => {
            const link = PRODUCTS[bucket.productKey];
            const featured = Boolean(bucket.entryOffer);
            return (
              <Reveal key={bucket.id} delay={(i % 3) * 80} className="flex">
                <GlassPanel
                  as="article"
                  featured={featured}
                  className="flex w-full flex-col p-6"
                >
                  <h3 className="sp-panel-title">{bucket.headline}</h3>
                  <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-ink">
                    {bucket.pitch}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {bucket.description}
                  </p>

                  {bucket.entryOffer ? (
                    <div className="mt-5 rounded-md border border-line bg-surface-2/60 p-4">
                      <p className="text-sm font-medium text-ink">
                        {bucket.entryOffer.name}
                      </p>
                      <p className="signal mt-1 text-lg leading-7 font-semibold text-ink">
                        {bucket.entryOffer.price}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {bucket.entryOffer.detail}
                      </p>
                      {bucket.entryOffer.guarantee ? (
                        <p className="mt-3 border-t border-line pt-3 text-sm font-medium leading-relaxed text-aurora">
                          {bucket.entryOffer.guarantee}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="mt-auto">
                    {bucket.priceAnchor ? (
                      <div className="sp-panel-footer">
                        <span className="whitespace-normal">
                          {bucket.priceAnchor}
                        </span>
                      </div>
                    ) : null}
                    <CTAButton
                      label={bucket.ctaLabel}
                      href={link.href}
                      kind={link.kind}
                      variant={featured ? "default" : "secondary"}
                      className="mt-5 w-full"
                    />
                  </div>
                </GlassPanel>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {pricingNote}
        </p>
      </Container>
    </section>
  );
}
