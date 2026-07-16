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
import { serviceBuckets, pricingNote } from "@/content/services";
import { PRODUCTS } from "@/config/links";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-border/70 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="WHAT I CAN BUILD FOR YOU"
          title="Three ways to get things off your plate."
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
                        {bucket.entryOffer.guarantee ? (
                          <p className="mt-3 border-t border-border/70 pt-3 text-sm font-medium leading-relaxed text-primary">
                            {bucket.entryOffer.guarantee}
                          </p>
                        ) : null}
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

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {pricingNote}
        </p>
      </Container>
    </section>
  );
}
