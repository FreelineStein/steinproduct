import { Plus } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { faqItems } from "@/content/faq";

/**
 * FAQ — objection handling via native <details>/<summary> disclosures, which are
 * keyboard-navigable and work with zero JS (fits the static export). Content is
 * in src/content/faq.ts.
 */
export function Faq() {
  if (faqItems.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border/70 py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="QUESTIONS" title="Answers before you ask." />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqItems.map((item, i) => (
            <Reveal key={item.question} delay={(i % 3) * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-sans text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
