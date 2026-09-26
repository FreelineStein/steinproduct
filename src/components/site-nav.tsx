import Link from "next/link";
import { Logo } from "@/components/logo";
import { CTAButton } from "@/components/cta-button";
import { Container } from "@/components/section";
import { PRIMARY_CTA, CALENDLY } from "@/config/links";

const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Services", href: "/#services" },
  { label: "Proof", href: "/#proof" },
  { label: "FAQ", href: "/#faq" },
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
          {/* Under 640px the name plus the CTA do not fit, so the mark stands in. */}
          <Logo showWordmark={false} className="sm:hidden" />
          <Logo className="hidden sm:inline-flex" />
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
          <CTAButton
            label={PRIMARY_CTA.label}
            href={CALENDLY.introCall}
            kind="calendly"
            size="sm"
          />
        </nav>
      </Container>
    </header>
  );
}
