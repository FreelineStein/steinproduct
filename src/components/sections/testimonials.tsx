import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { liveTestimonials } from "@/content/testimonials";

/**
 * Renders only when there is at least one live (non-pending) testimonial, so
 * the section never shows an empty header. A lone quote gets a centered,
 * readable measure; two or more fall into the card grid. Quotes are multi-
 * paragraph and rendered verbatim — publish one in src/content/testimonials.ts.
 */
export function Testimonials() {
  if (liveTestimonials.length === 0) return null;

  const isSolo = liveTestimonials.length === 1;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="WHAT CLIENTS SAY" title="In their words." />
        <div
          className={
            isSolo
              ? "mt-12 mx-auto max-w-2xl"
              : "mt-12 grid gap-6 sm:grid-cols-2"
          }
        >
          {liveTestimonials.map((t, i) => (
            <Reveal as="article" key={t.id} delay={(i % 2) * 80}>
              <Card className="h-full rounded-2xl border border-border bg-card shadow-sm ring-0 [--card-spacing:--spacing(6)]">
                <CardContent className="flex h-full flex-col gap-6 pt-6">
                  <blockquote className="flex flex-col gap-4 text-base leading-relaxed text-foreground/90 text-pretty sm:text-lg">
                    {t.quote.map((paragraph, p) => (
                      <p key={p}>
                        {p === 0 ? "“" : null}
                        {paragraph}
                        {p === t.quote.length - 1 ? "”" : null}
                      </p>
                    ))}
                  </blockquote>
                  <footer className="mt-auto">
                    <p className="font-medium text-foreground">{t.name}</p>
                    {(t.role || t.company) && (
                      <p className="font-mono text-xs text-muted-foreground">
                        {[t.role, t.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </footer>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
