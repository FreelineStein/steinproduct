import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/config/links";

/*
  First Light type, self-hosted from the brand pack (brand/first-light/fonts).
  Anybody Semi-Condensed sets headlines (one family with the logo lettering,
  at two widths), Instrument Sans carries reading text, and Archivo Expanded
  is the "signal" face for eyebrows, tags, numbers and prices. Anybody
  Condensed (the logo face) is never loaded: the logo is outlined artwork in
  src/components/logo.tsx.
*/
const anybody = localFont({
  src: [
    { path: "./fonts/anybody-semicondensed-latin-700.woff2", weight: "700" },
    { path: "./fonts/anybody-semicondensed-latin-800.woff2", weight: "800" },
  ],
  variable: "--font-anybody",
  display: "swap",
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});

const instrument = localFont({
  src: [
    { path: "./fonts/instrument-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/instrument-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/instrument-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const archivoExpanded = localFont({
  src: [
    { path: "./fonts/archivo-expanded-latin-500.woff2", weight: "500" },
    { path: "./fonts/archivo-expanded-latin-600.woff2", weight: "600" },
  ],
  variable: "--font-archivo-x",
  display: "swap",
  fallback: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
});

const description =
  "Stein Product is a consulting practice led by Jacob Stein, a Principal-level product manager. It gets businesses organized and puts AI to work on the workflows that actually run — starting with the one costing you the most, live within a week.";

const title = "Stein Product — AI automation consulting";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s · Stein Product",
  },
  description,
  applicationName: SITE.name,
  authors: [{ name: "Jacob Stein" }],
  creator: "Jacob Stein",
  // SEO metadata, not rendered copy: "AI agents" stays here for search reach
  // even though "AI assistant" is the only term allowed in user-facing copy.
  keywords: [
    "AI automation",
    "product consulting",
    "AI assistants",
    "AI agents",
    "small business automation",
    "fractional product manager",
    "workflow automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// The site ships in the Night theme only, so the browser chrome matches the
// void ground under either OS color scheme.
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050C0E" },
    { media: "(prefers-color-scheme: dark)", color: "#050C0E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anybody.variable} ${instrument.variable} ${archivoExpanded.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Mark JS as available before paint so scroll-in reveals can hide
            initially without ever blanking content for no-JS visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
