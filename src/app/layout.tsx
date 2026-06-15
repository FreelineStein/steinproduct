import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/config/links";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Jacob Stein is a Principal-level product manager who helps businesses get organized and adopt modern AI solutions. We start with the workflow that's costing you the most and turn it into something that actually runs, often in a single session.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Stein Product — Principal PM who helps businesses get organized and adopt modern AI tools",
    template: "%s · Stein Product",
  },
  description,
  applicationName: SITE.name,
  authors: [{ name: "Jacob Stein" }],
  creator: "Jacob Stein",
  keywords: [
    "AI automation",
    "product consulting",
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
    title: "Stein Product — Principal PM who helps businesses get organized and adopt modern AI tools",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stein Product — Principal PM who helps businesses get organized and adopt modern AI tools",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
