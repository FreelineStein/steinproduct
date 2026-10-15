import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { highlights } from "@/content/worlds";

/** The four résumé numbers in a row. Lives on the home page under About. */
export function Highlights() {
  return (
    <section className="border-t border-line py-14 sm:py-16">
      <Container>
        <Reveal>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label}>
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-heading text-[40px] leading-none font-extrabold tracking-[-0.02em] text-foreground">
                  {h.value}
                </dd>
                <dd className="mt-3 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                  {h.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
