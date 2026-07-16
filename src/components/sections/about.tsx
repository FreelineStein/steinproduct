import Image from "next/image";
import { Container, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";

const PARAGRAPHS = [
  "I spent my career shipping software where the stakes were high: aerospace and defense at Boeing and Maxar, and consumer sports betting — real-money products where millions of players and their money move through the app. I led product as a Principal IC, figuring out what to build, why it matters, and how to ship it without breaking the things that can't break.",
  "Now I do that for businesses of every size, with AI. Most teams have three or four things they've been meaning to fix for a year: the report nobody wants to assemble, the data that gets copied between tools by hand, the process that lives in one person's head. I help you get organized, find the fix with the highest payoff, and build it for you, fast. You don't get a slide deck. You get something that works.",
  'I build with modern AI tooling and ship real software, so "automation" means something that actually runs, not a fragile prototype. That includes consumer products at scale — and I still ship my own; Pick Receipts below is live.',
] as const;

/** The two named, instantly-verifiable employers. The gaming operators are
 * carried as a credential descriptor, not named. */
const NAMED_EMPLOYERS = ["Boeing", "Maxar"] as const;
const GAMING_CREDENTIAL = "real-money consumer sports-betting operators";

/**
 * Headshot path (in /public). Set to `null` to fall back to the faceless
 * layout — same null-safe philosophy as the ProductLink pattern.
 */
const HEADSHOT: string | null = "/jacob-headshot.jpg";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border/70 py-20 sm:py-28">
      <Container className="grid gap-10 md:grid-cols-3 md:gap-14">
        <div className="md:col-span-1">
          <Reveal>
            {HEADSHOT ? (
              <Image
                src={HEADSHOT}
                alt="Jacob Stein"
                width={280}
                height={350}
                className="mb-8 aspect-[4/5] w-40 rounded-2xl border border-border object-cover object-top shadow-sm sm:w-48"
                priority={false}
              />
            ) : null}
            <Eyebrow>WHO YOU&apos;RE WORKING WITH</Eyebrow>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              A Principal PM who ships, now pointed at your backlog.
            </h2>
            <p className="mt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Shipped product at
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {NAMED_EMPLOYERS.map((company) => (
                <li
                  key={company}
                  className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-sm font-medium text-foreground/80"
                >
                  {company}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              + {GAMING_CREDENTIAL}
            </p>
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
