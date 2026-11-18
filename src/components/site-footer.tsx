import Link from "next/link";
import { legalNav, mainNav, services, siteConfig } from "@/content/site";
import { CurrentYear } from "./current-year";
import { PlaceholderBadge } from "./placeholder";
import { ContactIcon, contactRows } from "./sections";

export function SiteFooter() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden border-t border-border bg-surface">
      <div className="orb -z-10 -bottom-40 left-1/3 h-[26rem] w-[26rem] bg-[#6d5dfc] !opacity-20" />
      <div aria-hidden="true" className="pointer-events-none overflow-hidden pt-14 select-none">
        <p data-scroll="slide" className="text-outline text-[16vw] leading-none font-black whitespace-nowrap">
          NA ENTERPRISES · DIGITAL ·
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-bold">
            <span aria-hidden="true" className="bg-gradient-brand flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black text-white">
              NA
            </span>
            {siteConfig.name}
          </p>
          <p className="mt-3 text-sm text-muted">{siteConfig.tagline}</p>
          <Link href="/contact/" className="btn-primary mt-6 !h-10 !px-5 text-sm">
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
