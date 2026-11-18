import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { ScrollWords, ServiceMarquee } from "@/components/marquee";
import { ProcessSteps } from "@/components/process-steps";
import { Section } from "@/components/section";
import { ServiceShowcase, ServiceTiles } from "@/components/service-showcase";
import { ClientsStrip, ContactDetails, FaqList, PortfolioGrid, Testimonials, has } from "@/components/sections";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ description: siteConfig.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceMarquee />

      {has.clients && (
        <section aria-label="Clients and partners" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <ClientsStrip />
          </div>
        </section>
      )}

      <Section
        id="services"
        eyebrow="What we do"
        align="center"
        title={
          <>
            Everything your brand needs, <span className="text-gradient">under one roof</span>
          </>
        }
        intro="From your first logo to your website, social media and search rankings, we take care of your business's digital presence."
      >
        <ServiceTiles />
      </Section>

      <ScrollWords />

      <Section
        id="in-action"
        eyebrow="See it in action"
        title={
          <>
            Watch your project <span className="text-gradient">come to life</span>
          </>
        }
        intro="Scroll down to see how each of our services takes shape, from the first idea to the finished result."
      >
        <ServiceShowcase />
      </Section>

      <Section
        id="process"
        tone="surface"
        eyebrow="How we work"
        align="center"
        title={
          <>
            A simple process, <span className="text-gradient">start to finish</span>
          </>
        }
      >
        <ProcessSteps />
      </Section>

      {has.projects && (
        <Section id="portfolio" eyebrow="Our work" title="Featured projects">
          <PortfolioGrid limit={3} />
          <Link href="/portfolio/" className="mt-8 inline-flex font-semibold text-brand-strong hover:underline">
            View the portfolio <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </Section>
      )}

      {has.testimonials && (
        <Section id="testimonials" eyebrow="Testimonials" title="What our clients say">
          <Testimonials />
        </Section>
      )}

      <Section id="faq" eyebrow="FAQ" title="Frequently asked questions">
        <div data-reveal>
          <FaqList limit={4} />
        </div>
        <Link href="/faq/" className="mt-8 inline-flex font-semibold text-brand-strong hover:underline">
          See all questions <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </Section>

      <CtaBand />

      <Section
        id="contact"
        eyebrow="Contact"
        title="Schedule a call or send a message"
        intro="Tell us what you need and, if you like, when suits you for a call."
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="glass p-6 sm:p-8 lg:col-span-2" data-reveal>
            <ContactForm recipient={siteConfig.contact.email} />
          </div>
          <div className="glass h-fit p-6" data-reveal="right">
            <h3 className="mb-5 text-lg font-semibold">Contact details</h3>
            <ContactDetails />
          </div>
        </div>
      </Section>
    </>
  );
}
