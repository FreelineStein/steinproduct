import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Highlights } from "@/components/sections/highlights";
import { Work } from "@/components/sections/work";
import { ConsultingBand } from "@/components/sections/consulting-band";
import { CtaBand } from "@/components/sections/cta-band";

/** Home: who, how strong, what he built, in two scrolls. Depth lives on /journey and /work. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Work featured />
      <ConsultingBand />
      <CtaBand />
    </>
  );
}
