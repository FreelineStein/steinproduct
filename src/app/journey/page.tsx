import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { Worlds } from "@/components/sections/worlds";
import { Journey } from "@/components/sections/journey";
import { Capabilities } from "@/components/sections/capabilities";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";
import { journeyHeader } from "@/content/journey";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Jacob Stein's career in order: Boise State, Boeing avionics, University of Washington, Maxar satellites, Tipico and LeoVegas sportsbooks, then independent. What each stop taught him and what he brings to a team.",
  alternates: { canonical: "/journey" },
};

/** The résumé page: the two worlds, the full timeline, capabilities, and a client's words. */
export default function JourneyPage() {
  return (
    <>
      <PageHeader eyebrow={journeyHeader.eyebrow} title={journeyHeader.title} intro={journeyHeader.intro} />
      <Worlds />
      <Journey />
      <Capabilities />
      <Testimonials />
      <CtaBand />
    </>
  );
}
