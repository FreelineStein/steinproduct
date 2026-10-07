/*
  PostHog, client side only.

  Next.js runs this file once in the browser after the HTML loads and before
  React hydrates, so analytics is live before the first interaction. Nothing
  here runs on a server: the site is a static export (`output: "export"` in
  next.config.ts), so there is no posthog-node, no server-side flags and no
  Next.js rewrite proxy. Both env vars are NEXT_PUBLIC_ and are inlined into
  the bundle at build time; they must exist wherever `next build` runs.

  Step 1 of the manual install: the smallest init that works. Every option
  that the `defaults` date does not already set is left at its default on
  purpose and will be made explicit in Step 3.
*/
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  // Pins the SDK's behavioural defaults to the set that was current on this
  // date, so a later posthog-js upgrade cannot silently change them.
  defaults: "2026-05-30",
});
