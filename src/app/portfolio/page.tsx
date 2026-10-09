import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { PortfolioGrid, Testimonials, has } from "@/components/sections";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description: `The ${siteConfig.name} portfolio of SEO, social media marketing, content writing and logo design work.`,
  path: "/portfolio/",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        intro={has.projects ? "A selection of our work." : "Examples of our work will be published here."}
        crumbs={[{ href: "/portfolio/", label: "Portfolio" }]}
      />
      <Section id="projects" eyebrow="Our work" title="Projects">
        <PortfolioGrid />
      </Section>
      {has.testimonials && (
        <Section id="testimonials" tone="surface" eyebrow="Testimonials" title="What our clients say">
          <Testimonials />
        </Section>
      )}
      <CtaBand title="Have a project in mind?" />
    </>
  );
}
