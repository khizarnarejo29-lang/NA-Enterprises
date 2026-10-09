import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { services, siteConfig } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

// Static export: only the slugs listed in site.ts are generated; anything else is a 404.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.placeholder
      ? `${service.title} at ${siteConfig.name}. Details of this service are still to be confirmed.`
      : service.summary,
    path: `/services/${slug}/`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHeader
        title={service.title}
        intro={service.summary}
        crumbs={[
          { href: "/services/", label: "Services" },
          { href: `/services/${slug}/`, label: service.title },
        ]}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <article className="lg:col-span-2">
          {service.placeholder ? (
            <Placeholder title="Service details to be confirmed">
              <p>
                This page is a layout placeholder. NA Enterprises has not yet confirmed this service. Once confirmed,
                it will describe:
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>what the service is and who it is for</li>
                <li>what is included</li>
                <li>how the work is carried out</li>
              </ul>
            </Placeholder>
          ) : (
            <div className="prose-content">
              <h2>Overview</h2>
              {service.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <h2>What is included</h2>
              {service.includes.length ? (
                <ul>
                  {service.includes.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : (
                <Placeholder title={`What NA Enterprises' ${service.title} service includes`}>
                  The specific deliverables, process and turnaround for this service have not been confirmed yet. Add them
                  to <code>includes</code> for this service in site.ts.
                </Placeholder>
              )}
              <h2>Get started</h2>
              <p>
                To discuss {service.title.toLowerCase().replace(" (seo)", "")} for your business,{" "}
                <Link href="/contact/">send us a message</Link>.
              </p>
            </div>
          )}
        </article>
        {others.length > 0 && (
          <aside aria-labelledby="other-services" className="h-fit rounded-xl border border-border p-6">
            <h2 id="other-services" className="font-semibold">
              Other services
            </h2>
            <ul className="mt-3 space-y-2">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="text-brand hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
      <CtaBand title={`Interested in ${service.title}?`} />
      {!service.placeholder && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.summary,
            url: absoluteUrl(`/services/${slug}/`),
            provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          }}
        />
      )}
    </>
  );
}
