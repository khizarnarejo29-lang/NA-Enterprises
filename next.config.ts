import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site in `out/` that any static host can serve.
  output: "export",
  // `/about` is emitted as `/about/index.html`, which every static host resolves.
  trailingSlash: true,
  // The default image optimizer needs a server; static export serves images as-is.
  images: { unoptimized: true },
  // Cache Components is left off: it targets server rendering, and its rules
  // reject the `force-static` config that sitemap.ts / robots.ts need for export.
  // Tailwind CSS runs through postcss.config.mjs; no custom CSS loader is configured here.
};

export default nextConfig;
