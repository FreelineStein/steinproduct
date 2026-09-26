import { Plus } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { faqItems } from "@/content/faq";

/**
 * FAQ: objection handling via native <details>/<summary> disclosures, which are
 * keyboard-navigable and work with zero JS (fits the static export). Hairline
 * dividers, no glow. Content is in src/content/faq.ts.
 */
export function Faq() {
  if (faqItems.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="QUESTIONS" title="Answers before you ask." />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqItems.map((item) => (
            <Reveal key={item.question}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-5 text-left text-base font-medium text-foreground transition-colors hover:text-aurora [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45 group-open:text-aurora"
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
