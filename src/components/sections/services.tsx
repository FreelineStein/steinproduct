import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { services, servicesHeader } from "@/content/advisory";

/** Six quiet panels, numbered in the signal face. Data in src/content/advisory.ts. */
export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow={servicesHeader.eyebrow} title={servicesHeader.title} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 70} className="flex">
              <GlassPanel as="li" solid className="w-full p-6">
                <span className="signal text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="sp-panel-title mt-3 text-balance">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
