import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { FaqList, PricingPlans } from "@/components/sections";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description: `Packages and pricing from ${siteConfig.name}, and how to request a quote for your project.`,
  path: "/pricing/",
});

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing"
        intro="Compare our packages, or request a quote tailored to your project."
        crumbs={[{ href: "/pricing/", label: "Pricing" }]}
      />
      <Section id="plans" eyebrow="Packages" title="Choose a package">
        <PricingPlans />
      </Section>
      <Section id="faq" tone="surface" eyebrow="FAQ" title="Questions about pricing">
        <FaqList />
      </Section>
      <CtaBand title="Need something different?" text="Tell us about your project and we will prepare a quote." />
    </>
  );
}
