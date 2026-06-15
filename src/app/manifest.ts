import type { MetadataRoute } from "next";
import { SITE } from "@/config/links";

// Emit a static web manifest at build time (required under output: "export").
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.wordmark,
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
