import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { CompanyFacts, CompanyOverview, MissionVision, WhyChooseUs, has } from "@/components/sections";
import { company, siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `Find out more about ${siteConfig.name}: who we are, what we do, and how to get in touch.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`About ${siteConfig.name}`}
        intro="Who we are, what we do, and what drives us."
        crumbs={[{ href: "/about/", label: "About" }]}
      />

      <Section id="story" eyebrow="Our story" title="Who we are">
        <CompanyOverview />
        <div className="mt-8">
          <CompanyFacts />
        </div>
      </Section>

      <Section id="mission" tone="surface" eyebrow="Purpose" title={company.goals.length ? "Mission, vision and goals" : "Mission and vision"}>
        <MissionVision />
      </Section>

      {has.leadership && (
      <Section id="leadership" eyebrow="Leadership" title="Leadership team">
        {company.leadership.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {company.leadership.map((p) => (
              <li key={p.name} className="rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm font-semibold text-brand">{p.role}</p>
                <p className="mt-3 text-muted">{p.bio}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder title="Leadership profiles">
            Names, roles and short biographies of the people who run the business. Add to{" "}
            <code>company.leadership</code> in site.ts.
          </Placeholder>
        )}
        <div className="mt-8">
          {company.founderMessage ? (
            <figure className="rounded-xl bg-surface p-8">
              <blockquote className="text-lg leading-8">&ldquo;{company.founderMessage}&rdquo;</blockquote>
              {company.leadership[0] && (
                <figcaption className="mt-4 font-semibold">
                  {company.leadership[0].name}, {company.leadership[0].role}
                </figcaption>
              )}
            </figure>
          ) : (
            <Placeholder title="A message from our founder">
              A short personal message from the founder or director. Set <code>company.founderMessage</code> in site.ts.
            </Placeholder>
          )}
        </div>
      </Section>
      )}

      {has.whyChooseUs && (
        <Section id="why-us" tone="surface" eyebrow="Why us" title={`Why choose ${siteConfig.name}`}>
          <WhyChooseUs />
        </Section>
      )}

      <CtaBand />
    </>
  );
}
