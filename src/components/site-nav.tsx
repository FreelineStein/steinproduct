import Link from "next/link";
import { Logo } from "@/components/logo";
import { CTAButton } from "@/components/cta-button";
import { Container } from "@/components/section";
import { PRIMARY_CTA, CALENDLY } from "@/config/links";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
] as const;

/** Sticky, minimal top nav. Logo left, anchor links + primary CTA right. */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Stein Product — home"
          className="rounded-sm text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CTAButton
            label={PRIMARY_CTA.label}
            href={CALENDLY.introCall}
            kind="calendly"
          />
        </nav>
      </Container>
    </header>
  );
}
