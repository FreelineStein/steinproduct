import { cn } from "@/lib/utils";

/** Centered content column, the consistent max width across the site. */
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

/** Signal-face eyebrow label in aurora: the instrument-panel voice above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
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
      <h2 className="headline mt-4 text-balance">{title}</h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
