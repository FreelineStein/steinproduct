import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductLink } from "@/config/links";

type LinkKind = ProductLink["kind"];

/**
 * A call-to-action that links out to a hosted destination (Calendly, a Stripe
 * Payment Link, email, etc.). When the destination is still `null` (not wired
 * yet in src/config/links.ts), it renders a disabled button so the layout stays
 * complete and it's obvious the link is pending — Jacob just pastes the URL.
 *
 * The site never processes payments; these are outbound links only.
 */
export function CTAButton({
  label,
  href,
  kind = "external",
  variant = "default",
  size = "default",
  className,
}: {
  label: string;
  href: string | null;
  kind?: LinkKind;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}) {
  // Pending link: visible but disabled, so the design reads as finished.
  if (!href) {
    return (
      <Button
        variant={variant}
        size={size}
        disabled
        aria-disabled="true"
        title="Link coming soon"
        className={className}
      >
        {label}
      </Button>
    );
  }

  // mailto / tel stay in the same tab; hosted booking/checkout open in a new tab
  // so the visitor doesn't lose the site.
  const isInPage = kind === "email" || href.startsWith("mailto:") || href.startsWith("#");
  const newTab = !isInPage;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        {...(newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {label}
      </a>
    </Button>
  );
}

/** Shared CTA sizing for hero/section primary actions (the base button is compact). */
export const ctaLg = cn("h-11 px-6 text-[0.95rem]");
