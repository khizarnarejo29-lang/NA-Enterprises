import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProcessSteps } from "@/components/process-steps";
import { Section } from "@/components/section";
import { ServiceShowcase, ServiceTiles } from "@/components/service-showcase";
import { WhyChooseUs, has } from "@/components/sections";
import { services, siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description: `${siteConfig.name} services: ${services.map((s) => s.title).join(", ")}.`,
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Digital services that grow your business"
        intro="Websites, branding, marketing and content: everything your business needs to look professional and get found online."
        crumbs={[{ href: "/services/", label: "Services" }]}
      />
      <section aria-label="All services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ServiceTiles />
      </section>
      <section aria-label="Services in detail" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <ServiceShowcase headingLevel={2} />
      </section>
      <Section id="process" tone="surface" eyebrow="How we work" align="center" title="A simple process, start to finish">
        <ProcessSteps />
      </Section>
      {has.whyChooseUs && (
        <Section id="why-us" eyebrow="Why us" title={`Why choose ${siteConfig.name}`}>
          <WhyChooseUs />
        </Section>
      )}
      <CtaBand />
    </>
  );
}
