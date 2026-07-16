import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { RetainerBand } from "@/components/sections/retainer";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <About />
      <RetainerBand />
      <Projects />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
