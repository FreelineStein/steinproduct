import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Worlds } from "@/components/sections/worlds";
import { Journey } from "@/components/sections/journey";
import { Work } from "@/components/sections/work";
import { Capabilities } from "@/components/sections/capabilities";
import { Testimonials } from "@/components/sections/testimonials";
import { ConsultingBand } from "@/components/sections/consulting-band";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Worlds />
      <Journey />
      <Work />
      <Capabilities />
      <Testimonials />
      <ConsultingBand />
      <CtaBand />
    </>
  );
}
