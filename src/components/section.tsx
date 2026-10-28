import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/cta-button";
import type { ProductLink } from "@/config/links";
import type { CtaLocation } from "@/lib/analytics";

/** Centered content column: the brand's 1180px content max width, consistent across the site. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1180px] px-6", className)}>
      {children}
    </div>
  );
}

/** Signal-face eyebrow label in aurora: the instrument-panel voice above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

/** Eyebrow + heading + optional intro, used at the top of most sections. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="headline mt-4 text-balance">{title}</h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Top of a subpage: eyebrow, display heading, optional intro and button. One per page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  cta,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Secondary, since the nav already holds the view's one primary button */
  cta?: { label: string; href: string | null; kind: ProductLink["kind"]; ctaLocation: CtaLocation };
}) {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow className="intro">{eyebrow}</Eyebrow>
          <h1 className="display-l mt-6 text-balance">{title}</h1>
          {intro ? (
            <p className="lead mt-6 max-w-2xl text-lg leading-7 sm:text-xl sm:leading-8">{intro}</p>
          ) : null}
          {cta ? (
            <CTAButton
              label={cta.label}
              href={cta.href}
              kind={cta.kind}
              variant="secondary"
              ctaLocation={cta.ctaLocation}
              className="mt-8 w-full sm:w-auto"
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
