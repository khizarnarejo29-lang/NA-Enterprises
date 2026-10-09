import type { Metadata } from "next";
import Link from "next/link";
import { mainNav } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-muted">
        The page may have moved, or the address may be mistyped. Try one of these instead:
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex h-11 items-center rounded-md border border-border px-4 font-medium hover:border-brand"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
