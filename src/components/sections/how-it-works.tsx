import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { processSteps } from "@/content/process";

/**
 * "How it works" — a small three-step strip between the hero and the services.
 * It answers the hero's implicit how-question ("often in one session"). The
 * hero's "See how it works" anchor targets this section (#how-it-works).
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-border/70 py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="HOW IT WORKS"
          title="Three steps, and you own the result."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="font-mono text-xs text-primary" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-sans text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
