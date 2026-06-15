import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { liveTestimonials } from "@/content/testimonials";

/**
 * Renders only when there is at least one live (non-pending) testimonial.
 * The first testimonial is pending, so for v1 this section renders nothing —
 * no empty header. Publish one in src/content/testimonials.ts to light it up.
 */
export function Testimonials() {
  if (liveTestimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="WHAT CLIENTS SAY" title="In their words." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {liveTestimonials.map((t, i) => (
            <Reveal as="article" key={t.id} delay={(i % 2) * 80}>
              <Card className="h-full rounded-2xl border border-border bg-card shadow-sm ring-0 [--card-spacing:--spacing(6)]">
                <CardContent className="flex h-full flex-col gap-6 pt-6">
                  <blockquote className="text-lg leading-relaxed text-foreground/90 text-pretty">
                    &ldquo;{t.quote}&rdquo;
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
