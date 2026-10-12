"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductLink } from "@/config/links";
import { track, type CtaLocation, type CtaDestination } from "@/lib/analytics";

type LinkKind = ProductLink["kind"];

/**
 * A call-to-action that links out to a hosted destination (Calendly, a Stripe
 * Payment Link, email, etc.). When the destination is still `null` (not wired
 * yet in src/config/links.ts), it renders a disabled button so the layout stays
 * complete and it's obvious the link is pending; Jacob just pastes the URL.
 *
 * The site never processes payments; these are outbound links only.
 *
 * Every live button fires one `cta_clicked` event through src/lib/analytics.ts.
 * That onClick is why this file is a client component: it is the only leaf
 * that needs an event handler, so the sections that render it stay server
 * components and the client bundle grows by this file alone.
 */
export function CTAButton({
  label,
  href,
  kind = "external",
  variant = "default",
  size = "default",
  className,
  ctaLocation,
  bucket,
}: {
  label: string;
  href: string | null;
  kind?: LinkKind;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  /** Where on the page this button sits, for the cta_clicked event. */
  ctaLocation: CtaLocation;
  /** The service or retainer id from src/content/services.ts, where relevant. */
  bucket?: string;
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
        <span className="sr-only"> (link coming soon)</span>
      </Button>
    );
  }

  // mailto / tel stay in the same tab; hosted booking/checkout open in a new tab
  // so the visitor doesn't lose the site.
  const isInPage = kind === "email" || href.startsWith("mailto:") || href.startsWith("#");
  const newTab = !isInPage;

  // The event carries a category, not the URL. "stripe-payment-link" is a
  // mouthful in a breakdown; the other kinds map one to one.
  const destination: CtaDestination = kind === "stripe-payment-link" ? "stripe" : kind;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        {...(newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onClick={() =>
          track("cta_clicked", {
            cta_location: ctaLocation,
            destination,
            cta_label: label,
            ...(bucket ? { service_bucket: bucket } : {}),
          })
        }
      >
        {label}
      </a>
    </Button>
  );
}

/** Shared CTA sizing for hero and closing-CTA actions (the brand's `lg` button). */
export const ctaLg = cn("h-12 px-7 text-base");
