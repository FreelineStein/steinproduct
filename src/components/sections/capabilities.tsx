import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GlassPanel } from "@/components/first-light";
import { capabilities, capabilitiesHeader } from "@/content/capabilities";

/** Three quiet panels. Lists, not paragraphs: this is the scannable part. */
export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeader eyebrow={capabilitiesHeader.eyebrow} title={capabilitiesHeader.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((group, i) => (
            <Reveal key={group.title} delay={i * 70} className="flex">
              <GlassPanel as="article" solid className="w-full p-6">
                <h3 className="sp-panel-title">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-aurora" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
