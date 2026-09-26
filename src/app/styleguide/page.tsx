import type { Metadata } from "next";
import { Container, Eyebrow, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Aurora, GlassPanel, StepTrack, Tag } from "@/components/first-light";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const GROUNDS = [
  { name: "void", value: "#050C0E", token: "--void", note: "page" },
  { name: "surface-1", value: "#0A1719", token: "--surface-1", note: "cards" },
  { name: "surface-2", value: "#102426", token: "--surface-2", note: "inputs, nested" },
];

const INKS = [
  { name: "ink", value: "#E8FBF6", token: "--ink" },
  { name: "ink-muted", value: "#9CB9B4", token: "--ink-muted" },
  { name: "ink-faint", value: "#7C9894", token: "--ink-faint" },
];

const ACCENTS = [
  { name: "aurora", value: "#34F5C5", token: "--aurora", note: "signature accent, action" },
  { name: "orbit", value: "#5CD6FF", token: "--orbit", note: "cool partner" },
  { name: "sol", value: "#FFD98A", token: "--sol", note: "first light, focus" },
  { name: "dawn", value: "#FF9E6B", token: "--dawn", note: "charts only" },
  { name: "stein-teal", value: "#0E6B6B", token: "--stein-teal", note: "gradient root" },
];

const SAMPLE_STEPS = [
  { title: "Free intro call", detail: "Pick the workflow with the highest payoff.", meta: "30 min" },
  { title: "Built for you", detail: "Async build, live demo, written docs.", meta: "Within a week" },
  { title: "You own everything", detail: "Your accounts, your keys." },
];

const LOGO_FILES = [
  "stein-signature-night.svg",
  "stein-signature-day.svg",
  "stein-wordmark-night.svg",
  "stein-wordmark-day.svg",
  "stein-tile.svg",
  "stein-porthole.svg",
];

function Swatch({
  name,
  value,
  token,
  note,
}: {
  name: string;
  value: string;
  token: string;
  note?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface-1">
      <div className="h-16 w-full" style={{ background: value }} />
      <div className="p-3">
        <p className="text-sm font-medium">{name}</p>
        <p className="signal text-ink-faint">
          {value} · {token}
        </p>
        {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow="DESIGN SYSTEM"
        title="Style guide"
        intro="First Light, the Night theme: atmosphere grounds, glass floating above them, one glowing object in front. Source of truth is brand/first-light/BRAND-BOOK.md. This page is for reference and is not indexed."
      />

      {/* Color */}
      <section className="mt-12">
        <Eyebrow>COLOR</Eyebrow>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Grounds step up in light. Text holds 4.5:1 on every ground. Aurora is
          the action color and labels it with on-action, never white.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {GROUNDS.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
          {INKS.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {ACCENTS.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </section>

      {/* Gradients and glow */}
      <section className="mt-16">
        <Eyebrow>GRADIENTS AND GLOW</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-line bg-surface-1 p-4">
            <div className="h-10 rounded-sm" style={{ background: "var(--grad-horizon)" }} />
            <p className="signal mt-3 text-ink-faint">grad-horizon</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Teal to mint to gold, always left to right. Rim strokes and the Highlight word.
            </p>
          </div>
          <div className="rounded-md border border-line bg-surface-1 p-4">
            <div className="h-10 rounded-sm" style={{ background: "var(--grad-atmosphere)" }} />
            <p className="signal mt-3 text-ink-faint">grad-atmosphere</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Planet glow rising from below. Ground for heroes, bands and the footer.
            </p>
          </div>
          <div className="rounded-md border border-line bg-surface-1 p-4">
            <div className="h-10 rounded-sm" style={{ background: "var(--grad-rim)" }} />
            <p className="signal mt-3 text-ink-faint">grad-rim</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The luminous edge of a featured panel. One rim-lit object per view.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-8 rounded-md border border-line bg-surface-1 p-8">
          <div className="size-16 rounded-md bg-surface-2 shadow-glow-sm" title="glow-sm" />
          <div className="size-16 rounded-md bg-surface-2 shadow-glow-md" title="glow-md" />
          <div className="size-16 rounded-md bg-surface-2 shadow-glow-rim" title="glow-rim" />
          <div className="size-16 rounded-md bg-surface-2 shadow-lift" title="lift" />
          <p className="signal text-ink-faint">glow-sm · glow-md · glow-rim · lift</p>
        </div>
      </section>

      {/* Type */}
      <section className="mt-16">
        <Eyebrow>TYPOGRAPHY</Eyebrow>
        <div className="mt-6 space-y-6">
          <div>
            <p className="eyebrow">EYEBROW · ARCHIVO EXPANDED SEMIBOLD · 0.14EM</p>
            <p className="signal mt-2 text-ink-faint">
              signal · 30 min · $1,500 flat · 01 02 03
            </p>
          </div>
          <p className="signal text-ink-faint">
            Anybody Semi-Condensed ExtraBold for display-xl, display-l and headline; Bold for title.
          </p>
          <h1 className="display-xl text-balance">
            Busy work, <span className="highlight">automated.</span>
          </h1>
          <h2 className="display-l">Live within a week.</h2>
          <h2 className="headline">Three steps, and you own the result.</h2>
          <h3 className="title">Custom automation</h3>
          <p className="lead max-w-2xl">
            Lead paragraph in Instrument Sans at ink-muted: Stein Product puts AI
            to work on the workflows costing you the most.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
            Body copy in Instrument Sans. Fixed scope, never hourly. You own the
            data and the system. Keep lines to 60 to 72 characters.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Small supporting text, used for descriptions and asides.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section className="mt-16">
        <Eyebrow>BUTTONS</Eyebrow>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          One primary per view. Secondary is glass with a findable edge. Ghost
          is for low-stakes inline links.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button size="lg">Book a free intro call</Button>
          <Button variant="secondary" size="lg">
            See how it works
          </Button>
          <Button variant="ghost" size="lg">
            Ghost
          </Button>
          <Button>Default size</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Tags */}
      <section className="mt-16">
        <Eyebrow>TAGS</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Tag tone="aurora" live>
            Taking clients
          </Tag>
          <Tag tone="sol">Live within a week</Tag>
          <Tag>Fixed scope</Tag>
          <Tag dot>Client work</Tag>
          <Tag tone="danger" dot>
            Link missing
          </Tag>
        </div>
      </section>

      {/* Panels */}
      <section className="mt-16">
        <Eyebrow>GLASS PANELS</Eyebrow>
        <div className="sp-atmosphere mt-6 grid gap-6 rounded-lg border border-line p-6 sm:grid-cols-3 sm:p-8">
          <GlassPanel className="p-6">
            <h3 className="sp-panel-title">Glass panel</h3>
            <p className="sp-panel-body mt-3 text-sm">
              Glass fill, hairline, top catch-light, backdrop blur.
            </p>
            <div className="sp-panel-footer">
              <span>Scoped per engagement</span>
            </div>
          </GlassPanel>
          <GlassPanel featured className="p-6">
            <h3 className="sp-panel-title">Featured</h3>
            <p className="sp-panel-body mt-3 text-sm">
              The recommended option: a rotating horizon rim. One per group.
            </p>
            <div className="sp-panel-footer">
              <span>$1,500 flat</span>
              <span>Within a week</span>
            </div>
          </GlassPanel>
          <GlassPanel solid className="p-6">
            <h3 className="sp-panel-title">Solid</h3>
            <p className="sp-panel-body mt-3 text-sm">
              Surface-1 and a hairline, no glow. Proof, about and FAQ.
            </p>
          </GlassPanel>
        </div>
      </section>

      {/* StepTrack */}
      <section className="mt-16">
        <Eyebrow>STEP TRACK</Eyebrow>
        <div className="mt-6 rounded-lg border border-line bg-surface-1 p-6 sm:p-8">
          <StepTrack steps={SAMPLE_STEPS} active={1} />
        </div>
      </section>

      {/* Aurora */}
      <section className="mt-16">
        <Eyebrow>AURORA</Eyebrow>
        <Aurora className="mt-6 border border-line" contentClassName="px-6 pt-14 pb-24 sm:px-12">
          <Tag tone="aurora" live>
            Taking clients
          </Tag>
          <h2 className="display-l mt-5 max-w-xl text-balance">
            Your busy work, <span className="highlight">automated.</span>
          </h2>
          <p className="lead mt-4 max-w-lg">
            Atmosphere gradient, star grid, three drifting blooms and the planet
            limb. Twice per page at most: the hero and the closing CTA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">Book a free intro call</Button>
            <Button variant="secondary" size="lg">
              See how it works
            </Button>
          </div>
        </Aurora>
      </section>

      {/* Logo */}
      <section className="mt-16">
        <Eyebrow>LOGO</Eyebrow>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Outlined Anybody Condensed ExtraBold on an orbital sunrise: a thin
          symmetric limb brightest at its crest, a soft atmosphere inside it,
          and the sun half risen with a lens flare. Dark first; there is no
          flat or one-color version. Never retype, recolor, move the sun or
          stretch the arc.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-3 overflow-hidden rounded-lg border border-line bg-surface-1 p-6 sm:p-10">
            <p className="signal text-ink-faint">Signature: the main event</p>
            <Logo variant="signature" className="h-16 sm:h-24" />
            <p className="signal text-ink-faint">Signature at the 48px minimum</p>
            <Logo variant="signature" className="h-12" />
          </div>
          <div className="flex flex-col items-start gap-3 overflow-hidden rounded-lg border border-line bg-surface-1 p-6 sm:p-10">
            <p className="signal text-ink-faint">Wordmark: the everyday logo</p>
            <Logo className="h-8" />
            <Logo className="h-6" />
            <p className="signal text-ink-faint">Wordmark at the 20px minimum</p>
            <Logo className="h-5" />
          </div>
          <div className="flex items-center justify-center gap-6 rounded-lg border border-line bg-surface-1 p-6 sm:gap-10 sm:p-10">
            <Logo variant="tile" className="size-16" />
            <Logo variant="tile" className="size-8" />
            <Logo variant="porthole" className="size-16" />
            <Logo variant="porthole" className="size-8" />
          </div>
          <div className="sp-atmosphere flex items-center justify-center rounded-lg border border-line p-6 sm:p-10">
            <Logo variant="signature" className="h-16" />
          </div>
        </div>
        <ul className="mt-6 grid gap-1 sm:grid-cols-3">
          {LOGO_FILES.map((file) => (
            <li key={file} className="signal text-ink-faint">
              brand/first-light/logos/{file}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
