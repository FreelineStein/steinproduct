import Image from "next/image";
import { Container, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";

// Stein Product speaks as a practice everywhere else on the page; this bio
// stays first-person on purpose (2026-08-13) — the credentials are personal and
// read false in third person. The lead-in names the practice, then Jacob speaks.
const PARAGRAPHS = [
  "Stein Product is led by Jacob Stein. I spent my career shipping software where the stakes were high: aerospace and defense at Boeing and Maxar, and consumer sports betting, real-money products where millions of players and their money move through the app. I led product as a Principal PM, figuring out what to build, why it matters, and how to ship it without breaking the things that can't break.",
  "Now I do that for businesses of every size, with AI. Most teams have three or four things they've been meaning to fix for a year: the report nobody wants to assemble, the data that gets copied between tools by hand, the process that lives in one person's head. I help you get organized, find the fix with the highest payoff, and build it for you, fast. You don't get a slide deck. You get something that works.",
  'I build with modern AI tooling and ship real software, so "automation" means something that actually runs, not a fragile prototype. That includes consumer products at scale.',
] as const;

/**
 * Headshot path (in /public). Set to `null` to fall back to the faceless
 * layout, the same null-safe philosophy as the ProductLink pattern.
 */
const HEADSHOT: string | null = "/jacob-headshot.jpg";

/** Quiet section: void ground, hairlines, no glow. */
export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container className="grid gap-10 md:grid-cols-3 md:gap-14">
        <div className="md:col-span-1">
          <Reveal>
            <Eyebrow>WHO YOU&apos;RE WORKING WITH</Eyebrow>
            <h2 className="headline mt-4 text-balance md:text-[28px]">
              A Principal PM who ships, now pointed at your backlog.
            </h2>
            {HEADSHOT ? (
              <Image
                src={HEADSHOT}
                alt="Jacob Stein"
                width={280}
                height={350}
                className="mt-8 aspect-[4/5] w-40 rounded-lg border border-line object-cover object-top sm:w-48"
                priority={false}
              />
            ) : null}
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <div className="max-w-[58ch] space-y-5 text-base leading-relaxed text-foreground/90">
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
