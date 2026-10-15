import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { worlds, worldsHeader, highlights } from "@/content/worlds";

/**
 * The positioning in two glass panels over an atmosphere band, then the
 * stat row. The panels are peers, so neither is `featured`; the glow budget
 * stays with the hero above and the work grid below.
 */
export function Worlds() {
  return (
    <section
      id="worlds"
      className="sp-atmosphere-band scroll-mt-20 border-t border-line py-20 sm:py-28"
    >
      <Container>
        <SectionHeader eyebrow={worldsHeader.eyebrow} title={worldsHeader.title} />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {worlds.map((world, i) => (
            <Reveal key={world.id} delay={i * 80} className="flex">
              <GlassPanel as="article" className="flex w-full flex-col p-6 sm:p-8">
                <p className="eyebrow">{world.eyebrow}</p>
                <h3 className="sp-panel-title mt-3">{world.title}</h3>
                <p className="signal mt-3 text-ink-faint">{world.where}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{world.lesson}</p>
                <p className="mt-auto border-t border-line pt-5 text-sm font-medium leading-relaxed text-aurora">
                  {world.takeaway}
                </p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
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
