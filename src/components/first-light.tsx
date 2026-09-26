import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/*
  First Light building blocks, ported from the brand pack's reference
  implementation (brand/first-light/reference). The styles live in
  globals.css under the `.sp-*` classes; these components only compose the
  markup so every section and the style guide render the same thing.
*/

/**
 * Animated ground for the hero and the closing call to action: an atmosphere
 * gradient, a faint star grid, three drifting blooms and the planet limb
 * glowing along the bottom. Pure CSS; every loop stops under reduced motion.
 * Use at most twice per page and never stack two.
 */
export function Aurora({
  children,
  flat = false,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  /** Square corners for full-bleed use (the hero). */
  flat?: boolean;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className={cn("sp-aurora", flat && "sp-aurora-flat", className)}>
      <div aria-hidden="true" className="sp-aurora-stars" />
      <div aria-hidden="true" className="sp-aurora-orb a" />
      <div aria-hidden="true" className="sp-aurora-orb b" />
      <div aria-hidden="true" className="sp-aurora-orb c" />
      <div aria-hidden="true" className="sp-aurora-limb" />
      <div className={cn("sp-aurora-content", contentClassName)}>{children}</div>
    </div>
  );
}

/**
 * The brand's card: a frosted, rim-lit panel. `featured` adds the rotating
 * horizon rim (one per group); `interactive` lifts and glows on hover;
 * `solid` is the quiet version (surface-1 and a hairline, no glass, no glow)
 * for proof, about and FAQ content.
 */
export function GlassPanel({
  as: Tag = "div",
  featured = false,
  interactive = false,
  solid = false,
  className,
  children,
}: {
  as?: "div" | "article" | "li" | "section";
  featured?: boolean;
  interactive?: boolean;
  solid?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "sp-panel",
        featured && "sp-panel-featured",
        interactive && "sp-panel-interactive",
        solid && "sp-panel-solid",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Signal-face status or category label in a glass pill. */
export function Tag({
  tone = "neutral",
  dot = false,
  live = false,
  className,
  children,
}: {
  tone?: "neutral" | "aurora" | "sol" | "danger";
  /** Static status dot. */
  dot?: boolean;
  /** Pulsing dot for something happening now. */
  live?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "sp-tag",
        tone !== "neutral" && `sp-tag-${tone}`,
        live && "sp-tag-live",
        className,
      )}
    >
      {dot || live ? <span aria-hidden="true" className="sp-tag-dot" /> : null}
      {children}
    </span>
  );
}

export interface StepTrackStep {
  title: string;
  detail?: string;
  /** Time or cost, set in the signal face ("30 min", "Within a week"). */
  meta?: string;
}

/**
 * A numbered process on an orbital line with a beam of light traveling along
 * it. Done steps glow aurora; the active step holds the sol sun. Stacks
 * vertically under 640px.
 */
export function StepTrack({
  steps,
  active = 0,
  beam = true,
  className,
}: {
  steps: readonly StepTrackStep[];
  /** Index of the current step. Steps before it read as done. */
  active?: number;
  /** Set false to turn off the traveling light. */
  beam?: boolean;
  className?: string;
}) {
  return (
    <ol
      className={cn("sp-steps", className)}
      style={{ "--sp-steps": steps.length } as CSSProperties}
    >
      {beam ? <span aria-hidden="true" className="sp-steps-beam" /> : null}
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "sp-step",
            i < active && "sp-step-done",
            i === active && "sp-step-active",
          )}
        >
          <span aria-hidden="true" className="sp-step-node" />
          <span className="sp-step-num">
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {step.meta ? <span className="ml-3">{step.meta}</span> : null}
          </span>
          <h3 className="sp-step-title">{step.title}</h3>
          {step.detail ? <p className="sp-step-detail">{step.detail}</p> : null}
        </li>
      ))}
    </ol>
  );
}
