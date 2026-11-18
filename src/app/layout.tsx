import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { internationalPhone } from "@/lib/contact";
import { MotionObserver } from "@/components/motion-observer";
import { siteConfig } from "@/content/site";
import "./globals.css";
import "./demos.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contact } = siteConfig;
  return (
    <html
      lang={siteConfig.locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The inline script adds the "js" class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Marks that JavaScript runs, so scroll-reveal styles only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
        >
          Skip to content
        </a>
        {siteConfig.preview && (
          <aside aria-label="Preview notice" className="border-b-2 border-dashed border-placeholder-border bg-placeholder-bg px-4 py-2 text-center text-sm text-placeholder-text">
            <strong>Preview:</strong> business details on this site are placeholders awaiting confirmation by{" "}
            {siteConfig.name}. Items marked &ldquo;Placeholder&rdquo; are not real information.
          </aside>
        )}
        <div className="scroll-progress" aria-hidden="true" />
        <SiteHeader />
        <main id="main" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
        <MotionObserver />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            ...(contact.email ? { email: contact.email } : {}),
            ...(contact.phone ? { telephone: internationalPhone(contact.phone) } : {}),
            ...(contact.address ? { address: contact.address } : {}),
          }}
        />
      </body>
    </html>
  );
}
