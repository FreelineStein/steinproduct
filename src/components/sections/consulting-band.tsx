import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { CTAButton } from "@/components/cta-button";
import { CONSULTING } from "@/config/links";
import { consulting } from "@/content/consulting";

/** One rim-lit panel pointing at the consulting practice. Not a sales pitch. */
export function ConsultingBand() {
  return (
    <section id="consulting" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <Container>
        <Reveal>
          <GlassPanel as="article" featured className="p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-[1.2fr_auto] md:items-center md:gap-12">
              <div>
                <p className="eyebrow">{consulting.eyebrow}</p>
                <h2 className="headline mt-3 text-balance">{consulting.title}</h2>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                  {consulting.body}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <CTAButton
                  label={consulting.ctaLabel}
                  href={CONSULTING.url}
                  kind="external"
                  variant="secondary"
                  ctaLocation="consulting"
                  className="w-full sm:w-auto"
                />
                <span className="signal flex items-center gap-1 text-ink-faint">
                  {CONSULTING.name}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </section>
  );
}
