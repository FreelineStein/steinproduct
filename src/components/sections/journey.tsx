import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/first-light";
import { cn } from "@/lib/utils";
import { journey } from "@/content/journey";

/**
 * A vertical timeline on an orbital line, newest first. Nodes glow aurora;
 * the current chapter gets the sol sun and a live tag. Content is data in
 * src/content/journey.ts.
 */
export function Journey() {
  return (
    <section id="journey" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="TIMELINE" title="Every stop, newest first." />

        <ol className="relative mt-14 border-l border-line pl-8 sm:pl-12">
          {journey.map((stop, i) => (
            <Reveal as="li" key={stop.id} delay={Math.min(i, 3) * 60} className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1.5 size-3 -translate-x-1/2 rounded-full",
                  "-left-8 sm:-left-12",
                  stop.current ? "bg-sol shadow-glow-sm" : "bg-aurora shadow-glow-sm",
                )}
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="signal text-ink-faint">{stop.dates}</span>
                {stop.current ? (
                  <Tag tone="sol" live>
                    Now
                  </Tag>
                ) : null}
              </div>
              <h3 className="mt-3 font-heading text-[22px] leading-snug font-bold tracking-[-0.01em] text-foreground">
                {stop.org}
              </h3>
              <p className="mt-1 text-base font-medium text-foreground/90">{stop.role}</p>
              <p className="signal mt-1 text-ink-faint">{stop.where}</p>
              <ul className="mt-4 max-w-[64ch] space-y-2 text-sm leading-relaxed text-muted-foreground">
                {stop.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-ink-faint" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
