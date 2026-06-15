import { Container, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";

const PARAGRAPHS = [
  "I spent my career as a product manager shipping software at companies where the stakes were high — aerospace and defense at Boeing and Maxar, real-money sports betting at Tipico. I led product as a Principal IC: figuring out what to build, why it matters, and how to ship it without breaking things that can't break.",
  "Now I do that for small businesses, with AI. Most teams have three or four workflows they've been meaning to automate for a year — the report nobody wants to assemble, the data that gets copied between tools by hand, the follow-up that slips. I find the one with the highest payoff and build it with you, fast. You don't get a slide deck. You get a working tool.",
  'I build with modern AI tooling and ship real software — Next.js, TypeScript, AI agents — so "automation" means something that actually runs, not a fragile prototype.',
] as const;

const TRACK_RECORD = ["Boeing", "Maxar", "Tipico"] as const;

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border/70 py-20 sm:py-28">
      <Container className="grid gap-10 md:grid-cols-3 md:gap-14">
        <div className="md:col-span-1">
          <Reveal>
            <Eyebrow>WHO YOU&apos;RE WORKING WITH</Eyebrow>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              A Principal PM who ships, now pointed at your backlog.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
              {TRACK_RECORD.map((company) => (
                <li
                  key={company}
                  className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {company}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground/90">
            {PARAGRAPHS.map((paragraph, i) => (
              <Reveal as="div" key={i} delay={i * 60}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
