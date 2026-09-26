import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Aurora } from "@/components/first-light";
import { Logo } from "@/components/logo";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { CALENDLY, PRIMARY_CTA, MAILTO, SITE } from "@/config/links";

/** The closing call to action: the page's second and last Aurora, centered, with the signature logo. */
export function CtaBand() {
  return (
    <section className="pb-4">
      <Container>
        <Reveal>
          <Aurora
            className="border border-line"
            contentClassName="px-6 pt-16 pb-24 text-center sm:px-12 sm:pt-20 sm:pb-28"
          >
            <div className="mx-auto max-w-xl">
              {/* The signature: the logo as the main event, once per page. */}
              <Logo
                variant="signature"
                className="mx-auto mb-8 flex h-16 w-fit sm:mb-10 sm:h-24"
              />
              <h2 className="headline text-balance">
                Got something you&apos;ve been meaning to fix or automate?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Book a free intro call. We&apos;ll find the one with the highest
                payoff and scope a first build — 30 minutes, no obligation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAButton
                  label={PRIMARY_CTA.label}
                  href={CALENDLY.introCall}
                  kind="calendly"
                  className={ctaLg}
                />
                <Button asChild variant="secondary" className={ctaLg}>
                  <a href={MAILTO}>Email {SITE.email}</a>
                </Button>
              </div>
            </div>
          </Aurora>
        </Reveal>
      </Container>
    </section>
  );
}
