import Link from "next/link";
import { siteConfig } from "@/content/site";
import { mailtoHref } from "@/lib/contact";

/** The business email as a mailto link, or the contact page while no email is confirmed. */
export function EmailOrContactLink() {
  const { email } = siteConfig.contact;
  return email ? <a href={mailtoHref(email)}>{email}</a> : <Link href="/contact/">our contact page</Link>;
}
