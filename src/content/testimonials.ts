// src/content/testimonials.ts
// Client testimonials. The Testimonials section renders gracefully for 0–N
// live entries: if nothing here is live (every entry `pending`), the section
// renders nothing at all — no empty header.
//
// To publish the first real testimonial: replace the placeholder's text with
// the real quote/name and set `pending: false` (or remove the flag).

export interface Testimonial {
  id: string;
  /** The testimonial text, without surrounding quotation marks */
  quote: string;
  /** Person's name */
  name: string;
  /** Optional role / title */
  role?: string;
  /** Optional company */
  company?: string;
  /**
   * `true` = placeholder, not shown publicly. The first testimonial is pending,
   * so this seed entry is hidden until a real one lands.
   */
  pending?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Placeholder — the first client testimonial will go here. Set pending to false to publish it.",
    name: "First client",
    role: "Pending",
    pending: true,
  },
];

/** Only testimonials cleared for public display. */
export const liveTestimonials = testimonials.filter((t) => !t.pending);
