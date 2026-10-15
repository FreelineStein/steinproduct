import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { Work } from "@/components/sections/work";
import { CtaBand } from "@/components/sections/cta-band";
import { workHeader } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "What Jacob Stein has built: Pick Receipts, the Ambient home monitor, document automation for a Habitat for Humanity chapter, NetGoodLabs and steinproduct.com itself.",
  alternates: { canonical: "/work" },
};

/** The full portfolio grid. Case-study pages can hang under /work/[slug] later. */
export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow={workHeader.eyebrow} title={workHeader.title} intro={workHeader.intro} />
      <Work />
      <CtaBand />
    </>
  );
}
