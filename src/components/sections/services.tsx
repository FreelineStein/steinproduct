import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTAButton } from "@/components/cta-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  serviceBuckets,
  retainer,
  pricingNote,
} from "@/content/services";
import { PRODUCTS } from "@/config/links";

export function Services() {
  const retainerLink = PRODUCTS[retainer.productKey];

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="WHAT I CAN BUILD FOR YOU"
          title="Three ways I turn your backlog into working software."
          intro="Each is an outcome, not a block of hours. Start with a working session, a fixed-scope build, or an advisory call — whichever fits the problem."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serviceBuckets.map((bucket, i) => {
            const link = PRODUCTS[bucket.productKey];
            return (
              <Reveal as="article" key={bucket.id} delay={(i % 3) * 80}>
                <Card className="h-full rounded-2xl border border-border bg-card shadow-sm ring-0 [--card-spacing:--spacing(6)] transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      {bucket.headline}
                    </CardTitle>
                    <CardDescription className="mt-2 text-[0.95rem] font-medium leading-relaxed text-foreground/80">
                      {bucket.pitch}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {bucket.description}
                    </p>

                    {bucket.entryOffer ? (
                      <div className="rounded-xl border border-border bg-secondary/60 p-4">
                        <p className="text-sm font-medium text-foreground">
                          {bucket.entryOffer.name}
                        </p>
                        <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-foreground">
                          {bucket.entryOffer.price}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {bucket.entryOffer.detail}
                        </p>
                      </div>
                    ) : null}

                    {bucket.priceAnchor ? (
                      <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                        {bucket.priceAnchor}
                      </p>
                    ) : null}
                  </CardContent>

                  <CardFooter className="bg-transparent">
                    <CTAButton
                      label={bucket.ctaLabel}
                      href={link.href}
                      kind={link.kind}
                      variant={bucket.entryOffer ? "default" : "outline"}
                      className="h-10 w-full px-5"
                    />
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* The "keep going" layer — visually distinct from the buckets above. */}
        <Reveal delay={80}>
          <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
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

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground/80">
          {pricingNote}
        </p>
      </Container>
    </section>
  );
}
