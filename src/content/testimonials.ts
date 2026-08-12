// src/content/testimonials.ts
// Client testimonials. The Testimonials section renders gracefully for 0–N
// live entries: if nothing here is live (every entry `pending`), the section
// renders nothing at all — no empty header.
//
// Quotes are verbatim as the client wrote them — never tightened, paraphrased,
// or silently trimmed. Adding one is a data edit here, not a code change.

export interface Testimonial {
  id: string;
  /**
   * The testimonial text, one string per paragraph, without surrounding
   * quotation marks. Single-paragraph quotes are a one-element array.
   */
  quote: string[];
  /** Person's name */
  name: string;
  /** Optional role / title */
  role?: string;
  /** Optional company */
  company?: string;
  /**
   * `true` = placeholder, not shown publicly. Use to stage a quote that isn't
   * cleared for display yet.
   */
  pending?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "habitat-inland-valley-matthew",
    quote: [
      "Jacob was fantastic to work with from start to finish.",
      "He was highly responsive from our very first meeting. I came in with a plan to throw money at an AI-based solution, but Jacob took the time to actually listen to our company's needs and the outcome we were after and proposed a smarter automation approach that skipped the AI complexity and the recurring per use fees altogether.",
      "From there, the process was seamless. He gave me clear follow-up notes and next steps after every conversation, laid out a step-by-step overview of how our engagement would work, and kept the project moving with a solid timeline. He delivered everything he promised, and then some.",
      "Even after launch, he stuck around to make small corrections and dial the program in exactly right and took the time to walk me through the back end so I could make my own tweaks if I ever needed to.",
      "As someone fairly new to this space, I couldn't have asked for a better experience. I'd recommend Jacob without hesitation.",
    ],
    name: "Matthew",
    role: "Home Repair Program",
    company: "Habitat for Humanity Inland Valley",
  },
];

/** Only testimonials cleared for public display. */
export const liveTestimonials = testimonials.filter((t) => !t.pending);
