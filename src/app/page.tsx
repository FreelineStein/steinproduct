import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Highlights } from "@/components/sections/highlights";
import { Work } from "@/components/sections/work";
import { CtaBand } from "@/components/sections/cta-band";

/** Home: who, how strong, what he built, in two scrolls. Depth lives on /journey, /work and /builds. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Work featured />
      <CtaBand />
    </>
  );
}
