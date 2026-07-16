import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

/**
 * The proof section: live products, this site, and shipped client work. Cards
 * carry a provenance label ("Own product" / "Own build" / "Client work") and
 * link out when an `href` is present. Client engagements can render a structured
 * case study (problem / built / outcome). Add or edit entries in
 * src/content/projects.ts — it's a data edit, not a code change.
 */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <section id="proof" className="scroll-mt-20 border-t border-border/70 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="PROOF, NOT PROMISES"
          title="Proof, not promises."
          intro="Live products and shipped client work — click through."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const isLink = Boolean(project.href);
            const inner = (
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      {project.label}
                    </span>
                    {isLink ? (
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-primary"
                      />
                    ) : null}
                  </div>
                </div>

                {project.caseStudy ? (
                  <dl className="mt-3 space-y-2.5 text-sm leading-relaxed">
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground/80">
                        Problem
                      </dt>
                      <dd className="mt-0.5 text-muted-foreground">
                        {project.caseStudy.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground/80">
                        Built
                      </dt>
                      <dd className="mt-0.5 text-muted-foreground">
                        {project.caseStudy.built}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground/80">
                        Outcome
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground/90">
                        {project.caseStudy.outcome}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                )}

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
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
                    className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
