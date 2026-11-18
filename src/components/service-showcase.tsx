import Link from "next/link";
import { services, type Service } from "@/content/site";
import { ServiceDemo } from "./service-demos";
import { ServiceIcon } from "./service-icon";

/** One service: animated preview on one side, what it is and what it includes on the other. */
export function ServiceRow({ service, index, headingLevel = 3 }: { service: Service; index: number; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  return (
    <article id={service.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div data-reveal={flip ? "right" : "left"} className={`relative ${flip ? "lg:order-2" : ""}`}>
        <div className="bg-gradient-brand absolute -inset-6 -z-10 rounded-[2rem] opacity-20 blur-3xl" />
        <div data-scroll="tilt">
          <ServiceDemo slug={service.slug} />
        </div>
      </div>
      <div data-reveal style={{ "--delay": "120ms" } as React.CSSProperties}>
        <div className="flex items-center gap-4">
          <span className="text-gradient text-5xl font-black tracking-tighter">{num}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-strong">
            <ServiceIcon slug={service.slug} />
          </span>
        </div>
        <H className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{service.title}</H>
        <p className="mt-4 text-lg leading-8 text-muted">{service.summary}</p>
        {service.includes.length > 0 && (
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {service.includes.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem]">
                <span aria-hidden="true" className="bg-gradient-brand mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/services/${service.slug}/`} className="btn-primary">
            Explore {service.short}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={`/contact/?service=${service.slug}`} className="btn-ghost">
            Get a quote<span className="sr-only"> for {service.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceShowcase({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  return (
    <div className="space-y-28 sm:space-y-36">
      {services.map((s, i) => (
        <ServiceRow key={s.slug} service={s} index={i} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

/** Compact grid of all services, linking to each service page. */
export function ServiceTiles() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <li key={s.slug} data-reveal style={{ "--delay": `${(i % 4) * 80}ms` } as React.CSSProperties}>
          <Link
            href={`/services/${s.slug}/`}
            className="spotlight-host glow-border group glass flex h-full flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1"
          >
            <span className="spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="bg-gradient-brand relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_-10px_rgb(139_92_246/0.8)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <ServiceIcon slug={s.slug} />
            </span>
            <span className="relative mt-5 text-lg font-semibold">{s.title}</span>
            <span className="relative mt-2 flex-1 text-sm leading-6 text-muted">{s.summary}</span>
            <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
              Learn more
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
