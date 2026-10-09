import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { JobList } from "@/components/sections";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: `Current job openings at ${siteConfig.name} and how to apply.`,
  path: "/careers/",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers"
        intro={`Find out about opportunities to work with ${siteConfig.name}.`}
        crumbs={[{ href: "/careers/", label: "Careers" }]}
      />
      <Section id="openings" eyebrow="Join us" title="Open positions">
        <JobList />
      </Section>
      <Section id="apply" tone="surface" eyebrow="How to apply" title="Applying">
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["Get in touch", "Send us a message through the contact page with the role you are interested in."],
            ["Share your experience", "Include a short summary of your experience. We will tell you where to send your CV."],
            ["Hear back", "If there is a suitable opening, we will contact you about next steps."],
          ].map(([title, text], i) => (
            <li key={title} className="rounded-xl border border-border bg-background p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-semibold text-brand-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
