import { Check } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { services } from "@/content/services";
import { PRODUCTS } from "@/config/links";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="WAYS TO WORK TOGETHER"
          title="A clear ladder, from a first session to an ongoing partner."
          intro="Start small with a single fix, or go deeper. Every tier ends with something that actually runs, not a deck."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const link = PRODUCTS[service.productKey];
            return (
              <Reveal as="article" key={service.id} delay={(i % 2) * 80}>
                <Card
                  className={cn(
                    "h-full rounded-2xl border border-border bg-card shadow-sm ring-0 [--card-spacing:--spacing(6)] transition-shadow hover:shadow-md",
                    service.featured && "border-primary/30 ring-1 ring-primary/20",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      {service.featured ? (
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-primary">
                          Start here
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                        {service.price}
                      </span>
                      {service.priceNote ? (
                        <span className="font-mono text-xs text-muted-foreground">
                          {service.priceNote}
                        </span>
                      ) : null}
                    </div>
                    <CardDescription className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
                      {service.outcome}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <ul className="space-y-2.5">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-primary"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="bg-transparent">
                    <CTAButton
                      label={service.ctaLabel}
                      href={link.href}
                      kind={link.kind}
                      variant={service.featured ? "default" : "outline"}
                      className="h-10 w-full px-5 sm:w-auto"
                    />
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
