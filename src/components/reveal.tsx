"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle, tasteful scroll-in: a small fade + upward translate the first time an
 * element enters the viewport. One variant only — no parallax, no bouncing.
 *
 * Graceful degradation: the `.reveal` element is fully visible by default. Only
 * when JS is active (the <html> gets a `js` class in the root layout) does CSS
 * hide it initially and animate it in. So with JS disabled the content is never
 * blank. prefers-reduced-motion is honored in CSS (see globals.css).
 */
export function Reveal({
  children,
  className,
  /** Stagger delay in ms for sequenced reveals. */
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref typing across the polymorphic tag union
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", shown && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
