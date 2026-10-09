import type { MetadataRoute } from "next";
import { legalNav, mainNav, services, siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

// Required to emit this file with `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.legal.lastUpdated);
  const paths = [
    ...mainNav.map((n) => n.href),
    ...services.map((s) => `/services/${s.slug}/`),
    ...legalNav.map((n) => n.href),
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.5,
  }));
}
