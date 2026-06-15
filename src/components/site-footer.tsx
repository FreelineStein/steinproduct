import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/section";
import { SITE, SOCIAL, MAILTO } from "@/config/links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link
            href="/"
            aria-label="Stein Product — home"
            className="inline-block rounded-sm text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            Built and run by Jacob Stein. {SITE.location}.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <span className="col-span-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Get in touch
          </span>
          <a
            href={MAILTO}
            className="rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {SITE.email}
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            LinkedIn
          </a>
          {/* TODO: Substack — set SOCIAL.substack in src/config/links.ts to show this */}
          {SOCIAL.substack ? (
            <a
              href={SOCIAL.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Substack
            </a>
          ) : null}
        </nav>
      </Container>

      <Container className="border-t border-border/70 py-6">
        <p className="text-xs text-muted-foreground">
          © {year} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}
