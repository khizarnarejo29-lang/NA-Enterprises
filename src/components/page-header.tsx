import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd } from "./json-ld";

type Crumb = { href: string; label: string };

/** Title band for inner pages, with visible breadcrumbs and matching BreadcrumbList schema. */
export function PageHeader({ title, intro, crumbs }: { title: string; intro?: string; crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ href: "/", label: "Home" }, ...crumbs];
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap gap-1">
            {trail.map((c, i) => (
              <li key={c.href} className="flex gap-1">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === trail.length - 1 ? (
                  <span aria-current="page">{c.label}</span>
                ) : (
                  <Link className="hover:text-foreground" href={c.href}>
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </section>
  );
}
