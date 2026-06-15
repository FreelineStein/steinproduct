import { cn } from "@/lib/utils";

/** Centered content column — the consistent max width across the site. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
      {children}
    </div>
  );
}

/** Monospace eyebrow with a small teal tick — the "I build things" signal. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", className)}>
      <span aria-hidden="true" className="text-primary">
        ›
      </span>
      <span>{children}</span>
    </p>
  );
}

/** Eyebrow + heading + optional intro, used at the top of most sections. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
