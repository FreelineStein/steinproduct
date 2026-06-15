// scripts/generate-assets.mjs
// Rasterizes the brand SVGs into the PNGs the site needs:
//   - src/app/apple-icon.png   (180×180 apple-touch icon)
//   - public/favicon-32.png    (32×32 legacy favicon)
//   - public/icon-512.png      (512×512, used by the web manifest)
//   - src/app/opengraph-image.png (1200×630 social share card)
//
// Run once (or whenever the brand SVGs change):  npm run gen:assets
//
// The chevron icons are pure vector (no fonts needed). The OG card draws the
// wordmark as text; if your environment can't render SVG text, the card still
// renders the chevron + frame — re-run on a machine with system fonts, or
// hand off this step. See README.

import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Brand colors (must match src/app/globals.css tokens).
const TEAL = "#0E6B6B";
const BG = "#FAF8F5";
const INK = "#1A1A1A";
const MUTED = "#6B6560";
const BORDER = "#E4DED5";

const faviconSvg = readFileSync(join(root, "brand", "favicon.svg"));

async function pngFromSvg(svgBuffer, size, outPath) {
  await sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png()
    .toFile(outPath);
  console.log("✓", outPath.replace(root + "/", ""));
}

// --- Icons (chevron square) ---
mkdirSync(join(root, "public"), { recursive: true });
await pngFromSvg(faviconSvg, 180, join(root, "src", "app", "apple-icon.png"));
await pngFromSvg(faviconSvg, 32, join(root, "public", "favicon-32.png"));
await pngFromSvg(faviconSvg, 512, join(root, "public", "icon-512.png"));

// --- Open Graph card (1200×630) ---
const W = 1200;
const H = 630;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" rx="28" fill="none" stroke="${BORDER}" stroke-width="2"/>
  <!-- faint dotted texture in a corner -->
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="${INK}" opacity="0.05"/>
    </pattern>
  </defs>
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" rx="28" fill="url(#dots)"/>
  <!-- chevron mark -->
  <g transform="translate(96, 250)">
    <polyline points="0,0 56,52 0,104" fill="none" stroke="${TEAL}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <!-- wordmark + tagline -->
  <text x="200" y="320" font-family="'Geist','Helvetica Neue',Helvetica,Arial,sans-serif" font-size="84" font-weight="600" letter-spacing="-2" fill="${INK}">Stein Product</text>
  <text x="200" y="385" font-family="'Geist','Helvetica Neue',Helvetica,Arial,sans-serif" font-size="34" font-weight="400" fill="${MUTED}">Principal PM who builds with AI agents.</text>
  <text x="96" y="560" font-family="'Geist Mono','SFMono-Regular',Menlo,monospace" font-size="24" letter-spacing="1" fill="${TEAL}">steinproduct.com</text>
</svg>`;

await sharp(Buffer.from(ogSvg), { density: 144 })
  .png()
  .toFile(join(root, "src", "app", "opengraph-image.png"));
console.log("✓", "src/app/opengraph-image.png");
