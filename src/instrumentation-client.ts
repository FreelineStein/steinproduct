/*
  PostHog, client side only.

  Next.js runs this file once in the browser after the HTML loads and before
  React hydrates, so analytics is live before the first interaction. Nothing
  here runs on a server: the site is a static export (`output: "export"` in
  next.config.ts), so there is no posthog-node, no server-side flags and no
  Next.js rewrite proxy. Both env vars are NEXT_PUBLIC_ and are inlined into
  the bundle at build time; they must exist wherever `next build` runs (on
  Vercel: Project Settings, Environment Variables, Production and Preview).

  Step 3 of the manual install: the options that shape data and billing are
  stated explicitly, even where they match the default, so nobody has to
  know the SDK's default table to read this file.

  Local and preview traffic is not excluded here on purpose. The `defaults`
  date tags events from localhost with `$internal_or_test_user: true`, and
  the project setting "Filter out internal and test users" hides them from
  insights. They are still ingested and count toward the free allowance; the
  volume is too small to matter for this site.
*/
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

  // The browser now talks to our own subdomain, which PostHog's managed
  // reverse proxy forwards to us.i.posthog.com, so ad blockers that match
  // posthog.com never see the request. The proxy is ingest only: anything
  // that opens the PostHog app (toolbar, links back to the UI) must still
  // point at the real app host, or it would 404 on the proxy.
  ui_host: "https://us.posthog.com",

  // Pins the SDK's behavioural defaults to the set that was current on this
  // date, so a later posthog-js upgrade cannot silently change them. Among
  // other things this date sets: pageviews on history change, rage-click
  // detection, external scripts injected into <head>, the localhost
  // internal-user tag, split storage and a 250 ms persistence debounce.
  defaults: "2026-05-30",

  // Billing switch. Anonymous events cost a fraction of identified ones; a
  // person profile is created only after identify(), alias(), group() or
  // setPersonProperties(). "always" would create a profile for every
  // visitor on their first pageview. Same as the SDK default.
  person_profiles: "identified_only",

  // One $pageview per full load and per pathname change through the
  // History API, which is how the App Router navigates. `true` would miss
  // client-side navigations; `false` means capturing pageviews by hand.
  // Same as what the defaults date resolves to.
  capture_pageview: "history_change",

  // $pageleave on navigation, tab hide and unload, sent with sendBeacon.
  // Feeds bounce rate, time on page and scroll depth in Web Analytics.
  // The default ("if_capture_pageview") resolves to true here.
  capture_pageleave: true,

  // Clicks, form changes and submits with the element chain, so Actions
  // can be defined in the PostHog UI later without a deploy. Can take an
  // object to restrict event types or elements; revisit once Step 5 shows
  // how noisy the hero is. Same as the SDK default.
  autocapture: true,
});
