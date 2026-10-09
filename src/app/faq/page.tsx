import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { FaqList } from "@/components/sections";
import { faqs, siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: `Answers to common questions about working with ${siteConfig.name}, including getting started, pricing, and privacy.`,
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        intro="Can't find what you're looking for? Contact us and we'll be happy to help."
        crumbs={[{ href: "/faq/", label: "FAQ" }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <FaqList />
      </section>
      <CtaBand title="Still have questions?" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
