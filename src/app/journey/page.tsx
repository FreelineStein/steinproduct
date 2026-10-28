import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { Journey } from "@/components/sections/journey";
import { Capabilities } from "@/components/sections/capabilities";
import { CtaBand } from "@/components/sections/cta-band";
import { journeyHeader } from "@/content/journey";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Jacob Stein's career in order: Boeing avionics, Maxar satellites, Tipico and LeoVegas sportsbooks, then independent. What each stop taught him and what he brings to a team.",
  alternates: { canonical: "/journey" },
};

/** The résumé page: the full timeline, then capabilities. */
export default function JourneyPage() {
  return (
    <>
      <PageHeader eyebrow={journeyHeader.eyebrow} title={journeyHeader.title} intro={journeyHeader.intro} />
      <Journey />
      <Capabilities />
      <CtaBand />
    </>
  );
}
