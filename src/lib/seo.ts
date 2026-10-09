import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Absolute URL for a site path, always with a trailing slash to match `trailingSlash: true`. */
export function absoluteUrl(path = "/") {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return new URL(normalized, siteConfig.url).toString();
}

/** Per-page metadata with a canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  return {
    title: title ?? { absolute: siteConfig.name },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
