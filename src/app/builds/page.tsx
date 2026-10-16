import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { Work } from "@/components/sections/work";
import { CtaBand } from "@/components/sections/cta-band";
import { buildsHeader } from "@/content/work";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Everything Jacob Stein has built: Pick Receipts, the Ambient home monitor, a weekly lead and job scout agent, a personal command center, a Discord second brain, document automation for a Habitat for Humanity chapter, and the sites themselves.",
  alternates: { canonical: "/builds" },
};

/** The full builds grid. Case-study pages can hang under /builds/[slug] later. */
export default function BuildsPage() {
  return (
    <>
      <PageHeader eyebrow={buildsHeader.eyebrow} title={buildsHeader.title} intro={buildsHeader.intro} />
      <Work />
      <CtaBand />
    </>
  );
}
