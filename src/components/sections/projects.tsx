import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/first-light";
import { cn } from "@/lib/utils";
import { projects } from "@/content/projects";

/**
 * The proof section: live products, this site, and shipped client work. Quiet
 * surface-1 panels with hairlines and no glow. Cards carry a provenance label
 * ("Own product" / "Own build" / "Client work") and link out when an `href` is
 * present. Client engagements can render a structured case study (problem /
 * built / outcome). Add or edit entries in src/content/projects.ts; it's a
 * data edit, not a code change.
 */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <section id="proof" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="WHAT HAS SHIPPED"
          title="Proof, not promises."
          intro="Shipped client work and the practice's own builds."
        />

        <ul
          className={cn(
            "mt-12 grid gap-6",
            // Columns only once there are entries to fill them.
            projects.length >= 2 && "sm:grid-cols-2",
            projects.length >= 3 && "lg:grid-cols-3",
          )}
        >
          {projects.map((project, i) => {
            const isLink = Boolean(project.href);
            const inner = (
              <div className="sp-panel sp-panel-solid flex h-full flex-col p-6 transition-colors group-hover/link:border-aurora/30">
                <div className="flex items-center justify-between gap-3">
                  <Tag>{project.label}</Tag>
                  {isLink ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-aurora"
                    />
                  ) : null}
                </div>
                <h3 className="mt-4 font-heading text-[17px] leading-snug font-bold tracking-[-0.01em] text-foreground">
                  {project.title}
                </h3>

                {project.caseStudy ? (
                  <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="eyebrow text-ink-faint">Problem</dt>
                      <dd className="mt-1 text-muted-foreground">
                        {project.caseStudy.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">Built</dt>
                      <dd className="mt-1 text-muted-foreground">
                        {project.caseStudy.built}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">Outcome</dt>
                      <dd className="mt-1 font-medium text-foreground/90">
                        {project.caseStudy.outcome}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                )}

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="signal rounded-sm border border-line bg-surface-2/60 px-2 py-0.5 text-[11px] text-ink-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <Reveal as="li" key={project.id} delay={(i % 3) * 70}>
                {isLink ? (
                  <a
                    href={project.href ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link block h-full rounded-lg"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
