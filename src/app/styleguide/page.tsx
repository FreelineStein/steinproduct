import type { Metadata } from "next";
import { Container, Eyebrow, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { name: "background", value: "#FAF8F5", token: "--background" },
  { name: "foreground", value: "#1A1A1A", token: "--foreground" },
  { name: "primary (teal)", value: "#0E6B6B", token: "--primary" },
  { name: "primary hover", value: "#0A5757", token: "--primary-hover" },
  { name: "muted text", value: "#6B6560", token: "--muted-foreground" },
  { name: "border", value: "#E4DED5", token: "--border" },
];

export default function StyleguidePage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow="DESIGN SYSTEM"
        title="Style guide"
        intro="The warm-technical token system — one accent, mono accents, consistent spacing. This page is for reference and is not indexed."
      />

      {/* Color */}
      <section className="mt-12">
        <Eyebrow>COLOR</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SWATCHES.map((s) => (
            <div
              key={s.token}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="h-20 w-full" style={{ background: s.value }} />
              <div className="p-3">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {s.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Type */}
      <section className="mt-16">
        <Eyebrow>TYPOGRAPHY</Eyebrow>
        <div className="mt-6 space-y-4">
          <p className="eyebrow">MONO EYEBROW · METADATA</p>
          <h1 className="font-sans text-5xl font-semibold tracking-[-0.03em]">
            Display heading
          </h1>
          <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em]">
            Section heading
          </h2>
          <h3 className="font-sans text-xl font-semibold">Subsection heading</h3>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
            Body copy in the humanist sans. The quick brown fox jumps over the
            lazy dog — generous line height, comfortable measure, AA contrast on
            the warm off-white background.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Muted supporting text, used for descriptions and asides.
          </p>
          <p className="font-mono text-sm">
            const mono = &quot;for code, prices, and labels&quot;;
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section className="mt-16">
        <Eyebrow>BUTTONS</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button className="h-11 px-6 text-[0.95rem]">Primary</Button>
          <Button variant="outline" className="h-11 px-6 text-[0.95rem]">
            Outline
          </Button>
          <Button variant="secondary" className="h-11 px-6 text-[0.95rem]">
            Secondary
          </Button>
          <Button variant="ghost" className="h-11 px-6 text-[0.95rem]">
            Ghost
          </Button>
          <Button variant="link">Link</Button>
          <Button disabled className="h-11 px-6 text-[0.95rem]">
            Disabled
          </Button>
        </div>
      </section>

      {/* Card + Logo */}
      <section className="mt-16">
        <Eyebrow>COMPONENTS</Eyebrow>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card className="rounded-2xl border border-border bg-card shadow-sm ring-0 [--card-spacing:--spacing(6)]">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>
                A rounded-2xl card with a hairline border and a very subtle
                shadow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards hold the service ladder, testimonials, and project tiles.
              </p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-10">
            <Logo className="text-2xl" />
          </div>
        </div>
      </section>
    </Container>
  );
}
