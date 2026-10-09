/**
 * Content sections shared by the home page and inner pages. Each one renders
 * real data from src/content/site.ts when it exists. When it does not, required
 * content shows a clearly labelled placeholder and OPTIONAL content renders
 * nothing (pages check `has*` below to drop the whole section).
 */
import Link from "next/link";
import {
  awards,
  clients,
  company,
  faqs,
  jobs,
  plans,
  projects,
  services,
  siteConfig,
  testimonials,
  type Service,
} from "@/content/site";
import { mailtoHref, telHref } from "@/lib/contact";
import { Placeholder, PlaceholderBadge } from "./placeholder";

const card = "rounded-xl border border-border bg-background p-6";

/** Which OPTIONAL sections have content. Pages hide a section entirely when false. */
export const has = {
  clients: clients.length > 0,
  awards: awards.length > 0,
  testimonials: testimonials.length > 0,
  whyChooseUs: company.whyChooseUs.length > 0,
  plans: plans.length > 0,
  projects: projects.length > 0,
  leadership: company.leadership.length > 0 || company.founderMessage !== "",
};
const arrowLink = "mt-4 inline-flex items-center gap-1 font-semibold text-brand hover:underline";

export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <li className={`${card} flex flex-col`}>
      <span aria-hidden="true" className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface text-brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <H className="text-lg font-semibold">{service.title}</H>
        {service.placeholder && <PlaceholderBadge />}
      </div>
      <p className="mt-2 flex-1 text-muted">{service.summary}</p>
      <Link href={`/services/${service.slug}/`} className={arrowLink}>
        View details<span className="sr-only"> for {service.title}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </li>
  );
}

export function ServicesGrid({ limit }: { limit?: number }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.slice(0, limit).map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </ul>
  );
}

export function ClientsStrip() {
  if (!has.clients) return null;
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {clients.map((c) => (
        <li key={c.name} className="text-lg font-semibold text-muted">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is */}
          {c.logo ? <img src={c.logo} alt={c.name} className="h-10 w-auto" /> : c.name}
        </li>
      ))}
    </ul>
  );
}

export function CompanyFacts() {
  const facts = [
    { label: "Founded", value: company.founded },
    { label: "Based in", value: company.location },
    { label: "Services", value: services.some((s) => s.placeholder) ? "" : String(services.length) },
  ];
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {facts.map((f) => (
        <div key={f.label} className={card}>
          <dt className="text-sm font-semibold text-muted">{f.label}</dt>
          <dd className="mt-1 text-2xl font-bold">
            {f.value || (
              <span className="inline-flex items-center gap-2 text-base font-semibold text-placeholder-text">
                <PlaceholderBadge /> To be confirmed
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CompanyOverview() {
  return company.overview ? (
    <p className="max-w-3xl text-lg leading-8 text-muted">{company.overview}</p>
  ) : (
    <Placeholder title="Company overview">
      Two or three sentences on who NA Enterprises is, when it started, and what it does. Set{" "}
      <code>company.overview</code> in site.ts.
    </Placeholder>
  );
}

export function MissionVision() {
  const items = [
    { title: "Our mission", value: company.mission, key: "company.mission" },
    { title: "Our vision", value: company.vision, key: "company.vision" },
  ];
  return (
    <div className={`grid gap-6 ${company.goals.length ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((i) =>
        i.value ? (
          <div key={i.title} className={card}>
            <h3 className="text-lg font-semibold">{i.title}</h3>
            <p className="mt-2 text-muted">{i.value}</p>
          </div>
        ) : (
          <Placeholder key={i.title} title={i.title}>
            Set <code>{i.key}</code> in site.ts.
          </Placeholder>
        ),
      )}
      {company.goals.length ? (
        <div className={card}>
          <h3 className="text-lg font-semibold">Our goals</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            {company.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function WhyChooseUs() {
  if (!has.whyChooseUs) return null;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {company.whyChooseUs.map((r) => (
        <li key={r.title} className={card}>
          <h3 className="font-semibold">{r.title}</h3>
          <p className="mt-2 text-muted">{r.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function Awards() {
  if (!has.awards) return null;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {awards.map((a) => (
        <li key={a.title} className={card}>
          <p className="text-sm text-muted">{a.year}</p>
          <h3 className="mt-1 font-semibold">{a.title}</h3>
          <p className="mt-1 text-sm text-muted">{a.issuer}</p>
        </li>
      ))}
    </ul>
  );
}

export function PortfolioGrid({ limit }: { limit?: number }) {
  if (projects.length === 0) {
    return (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].slice(0, limit ?? 3).map((n) => (
          <li key={n}>
            <Placeholder title={`Project ${n}`} className="h-full">
              Client, category, a short summary and (with the client&apos;s agreement) the results. Add to{" "}
              <code>projects</code> in site.ts.
            </Placeholder>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.slice(0, limit).map((p) => (
        <li key={p.title} className={card}>
          <p className="text-sm font-semibold text-brand">{p.category}</p>
          <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
          <p className="text-sm text-muted">{p.client}</p>
          <p className="mt-3 text-muted">{p.summary}</p>
          {p.result && <p className="mt-3 font-semibold">{p.result}</p>}
        </li>
      ))}
    </ul>
  );
}

export function Testimonials() {
  if (!has.testimonials) return null;
  // Horizontal, swipeable list on small screens; a grid on larger ones.
  return (
    <ul
      className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
      aria-label="Client testimonials"
      tabIndex={0}
    >
      {testimonials.map((t) => (
        <li key={t.name} className={`${card} w-[85%] shrink-0 snap-start md:w-auto`}>
          <figure>
            <blockquote className="text-lg">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="text-muted">, {t.role}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function PricingPlans() {
  if (!has.plans) {
    return (
      <div className={`${card} max-w-2xl`}>
        <h3 className="text-lg font-semibold">Prices are provided on request</h3>
        <p className="mt-2 text-muted">
          We have not published package prices on this website. Tell us which service you are interested in and what you
          need, and we will get back to you with a quote.
        </p>
        <Link
          href="/contact/"
          className="mt-5 inline-flex h-11 items-center rounded-md bg-brand px-5 font-semibold text-brand-foreground hover:bg-brand-strong"
        >
          Request a quote
        </Link>
      </div>
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <li key={p.name} className={`${card} flex flex-col ${p.featured ? "border-2 border-brand" : ""}`}>
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="mt-2 text-3xl font-bold">{p.price}</p>
          <p className="mt-2 text-muted">{p.description}</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="text-success">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link href="/contact/" className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-brand font-semibold text-brand-foreground">
            Request a quote<span className="sr-only"> for {p.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ limit }: { limit?: number }) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-background">
      {faqs.slice(0, limit).map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            <span aria-hidden="true" className="text-xl text-muted transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function JobList() {
  if (jobs.length === 0) {
    return (
      <div className={card}>
        <h3 className="text-lg font-semibold">No open positions are listed right now</h3>
        <p className="mt-2 text-muted">
          You are welcome to introduce yourself. Send us a message with a short summary of your experience through the{" "}
          <Link href="/contact/" className="font-semibold text-brand underline underline-offset-2">
            contact page
          </Link>
          .
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      {jobs.map((j) => (
        <li key={j.title} className={card}>
          <h3 className="text-lg font-semibold">{j.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {j.type} · {j.location}
          </p>
          <p className="mt-3 text-muted">{j.summary}</p>
          <Link href="/contact/" className={arrowLink}>
            Apply<span className="sr-only"> for {j.title}</span> <span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type ContactRow = {
  kind: "email" | "phone" | "address" | "hours";
  label: string;
  value: string;
  href?: string;
  /** Accessible name for the link, when the visible text alone is unclear. */
  linkLabel?: string;
  optional?: boolean;
};

/** Contact rows shared by the contact page, home page and footer. */
export function contactRows(): ContactRow[] {
  const { contact } = siteConfig;
  return [
    { kind: "email", label: "Email", value: contact.email, href: contact.email && mailtoHref(contact.email), linkLabel: contact.email && `Email ${contact.email}` },
    { kind: "phone", label: "Phone", value: contact.phone, href: contact.phone && telHref(contact.phone), linkLabel: contact.phone && `Call ${contact.phone}` },
    { kind: "address", label: "Address", value: contact.address },
    { kind: "hours", label: "Business hours", value: contact.hours, optional: true },
  ].filter((r) => r.value || !r.optional) as ContactRow[];
}

export function ContactIcon({ kind }: { kind: ContactRow["kind"] }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0 text-brand">
      {kind === "email" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
      {kind === "phone" && (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
      )}
      {kind === "address" && (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      )}
      {kind === "hours" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
    </svg>
  );
}

/** Contact details list, with labelled placeholders for anything unconfirmed. */
export function ContactDetails() {
  return (
    <dl className="space-y-5">
      {contactRows().map((r) => (
        // <dt>/<dd> must be direct children of this wrapper, so the icon sits inside <dt>.
        <div key={r.label} className="min-w-0">
          <dt className="flex items-center gap-2.5 font-semibold">
            <ContactIcon kind={r.kind} />
            {r.label}
          </dt>
          <dd className="pl-7 text-muted">
              {r.value ? (
                r.href ? (
                  <a
                    href={r.href}
                    aria-label={r.linkLabel}
                    className={`inline-flex min-h-11 items-center font-medium text-brand underline-offset-2 hover:underline ${
                      r.kind === "phone" ? "whitespace-nowrap" : "break-words [overflow-wrap:anywhere]"
                    }`}
                  >
                    {r.value}
                  </a>
                ) : (
                  <span className="inline-block pt-1">{r.value}</span>
                )
              ) : (
                <span className="inline-flex items-center gap-2 pt-1 text-placeholder-text">
                  <PlaceholderBadge /> To be confirmed
                </span>
              )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
