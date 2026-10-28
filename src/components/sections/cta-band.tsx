import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Aurora } from "@/components/first-light";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { PRIMARY_CTA, PERSON } from "@/config/links";
import { closingCta } from "@/content/advisory";

/** The closing call to action: the page's second and last Aurora, centered. A page can pass its own copy. */
export function CtaBand({
  title = closingCta.title,
  body = closingCta.body,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section id="contact" className="scroll-mt-20 pb-4">
      <Container>
        <Reveal>
          <Aurora
            className="border border-line"
            contentClassName="px-6 pt-16 pb-24 text-center sm:px-12 sm:pt-20 sm:pb-28"
          >
            <div className="mx-auto max-w-xl">
              <h2 className="display-l text-balance">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {body}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAButton
                  label={PRIMARY_CTA.label}
                  href={PRIMARY_CTA.href}
                  kind={PRIMARY_CTA.kind}
                  ctaLocation="cta_band"
                  className={ctaLg}
                />
                <CTAButton
                  label="Connect on LinkedIn"
                  href={PERSON.linkedin}
                  kind="external"
                  variant="secondary"
                  className={ctaLg}
                  ctaLocation="cta_band"
                />
              </div>
            </div>
          </Aurora>
        </Reveal>
      </Container>
    </section>
  );
}
