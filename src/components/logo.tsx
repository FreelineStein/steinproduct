import { useId } from "react";
import { cn } from "@/lib/utils";
import { LOGOS, type LogoVariant } from "@/components/logo-paths";

/**
 * The Stein Product logo system, drawn inline from the files in
 * brand/first-light/logos (see logo-paths.ts) so it scales crisply. All of it
 * is built on First Light, a planet's horizon at sunrise seen from orbit:
 *
 * - `signature`: the horizon arcs over the whole name with the sun at center.
 *   For the closing band and anywhere the logo is the main event. Min 48px.
 * - `wordmark` (default): the everyday logo. The i is dotless; the horizon
 *   spans "ein" with the sun directly over the i. Nav, footer, documents.
 * - `tile` and `porthole`: the orbital sunrise alone. Tile for favicons, app
 *   icons and the mobile nav; porthole for avatars.
 *
 * The lettering is outlined Anybody Condensed ExtraBold; it is never live
 * text. Dark first: there is no flat or one-color version. Never recolor the
 * horizon, move the sun, stretch the arc or add effects.
 */
export function Logo({
  variant = "wordmark",
  className,
}: {
  variant?: LogoVariant;
  /** Sets the height (the SVG fills it). Defaults: wordmark 28px, signature 64px, icons 32px. */
  className?: string;
}) {
  // Every instance gets its own id prefix so gradient, mask and clip ids
  // never collide when two logos share a page.
  const prefix = `fl${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const art = LOGOS[variant];
  const square = variant === "tile" || variant === "porthole";

  return (
    <span
      role="img"
      aria-label="Stein Product"
      className={cn(
        "sp-logo text-foreground",
        square ? "size-8" : variant === "signature" ? "h-16" : "h-7",
        className,
      )}
    >
      <svg
        viewBox={art.viewBox}
        aria-hidden="true"
        focusable="false"
        className="h-full w-auto"
        dangerouslySetInnerHTML={{ __html: art.markup.split("__P__").join(prefix) }}
      />
    </span>
  );
}
