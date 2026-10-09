import Link from "next/link";
import { legalNav, mainNav, services, siteConfig } from "@/content/site";
import { CurrentYear } from "./current-year";
import { PlaceholderBadge } from "./placeholder";
import { ContactIcon, contactRows } from "./sections";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-bold">
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-xs font-extrabold text-brand-foreground">
              NA
            </span>
            {siteConfig.name}
          </p>
          <p className="mt-3 text-sm text-muted">{siteConfig.tagline}</p>
          <Link
            href="/contact/"
            className="mt-5 inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand-strong"
          >
            Request a quote
          </Link>
        </div>
        <FooterList title="Company" links={mainNav} />
        <FooterList
          title="Services"
          links={services.map((s) => ({ href: `/services/${s.slug}/`, label: s.title }))}
        />
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-2 text-sm text-muted">
            {contactRows()
              .filter((r) => r.kind !== "hours")
              .map((r) => (
                <li key={r.label} className="flex min-h-11 items-center gap-2.5">
                  <ContactIcon kind={r.kind} />
                  <span className="sr-only">{r.label}: </span>
                  {r.value ? (
                    r.href ? (
                      <a
                        href={r.href}
                        aria-label={r.linkLabel}
                        className={`hover:text-foreground hover:underline ${
                          r.kind === "phone" ? "whitespace-nowrap" : "[overflow-wrap:anywhere]"
                        }`}
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span>{r.value}</span>
                    )
                  ) : (
                    <span className="inline-flex items-center gap-2 text-placeholder-text">
                      {r.label}: <PlaceholderBadge />
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © <CurrentYear buildYear={new Date().getFullYear()} /> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-foreground" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="hover:text-foreground" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
