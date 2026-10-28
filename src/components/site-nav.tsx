import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { CTAButton } from "@/components/cta-button";
import { Container } from "@/components/section";
import { CONSULTING, PRIMARY_CTA } from "@/config/links";

/**
 * Three pages, then NetGoodLabs, which leaves the site and says so with an
 * up-right arrow. `short` is the phone jump-row label, where the links share 342px.
 */
const NAV_LINKS = [
  { label: "Journey", short: "Journey", href: "/journey", external: false },
  { label: "Advisory", short: "Advisory", href: "/advisory", external: false },
  { label: "Builds", short: "Builds", href: "/builds", external: false },
  { label: CONSULTING.name, short: CONSULTING.name, href: CONSULTING.url, external: true },
] as const;

/** A nav link: internal pages through next/link, NetGoodLabs in a new tab. */
function NavLink({
  link,
  className,
  children,
}: {
  link: (typeof NAV_LINKS)[number];
  className: string;
  children: React.ReactNode;
}) {
  if (!link.external) {
    return (
      <Link href={link.href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight aria-hidden="true" className="-mt-1.5 size-3 shrink-0 self-start" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Sticky glass bar. Logo left, anchor links plus the one glowing CTA right. */
export function SiteNav() {
  return (
    <header className="sp-glass-bar sticky top-0 z-50">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Stein Product, home"
          className="rounded-sm"
        >
          {/* Under 640px the name plus the CTA do not fit, so the tile stands in. */}
          <Logo variant="tile" className="size-8 sm:hidden" />
          <Logo className="hidden h-8 sm:inline-flex md:h-9" />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  link={link}
                  className="inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Full-height touch target on phones, where this is the one CTA in
              reach; the compact size returns once the anchor links are shown. */}
          <CTAButton
            label={PRIMARY_CTA.label}
            href={PRIMARY_CTA.href}
            kind={PRIMARY_CTA.kind}
            ctaLocation="nav"
            size="sm"
            className="h-10 px-5 text-sm md:h-8 md:px-4 md:text-[0.8rem]"
          />
        </nav>
      </Container>
    </header>
  );
}

/**
 * Under 768px the anchor links leave the bar, so a phone visitor had no way to
 * jump to pricing or the FAQ. This row sits under the bar, scrolls away with
 * the page (it is not sticky, so it never eats the viewport), and gives the
 * same four jumps as 44px-tall targets in the signal face.
 */
export function MobileJumpRow() {
  return (
    <nav aria-label="Jump to" className="border-b border-line md:hidden">
      <Container className="px-4">
        <ul className="flex items-center justify-between gap-1 overflow-x-auto">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="shrink-0">
              <NavLink
                link={link}
                className="signal inline-flex h-11 items-center gap-0.5 rounded-sm px-1 text-ink-muted transition-colors hover:text-foreground"
              >
                {link.short}
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
