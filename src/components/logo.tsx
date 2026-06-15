import { cn } from "@/lib/utils";

/**
 * The teal "prompt chevron" mark (›) — signals command prompt / AI agent and is
 * the through-line between the logo and the favicon. Rendered as inline SVG so
 * it inherits color and scales crisply. Geometry mirrors brand/logo-wordmark.svg.
 */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 32"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[0.95em] w-auto text-primary", className)}
    >
      <polyline
        points="4,5 16,16 4,27"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Reusable wordmark: teal chevron + "Stein Product" as live Geist text (NOT a
 * flat image), so it stays crisp and inherits the type system. Used in the nav
 * and footer. brand/logo-wordmark.svg is the standalone-image fallback for
 * OG/email only.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  /** Hide the text and render the chevron mark alone (e.g. tight mobile nav). */
  showWordmark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans font-semibold tracking-[-0.015em] text-foreground",
        className,
      )}
    >
      <Chevron />
      {showWordmark && <span>Stein Product</span>}
    </span>
  );
}
