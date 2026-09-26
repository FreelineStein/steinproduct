import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { StepTrack } from "@/components/first-light";
import { processSteps } from "@/content/process";

/**
 * "How it works" as a StepTrack between the hero and the services. It answers
 * the hero's implicit how-question ("live within a week"), and the hero's
 * "See how it works" anchor targets this section (#how-it-works). The first
 * step (the free intro call) is the active one: it is the visitor's next move.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-line py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="HOW IT WORKS"
          title="Three steps, and you own the result."
        />

        <Reveal className="mt-12">
          <StepTrack steps={processSteps} active={0} />
        </Reveal>
      </Container>
    </section>
  );
}
