import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import {
  Awards,
  ClientsStrip,
  CompanyFacts,
  ContactDetails,
  CompanyOverview,
  FaqList,
  MissionVision,
  PortfolioGrid,
  PricingPlans,
  ServicesGrid,
  Testimonials,
  WhyChooseUs,
  has,
} from "@/components/sections";
import { company, siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ description: siteConfig.description, path: "/" });

const primaryBtn =
  "inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-semibold text-[#0a365c] hover:bg-slate-100";
const secondaryBtn =
  "inline-flex h-12 items-center justify-center rounded-md border border-white/60 px-6 font-semibold text-white hover:bg-white/10";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--hero-from)] to-[var(--hero-to)] text-white [--focus-ring:#ffffff]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">{siteConfig.name}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{siteConfig.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact/" className={primaryBtn}>
              Request a quote
            </Link>
            <Link href="/services/" className={secondaryBtn}>
              Explore our services
            </Link>
          </div>
        </div>
      </section>

      {has.clients && (
        <section aria-label="Clients and partners" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <ClientsStrip />
          </div>
        </section>
      )}

      <Section id="about" eyebrow="About us" title={`Who is ${siteConfig.name}?`}>
        <CompanyOverview />
        <div className="mt-8">
          <CompanyFacts />
        </div>
        <Link href="/about/" className="mt-8 inline-flex font-semibold text-brand hover:underline">
          More about us <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </Section>

      <Section id="services" tone="surface" eyebrow="What we do" title="Our services">
        <ServicesGrid />
        <Link href="/services/" className="mt-8 inline-flex font-semibold text-brand hover:underline">
          View all services <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </Section>

      <Section id="mission" eyebrow="Purpose" title={company.goals.length ? "Mission, vision and goals" : "Mission and vision"}>
        <MissionVision />
      </Section>

      {has.whyChooseUs && (
        <Section id="why-us" tone="surface" eyebrow="Why us" title={`Why choose ${siteConfig.name}`}>
          <WhyChooseUs />
        </Section>
      )}

      {has.awards && (
        <Section id="awards" eyebrow="Recognition" title="Awards and certifications">
          <Awards />
        </Section>
      )}

      {has.projects && (
        <Section id="portfolio" tone="surface" eyebrow="Our work" title="Featured projects">
          <PortfolioGrid limit={3} />
          <Link href="/portfolio/" className="mt-8 inline-flex font-semibold text-brand hover:underline">
            View the portfolio <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </Section>
      )}

      {has.testimonials && (
        <Section id="testimonials" eyebrow="Testimonials" title="What our clients say">
          <Testimonials />
        </Section>
      )}

      <Section id="pricing" tone="surface" eyebrow="Pricing" title="Pricing">
        <PricingPlans />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Frequently asked questions">
        <FaqList limit={3} />
        <Link href="/faq/" className="mt-8 inline-flex font-semibold text-brand hover:underline">
          See all questions <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </Section>

      <section aria-labelledby="careers-heading" className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="careers-heading" className="text-2xl font-bold">Interested in working with us?</h2>
            <p className="mt-2 text-muted">See current openings or introduce yourself.</p>
          </div>
          <Link
            href="/careers/"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md border border-brand px-6 font-semibold text-brand hover:bg-brand hover:text-brand-foreground"
          >
            Explore careers
          </Link>
        </div>
      </section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Schedule a call or send a message"
        intro="Tell us what you need and, if you like, when suits you for a call."
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm recipient={siteConfig.contact.email} />
          </div>
          <div className="h-fit rounded-xl bg-surface p-6">
            <h3 id="home-contact-details" className="mb-5 text-lg font-semibold">
              Contact details
            </h3>
            <ContactDetails />
          </div>
        </div>
      </Section>
    </>
  );
}
