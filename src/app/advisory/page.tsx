import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { Services } from "@/components/sections/services";
import { Results } from "@/components/sections/results";
import { CtaBand } from "@/components/sections/cta-band";
import { advisoryClosingCta, advisoryHeader } from "@/content/advisory";
import { MAILTO } from "@/config/links";

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Product consulting from Jacob Stein: roadmap and KPI resets, experimentation and A/B testing, product analytics, zero-to-one product development, workflow streamlining and PM coaching.",
  alternates: { canonical: "/advisory" },
};

/** The hire-me page: product consulting, what it covers and the results behind it. */
export default function AdvisoryPage() {
  return (
    <>
      <PageHeader
        eyebrow={advisoryHeader.eyebrow}
        title={advisoryHeader.title}
        intro={advisoryHeader.intro}
        cta={{ label: advisoryHeader.ctaLabel, href: MAILTO, kind: "email", ctaLocation: "advisory" }}
      />
      <Services />
      <Results />
      <CtaBand {...advisoryClosingCta} />
    </>
  );
}
