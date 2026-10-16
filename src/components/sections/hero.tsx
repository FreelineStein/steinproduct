import { Container, Eyebrow } from "@/components/section";
import { Aurora } from "@/components/first-light";
import { CTAButton, ctaLg } from "@/components/cta-button";
import { PRIMARY_CTA } from "@/config/links";
import { hero } from "@/content/hero";
import { TiledPlanetHero } from "@/components/sections/tiled-planet";

/**
 * The hero sits on the first of the page's two Aurora grounds (the closing
 * CTA is the other). It holds the LCP element (the headline), so the headline
 * and lead render fully static; the pure-CSS `.intro` entrance runs only on
 * the eyebrow and the buttons, never gated on hydration. The tiled planet in
 * the right column is a client component that loads after the copy paints.
 */
export function Hero() {
  return (
    <section className="border-b border-line">
      <Aurora flat deep>
        <Container className="hero-layout max-w-none !px-[clamp(24px,5.5vw,105px)] py-16 sm:py-20 lg:py-16">
          <div className="hero-copy">
            <Eyebrow className="intro">{hero.eyebrow}</Eyebrow>
            <h1 className="display-xl mt-6">
              <span className="block">{hero.headline.before}</span>
              <span className="block highlight">{hero.headline.highlight}</span>
            </h1>
            <p className="lead mt-8 max-w-2xl text-lg leading-7 sm:text-xl sm:leading-8">
              {hero.lead}
            </p>
            <div className="intro mt-10" style={{ animationDelay: "180ms" }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton
                  label={PRIMARY_CTA.label}
                  href={PRIMARY_CTA.href}
                  kind={PRIMARY_CTA.kind}
                  ctaLocation="hero"
                  className={ctaLg}
                />
                <a
                  href={hero.secondaryLink.href}
                  className="sp-btn sp-btn-ghost h-12 px-4 text-base"
                >
                  {hero.secondaryLink.label}
                </a>
              </div>
              <ul className="signal mt-8 flex flex-wrap gap-x-3 gap-y-2 text-ink-muted">
                {hero.proofRow.map((claim, i) => (
                  <li key={claim} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span aria-hidden="true" className="hidden text-ink-faint sm:inline">
                        ·
                      </span>
                    ) : null}
                    {claim}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hero-planet-column">
            <TiledPlanetHero />
          </div>
        </Container>
      </Aurora>
    </section>
  );
}
