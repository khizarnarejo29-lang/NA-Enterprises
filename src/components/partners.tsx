import Link from "next/link";
import { partners, services } from "@/content/site";
import { ServiceIcon } from "./service-icon";

export const hasPartners = partners.length > 0;

/** Partner cards: who we work with and which of our services they run on. */
export function PartnerCards({ only }: { only?: string }) {
  const list = only ? partners.filter((p) => p.service === only) : partners;
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {list.map((p) => {
        const service = services.find((s) => s.slug === p.service);
        return (
          <li key={p.name} data-reveal="zoom" className="glow-border glass relative overflow-hidden p-8 sm:p-10 md:col-span-2">
            <div className="bg-gradient-brand absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-25 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <span className="bg-gradient-brand flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_0_40px_-8px_rgb(10_108_255)]" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 16.5h14M6.5 16.5l1.3-4.3a2 2 0 0 1 1.9-1.4h4.6a2 2 0 0 1 1.9 1.4l1.3 4.3M4 16.5v2.5M20 16.5v2.5M7.5 19h0M16.5 19h0M10 7.5h4l-.5-2h-3z" />
                  </svg>
                </span>
                <div>
                  <p className="eyebrow">{p.role}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{p.name}</h3>
                </div>
              </div>
              {service && (
                <Link
                  href={`/services/${service.slug}/`}
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#4ade80]/40 bg-[#4ade80]/10 px-4 py-2 text-sm font-semibold text-[#4ade80] md:self-center"
                >
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="pulse-ring absolute inset-0 rounded-full bg-[#4ade80]" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                  </span>
                  <ServiceIcon slug={service.slug} size={16} />
                  {service.short} platform live
                </Link>
              )}
            </div>
            <p className="relative mt-6 max-w-3xl text-lg leading-8 text-muted">{p.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
