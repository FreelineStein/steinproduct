import type { MetadataRoute } from "next";
import { SITE } from "@/config/links";

// Emit a static sitemap.xml at build time (required under output: "export").
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/journey`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/builds`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
