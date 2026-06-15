import type { MetadataRoute } from "next";
import { SITE } from "@/config/links";

// Emit a static sitemap.xml at build time (required under output: "export").
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
