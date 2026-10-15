import Image from "next/image";
import { Container, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { about } from "@/content/about";

/** Headshot path in /public. `null` falls back to the faceless layout. */
const HEADSHOT: string | null = "/jacob-headshot.jpg";

/** Quiet section: void ground, hairlines, no glow. First person throughout. */
export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="grid gap-10 md:grid-cols-3 md:gap-14">
        <div className="md:col-span-1">
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="headline mt-4 text-balance md:text-[28px]">{about.title}</h2>
            {HEADSHOT ? (
              <Image
                src={HEADSHOT}
                alt="Jacob Stein"
                width={280}
                height={350}
                className="mt-8 aspect-[4/5] w-40 rounded-lg border border-line object-cover object-top sm:w-48"
                priority={false}
              />
            ) : null}
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <div className="max-w-[58ch] space-y-5 text-base leading-relaxed text-foreground/90">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal as="div" key={i} delay={i * 60}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 border-t border-line pt-6">
            <p className="eyebrow text-ink-faint">Education</p>
            <ul className="mt-3 space-y-3">
              {about.education.map((e) => (
                <li key={e.school} className="text-sm leading-relaxed">
                  <span className="font-medium text-foreground">{e.school}</span>
                  <span className="text-muted-foreground">. {e.degree}</span>
                  <span className="signal ml-3 text-ink-faint">{e.years}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
