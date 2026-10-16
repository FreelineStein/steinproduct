import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Highlights } from "@/components/sections/highlights";
import { CtaBand } from "@/components/sections/cta-band";

/** Home: who and how strong, in one scroll. The builds, the journey and the offers each have their own page. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <CtaBand />
    </>
  );
}
