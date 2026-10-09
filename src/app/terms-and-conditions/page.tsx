import Link from "next/link";
import { EmailOrContactLink } from "@/components/email-or-contact-link";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: `The terms that apply when you use the ${siteConfig.name} website and services.`,
  path: "/terms-and-conditions/",
});

// PLACEHOLDER: this is a general template, not legal advice. Have it reviewed
// and set the governing jurisdiction in site.ts before launch.
export default function TermsPage() {
  const { name, legal } = siteConfig;
  return (
    <>
      <PageHeader
        title="Terms and Conditions"
        crumbs={[{ href: "/terms-and-conditions/", label: "Terms and Conditions" }]}
      />
      <article className="prose-content mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p>Last updated: {legal.lastUpdated}</p>
        <p>
          These terms apply to your use of this website and to services provided by {name}. By using the website you
          agree to these terms. If you do not agree, please do not use the website.
        </p>

        <h2>Use of this website</h2>
        <ul>
          <li>You may view and print pages for personal or internal business use.</li>
          <li>You must not misuse the website, attempt to gain unauthorised access to it, or interfere with its operation.</li>
          <li>Content on this website is for general information only and may change without notice.</li>
        </ul>

        <h2>Services</h2>
        <p>
          Specific services are governed by a written quote or agreement, which sets out the scope, price, and timeline.
          Where that agreement conflicts with these terms, the agreement takes precedence.
        </p>

        <h2>Quotes and payment</h2>
        <p>
          Quotes are valid for the period stated on them. Payment terms are set out in each quote or invoice. Work
          outside the agreed scope will be quoted separately before it begins.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content, design, and branding of this website belong to {name} unless stated otherwise, and may not be
          reproduced without permission.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, {name} is not liable for any indirect or consequential loss arising from use
          of this website. Nothing in these terms limits liability that cannot be limited by law.
        </p>

        <h2>Third-party links</h2>
        <p>We are not responsible for the content or practices of external websites linked from this site.</p>

        <h2>Privacy</h2>
        <p>
          Our handling of personal information is described in our <Link href="/privacy-policy/">Privacy Policy</Link>.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of {legal.jurisdiction || "the jurisdiction in which we are registered"}.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time. The date at the top shows when they were last changed.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to us via <EmailOrContactLink />.
        </p>
      </article>
    </>
  );
}
