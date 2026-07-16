import { Container, Eyebrow } from "@/components/section";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { CALENDLY, PRIMARY_CTA } from "@/config/links";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      {/* One of only two textured sections — a whisper-quiet dotted field. */}
      <div
        aria-hidden="true"
        className="texture-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      {/*
        The hero is above the fold and holds the LCP element (the headline), so
        it renders immediately — no scroll-in gating. A single, pure-CSS intro
        keeps a subtle entrance without depending on hydration.
      */}
      <Container className="relative py-24 sm:py-32">
        <div className="max-w-3xl">
          <Eyebrow className="intro">
            PRODUCT · AI AUTOMATION · OPERATIONS
          </Eyebrow>
          {/* Headline + subhead are LCP candidates — render them fully static
              (no opacity animation) so LCP isn't deferred behind hydration. */}
          <h1 className="mt-6 font-sans text-4xl font-semibold leading-[1.07] tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            Stop doing it by hand. I automate the workflow costing you the most
            — often in one 90-minute session.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I&apos;m Jacob Stein. I get businesses organized and put AI to work
            on the workflows costing them the most. Before this, I shipped
            software as a Principal PM at Boeing, Maxar, and real-money consumer
            sports-betting apps used by millions of players.
          </p>
          <div
            className="intro mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "180ms" }}
          >
            <CTAButton
              label={PRIMARY_CTA.label}
              href={CALENDLY.introCall}
              kind="calendly"
              className={ctaLg}
            />
            <Button asChild variant="ghost" size="default" className={ctaLg}>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
