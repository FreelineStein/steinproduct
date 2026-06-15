import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — `next build` emits an `out/` folder of HTML/CSS/JS,
  // deployable to Vercel, Cloudflare Pages, or any static host. No server
  // runtime and no payment backend (Stripe/Calendly are outbound hosted links).
  output: "export",
  // Static export can't use the default on-demand image optimizer. The site is
  // typographic with no raster imagery, so serving assets as-is is fine.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
