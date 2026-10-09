import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { ContactDetails } from "@/components/sections";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${siteConfig.name} to ask a question, request a quote, or schedule a call.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        intro="Ask a question, request a quote, or let us know a good time for a call."
        crumbs={[{ href: "/contact/", label: "Contact" }]}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-xl font-semibold">Send us a message</h2>
          <ContactForm recipient={siteConfig.contact.email} />
        </div>
        <aside aria-labelledby="details-heading" className="h-fit rounded-xl bg-surface p-6">
          <h2 id="details-heading" className="mb-5 text-xl font-semibold">
            Contact details
          </h2>
          <ContactDetails />
        </aside>
      </section>
    </>
  );
}
