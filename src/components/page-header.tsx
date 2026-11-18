import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd } from "./json-ld";

type Crumb = { href: string; label: string };

/** Title band for inner pages, with visible breadcrumbs and matching BreadcrumbList schema. */
export function PageHeader({ title, intro, crumbs, children }: { title: string; intro?: string; crumbs: Crumb[]; children?: React.ReactNode }) {
  const trail: Crumb[] = [{ href: "/", label: "Home" }, ...crumbs];
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="orb -z-10 -top-48 left-1/4 h-[28rem] w-[28rem] bg-[#6d5dfc]" />
      <div className="orb -z-10 -top-32 right-0 h-[22rem] w-[22rem] bg-[#0891b2]" style={{ animationDelay: "-5s" }} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24" data-reveal>
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
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{intro}</p>}
        {children}
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
