/*
  The one door every custom event walks through.

  Components never import posthog-js directly. They call track(), and the
  Events map below is the contract: an event name that is not a key here, or
  a property set that does not match, is a compile error rather than a new
  misspelled event in PostHog. posthog-js is a singleton, so this is the same
  instance that src/instrumentation-client.ts initialised.

  This file needs no use client directive. The directive marks a component
  boundary; a plain module is pulled into the client bundle by whichever
  client component imports it (today, cta-button.tsx).

  Naming rules: event names are object_verb in past tense, properties are
  snake_case with a short closed set of values, and nothing here is personal
  data. Names starting with $ are reserved by PostHog.
*/
import posthog from "posthog-js";

/** Where on the page the button sits. Add a value here before using it. */
export type CtaLocation = "nav" | "hero" | "services" | "retainer" | "cta_band";

/**
 * What the button opens. A category, never the URL: a URL is high cardinality
 * and a mailto would put an email address in every event.
 */
export type CtaDestination = "calendly" | "stripe" | "email" | "external";

type Events = {
  cta_clicked: {
    cta_location: CtaLocation;
    destination: CtaDestination;
    /** The visible button text, so a copy change reads as a property shift. */
    cta_label: string;
    /** The ServiceBucket or Retainer id from src/content/services.ts, where relevant. */
    service_bucket?: string;
  };
};

export function track<E extends keyof Events>(event: E, properties: Events[E]): void {
  posthog.capture(event, properties);
}
