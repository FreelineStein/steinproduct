import Link from "next/link";
import { Logo } from "@/components/logo";
import { CTAButton } from "@/components/cta-button";
import { Container } from "@/components/section";
import { PRIMARY_CTA, CALENDLY } from "@/config/links";

/** `short` is the phone jump-row label, where four links share 342px. */
const NAV_LINKS = [
  { label: "How it works", short: "How it works", href: "/#how-it-works" },
  { label: "Services & pricing", short: "Pricing", href: "/#services" },
  { label: "Proof", short: "Proof", href: "/#proof" },
  { label: "FAQ", short: "FAQ", href: "/#faq" },
] as const;

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
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Full-height touch target on phones, where this is the one CTA in
              reach; the compact size returns once the anchor links are shown. */}
          <CTAButton
            label={PRIMARY_CTA.label}
            href={CALENDLY.introCall}
            kind="calendly"
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
        <ul className="flex items-center justify-between gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="signal inline-flex h-11 items-center rounded-sm px-2 text-ink-muted transition-colors hover:text-foreground"
              >
                {link.short}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
