import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { milestones, resultsHeader, stats } from "@/content/advisory";

/**
 * Numbers first, on hairlines like an instrument readout, then the results
 * that are not a number as quiet panels. Data in src/content/advisory.ts.
 */
export function Results() {
  return (
    <section id="results" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow={resultsHeader.eyebrow} title={resultsHeader.title} />
        <dl className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70} className="border-t border-line pt-6">
              <dt className="signal text-ink-faint uppercase">{stat.org}</dt>
              <dd className="mt-3">
                <span className="display-l block">{stat.value}</span>
                <span className="mt-3 block max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {milestones.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="flex">
              <GlassPanel as="li" solid className="w-full p-6">
                <span className="signal text-ink-faint uppercase">{item.org}</span>
                <h3 className="sp-panel-title mt-3">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
