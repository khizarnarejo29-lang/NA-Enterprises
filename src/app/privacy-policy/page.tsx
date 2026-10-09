import { EmailOrContactLink } from "@/components/email-or-contact-link";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  path: "/privacy-policy/",
});

// PLACEHOLDER: this is a general template, not legal advice. Have it reviewed
// for the jurisdictions you operate in before launch.
export default function PrivacyPolicyPage() {
  const { name, legal } = siteConfig;
  return (
    <>
      <PageHeader title="Privacy Policy" crumbs={[{ href: "/privacy-policy/", label: "Privacy Policy" }]} />
      <article className="prose-content mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p>Last updated: {legal.lastUpdated}</p>
        <p>
          This policy explains how {name} (&quot;we&quot;, &quot;us&quot;) handles personal information when you visit{" "}
          {siteConfig.url.replace("https://", "")} or contact us.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Information you give us when you contact us, such as your name, email address, phone number, and the details of your enquiry.</li>
          <li>Basic technical information sent automatically by your browser, such as IP address, browser type, and pages visited, which our hosting provider may record in server logs.</li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your enquiries and provide the services you request.</li>
          <li>To keep records of our communications and agreements.</li>
          <li>To maintain the security and proper operation of this website.</li>
          <li>To meet legal and regulatory obligations.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for unrelated marketing without your consent.</p>

        <h2>Cookies and local storage</h2>
        <p>
          This website does not set advertising or tracking cookies. If you choose a light or dark colour theme, that
          choice is saved in your browser&apos;s local storage on your own device and is never sent to us. If we add
          analytics or other tools that use cookies in the future, we will update this policy first.
        </p>

        <h2>Contact form</h2>
        <p>
          The contact form on this website does not send or store your message. When you submit it, it opens your own
          email app with your message filled in, and nothing is sent until you choose to send it from there.
        </p>

        <h2>Sharing your information</h2>
        <p>
          We share personal information only with service providers who help us run our business (for example, our
          website host and email provider), and only as far as necessary. We may also disclose information where
          required by law.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep personal information only for as long as needed for the purposes above, or as required by law, after
          which it is securely deleted.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, or delete your personal information,
          or to object to how we use it. To make a request, contact us via{" "}
          <EmailOrContactLink />.
        </p>

        <h2>Security</h2>
        <p>
          This website is served over an encrypted (HTTPS) connection. We take reasonable steps to protect the
          information we hold, but no method of transmission or storage is completely secure.
        </p>

        <h2>Changes to this policy</h2>
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to us via <EmailOrContactLink />.
        </p>
      </article>
    </>
  );
}
