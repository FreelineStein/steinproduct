import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { liveTestimonials } from "@/content/testimonials";

/**
 * Renders only when there is at least one live (non-pending) testimonial, so
 * the section never shows an empty header. A lone quote gets a centered,
 * readable measure; two or more fall into the panel grid. Quotes are multi-
 * paragraph and rendered verbatim; publish one in src/content/testimonials.ts.
 * Each quote sits in a GlassPanel with the top catch-light; the attribution
 * is set in the signal face.
 */
export function Testimonials() {
  if (liveTestimonials.length === 0) return null;

  const isSolo = liveTestimonials.length === 1;

  return (
    <section className="sp-atmosphere border-t border-line py-20 sm:py-28">
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
            <Reveal key={t.id} delay={(i % 2) * 80}>
              <GlassPanel as="article" className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <blockquote className="flex flex-col gap-4 text-base leading-relaxed text-foreground/90 text-pretty sm:text-lg">
                  {t.quote.map((paragraph, p) => (
                    <p key={p}>
                      {p === 0 ? "“" : null}
                      {paragraph}
                      {p === t.quote.length - 1 ? "”" : null}
                    </p>
                  ))}
                </blockquote>
                <footer className="mt-auto border-t border-line pt-5">
                  <p className="font-medium text-foreground">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="signal mt-1 text-ink-faint">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </footer>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
