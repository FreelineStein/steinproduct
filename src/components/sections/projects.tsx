import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

/**
 * Projects stub for v1 — entries render as "coming soon" tiles. This is the
 * extensibility hook for the future portfolio/studio site: flip `comingSoon`
 * to false (and add an `href`) in src/content/projects.ts to publish one.
 */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="scroll-mt-20 border-t border-border/70 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="THINGS I'VE BUILT"
          title="Selected work — case studies coming soon."
          intro="A look at what shipping with AI actually produces. Detailed write-ups are on the way; here's what's in the portfolio."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const isLink = !project.comingSoon && project.href;
            const inner = (
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {isLink ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                  ) : (
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
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
                    href={project.href}
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
