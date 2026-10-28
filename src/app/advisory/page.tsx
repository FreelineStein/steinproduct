import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { OfferBand } from "@/components/sections/offer-band";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";
import { CONSULTING, MAILTO } from "@/config/links";
import { workPageHeader, consulting, advisory } from "@/content/consulting";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Two ways to work with Jacob Stein: AI and automation for small businesses and nonprofits through NetGoodLabs, and part-time product advisory for startups and product teams. With a client's own account of the experience.",
  alternates: { canonical: "/work" },
};

/** The hire-me page: the AI and automation practice, product advisory, and a client's words. */
export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow={workPageHeader.eyebrow} title={workPageHeader.title} intro={workPageHeader.intro} />
      <OfferBand
        offer={consulting}
        href={CONSULTING.url}
        kind="external"
        ctaLocation="consulting"
        note={CONSULTING.name}
        featured
      />
      <OfferBand offer={advisory} href={MAILTO} kind="email" ctaLocation="advisory" note="Email is fastest" />
      <Testimonials />
      <CtaBand />
    </>
  );
}
