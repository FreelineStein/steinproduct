import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/section";
import { SITE, SOCIAL, MAILTO } from "@/config/links";

/** Atmosphere ground, the wordmark at 24px, contact links. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="sp-atmosphere mt-24 border-t border-line">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link
            href="/"
            aria-label="Stein Product, home"
            className="inline-block rounded-sm"
          >
            <Logo className="h-6" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}
          </p>
          {SOCIAL.substack ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Jacob writes about AI and product on{" "}
              <a
                href={SOCIAL.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-foreground underline decoration-input underline-offset-4 transition-colors hover:text-aurora hover:decoration-aurora"
              >
                Substack
              </a>
              .
            </p>
          ) : null}
          <p className="signal mt-6 text-ink-faint">
            Built and run by Jacob Stein. {SITE.location}.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <span className="eyebrow col-span-2 text-ink-faint">
            Get in touch
          </span>
          <a
            href={MAILTO}
            className="rounded-sm text-foreground transition-colors hover:text-aurora"
          >
            {SITE.email}
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-foreground transition-colors hover:text-aurora"
          >
            LinkedIn
          </a>
        </nav>
      </Container>

      <Container className="border-t border-line py-6">
        <p className="text-xs text-muted-foreground">
          © {year} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}
