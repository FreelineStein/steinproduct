import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { CTAButton } from "@/components/cta-button";
import type { ProductLink } from "@/config/links";
import type { CtaLocation } from "@/lib/analytics";
import type { Offer } from "@/content/consulting";

/**
 * One rim-lit panel for one way of working with me: what it is, why I do it,
 * the shapes it takes, and a single CTA. The /work page stacks two of these,
 * the featured one first. Copy is data in src/content/consulting.ts.
 */
export function OfferBand({
  offer,
  href,
  kind,
  ctaLocation,
  note,
  featured = false,
}: {
  offer: Offer;
  href: string | null;
  kind: ProductLink["kind"];
  ctaLocation: CtaLocation;
  /** Small signal-face line under the button, e.g. the destination's name */
  note?: string;
  featured?: boolean;
}) {
  return (
    <section id={offer.id} className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <Container>
        <Reveal>
          <GlassPanel as="article" featured={featured} solid={!featured} className="p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-[1.2fr_auto] md:items-start md:gap-12">
              <div>
                <p className="eyebrow">{offer.eyebrow}</p>
                <h2 className="headline mt-3 text-balance">{offer.title}</h2>
                <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-muted-foreground">
                  {offer.body}
                </p>
                <ul className="mt-6 max-w-[64ch] space-y-2 text-sm leading-relaxed text-foreground/90">
                  {offer.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-aurora" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:items-end md:pt-10">
                <CTAButton
                  label={offer.ctaLabel}
                  href={href}
                  kind={kind}
                  variant={featured ? "secondary" : "outline"}
                  ctaLocation={ctaLocation}
                  className="w-full sm:w-auto"
                />
                {note ? (
                  <span className="signal flex items-center gap-1 text-ink-faint">
                    {note}
                    {kind === "external" ? <ArrowUpRight aria-hidden="true" className="size-3.5" /> : null}
                  </span>
                ) : null}
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </section>
  );
}
