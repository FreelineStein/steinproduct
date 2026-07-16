import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { CALENDLY, PRIMARY_CTA, MAILTO, SITE } from "@/config/links";

export function CtaBand() {
  return (
    <section className="pb-4">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm sm:px-12">
            {/* Second (and final) textured section. */}
            <div
              aria-hidden="true"
              className="texture-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]"
            />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
                Got something you&apos;ve been meaning to fix or automate?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Book a free intro call. I&apos;ll find the one with the highest
                payoff and scope a first session — 30 minutes, no obligation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAButton
                  label={PRIMARY_CTA.label}
                  href={CALENDLY.introCall}
                  kind="calendly"
                  className={ctaLg}
                />
                <Button asChild variant="outline" className={ctaLg}>
                  <a href={MAILTO}>Email {SITE.email}</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
