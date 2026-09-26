import { useId } from "react";
import { cn } from "@/lib/utils";
import { LOCKUP, MARK } from "@/components/logo-paths";

/**
 * The Stein Product wordmark with First Light as the dot of the i, or First
 * Light alone as the mark. Drawn inline from the paths in
 * brand/first-light/logos (see logo-paths.ts) so it scales crisply and the
 * letterforms take the current text color. The wordmark is outlined Anybody
 * Expanded ExtraBold; it is never live text. Never recolor the gradient, move
 * the sun off the i, rotate the limb, or add effects beyond the sun's glow.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  /** Sets the height (the SVG fills it). Default 24px, 28px from md up. */
  className?: string;
  /** Hide the name and render the First Light mark alone (e.g. tight mobile nav). */
  showWordmark?: boolean;
}) {
  // Two logos on a page (nav and footer) need distinct gradient ids.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const horizonId = `fl-horizon-${uid}`;
  const streakId = `fl-streak-${uid}`;
  const art = showWordmark ? LOCKUP : MARK;

  return (
    <span
      role="img"
      aria-label="Stein Product"
      className={cn(
        "sp-logo text-foreground",
        showWordmark ? "h-6 md:h-7" : "size-8",
        className,
      )}
    >
      <svg
        viewBox={art.viewBox}
        aria-hidden="true"
        focusable="false"
        className="h-full w-auto"
      >
        <defs>
          <linearGradient
            id={horizonId}
            gradientUnits="userSpaceOnUse"
            x1={art.gradient.x1}
            y1="0"
            x2={art.gradient.x2}
            y2="0"
          >
            <stop offset="0" stopColor="#0E6B6B" />
            <stop offset=".62" stopColor="#34F5C5" />
            <stop offset="1" stopColor="#FFD98A" />
          </linearGradient>
          <linearGradient id={streakId}>
            <stop offset="0" stopColor="#FFD98A" stopOpacity="0" />
            <stop offset=".5" stopColor="#FFF4D6" />
            <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {showWordmark ? (
          <>
            {LOCKUP.letters.map((d, i) => (
              <path key={i} d={d} fill="currentColor" />
            ))}
            <FirstLight art={LOCKUP} horizonId={horizonId} streakId={streakId} />
          </>
        ) : (
          <g transform={`translate(${MARK.translate})`}>
            <FirstLight art={MARK} horizonId={horizonId} streakId={streakId} />
          </g>
        )}
      </svg>
    </span>
  );
}

/** The mark itself: planet limb, lens streak, and the sun. */
function FirstLight({
  art,
  horizonId,
  streakId,
}: {
  art: typeof LOCKUP | typeof MARK;
  horizonId: string;
  streakId: string;
}) {
  return (
    <>
      <path
        d={art.limb.d}
        fill="none"
        stroke={`url(#${horizonId})`}
        strokeWidth={art.limb.strokeWidth}
        strokeLinecap="round"
      />
      <rect
        x={art.streak.x}
        y={art.streak.y}
        width={art.streak.width}
        height={art.streak.height}
        rx={art.streak.rx}
        fill={`url(#${streakId})`}
      />
      <circle
        className="sp-logo-sun"
        cx={art.sun.cx}
        cy={art.sun.cy}
        r={art.sun.r}
      />
    </>
  );
}
