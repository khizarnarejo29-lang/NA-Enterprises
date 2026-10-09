import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { ServiceCard, WhyChooseUs, has } from "@/components/sections";
import { services, siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description: `${siteConfig.name} services: ${services.map((s) => s.title).join(", ")}.`,
  path: "/services/",
});

export default function ServicesPage() {
  const unconfirmed = services.some((s) => s.placeholder);
  return (
    <>
      <PageHeader
        title="Our services"
        intro="Choose a service to see what it includes and how to get started."
        crumbs={[{ href: "/services/", label: "Services" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {unconfirmed && (
          <Placeholder title="Services not yet confirmed" className="mb-8">
            The services below are layout placeholders. NA Enterprises has not yet confirmed which services it offers.
            Replace them in <code>services</code> in site.ts.
          </Placeholder>
        )}
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} headingLevel={2} />
          ))}
        </ul>
      </section>
      {has.whyChooseUs && (
        <Section id="why-us" tone="surface" eyebrow="Why us" title={`Why choose ${siteConfig.name}`}>
          <WhyChooseUs />
        </Section>
      )}
      <CtaBand />
    </>
  );
}
