import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel, Tag } from "@/components/first-light";
import { CTAButton } from "@/components/cta-button";
import { work, buildsHeader } from "@/content/work";

/**
 * The builds grid: quiet surface-1 panels with a provenance tag, a status
 * tag, three facts and a link where one exists. Live products get the
 * interactive lift; everything else stays flat. Data in src/content/work.ts.
 */
export function Work() {
  if (work.length === 0) return null;

  return (
    <section id="builds" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow="ALL BUILDS" title={buildsHeader.allTitle} />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {work.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 70} className="flex">
              <GlassPanel
                as="article"
                solid
                interactive={Boolean(item.href)}
                className="flex w-full flex-col p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Tag>{item.label}</Tag>
                  <Tag tone={item.status === "Live" ? "aurora" : "neutral"} dot={item.status === "Live"}>
                    {item.status}
                  </Tag>
                </div>
                <h3 className="mt-4 font-heading text-[20px] leading-snug font-bold tracking-[-0.01em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.description}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-ink-faint" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                  <ul className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="signal rounded-sm border border-line bg-surface-2/60 px-2 py-0.5 text-[11px] text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {item.href ? (
                    <CTAButton
                      label="Visit"
                      href={item.href}
                      kind="external"
                      variant="ghost"
                      size="sm"
                      ctaLocation="builds"
                      bucket={item.id}
                    />
                  ) : item.linkNote ? (
                    <span className="signal flex items-center gap-1 text-ink-faint">
                      {item.linkNote}
                    </span>
                  ) : null}
                </div>
                {item.href ? (
                  <ArrowUpRight aria-hidden="true" className="absolute top-6 right-6 size-4 text-aurora" />
                ) : null}
              </GlassPanel>
            </Reveal>
          ))}
        </ul>

      </Container>
    </section>
  );
}
