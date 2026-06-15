// Minimal static server that brotli/gzip-compresses text assets, to mirror how
// Vercel/Cloudflare actually serve the export (and clean-URL .html mapping).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { gzipSync, brotliCompressSync } from "node:zlib";

const ROOT = process.argv[2];
const PORT = Number(process.argv[3] || 4322);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".svg", ".json", ".webmanifest", ".txt", ".xml"]);

async function resolve(pathname) {
  let p = join(ROOT, decodeURIComponent(pathname));
  try {
    const s = await stat(p);
    if (s.isDirectory()) p = join(p, "index.html");
    return p;
  } catch {}
  // clean-URL -> .html (what Vercel/Cloudflare do)
  try {
    const html = p.endsWith(".html") ? p : p + ".html";
    await stat(html);
    return html;
  } catch {}
  return join(ROOT, "404.html");
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const file = await resolve(url.pathname === "/" ? "/index.html" : url.pathname);
  let body;
  try {
    body = await readFile(file);
  } catch {
    res.writeHead(404);
    return res.end("Not found");
  }
  const ext = extname(file);
  const headers = { "content-type": TYPES[ext] || "application/octet-stream" };
  const accept = req.headers["accept-encoding"] || "";
  if (COMPRESSIBLE.has(ext)) {
    if (accept.includes("br")) {
      headers["content-encoding"] = "br";
      body = brotliCompressSync(body);
    } else if (accept.includes("gzip")) {
      headers["content-encoding"] = "gzip";
      body = gzipSync(body);
    }
  }
  // long cache for hashed static assets, like a real CDN
  if (url.pathname.startsWith("/_next/static/")) {
    headers["cache-control"] = "public, max-age=31536000, immutable";
  }
  res.writeHead(200, headers);
  res.end(body);
}).listen(PORT, "127.0.0.1", () => console.log(`serving ${ROOT} on :${PORT}`));
