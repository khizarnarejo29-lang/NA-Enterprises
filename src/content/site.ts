/**
 * Single source of truth for business details and page content.
 *
 * Confirmed by the owner: the business name (NA Enterprises), the domain
 * (naenterprises.site), the business email (info@naenterprises.site), the
 * phone (0313 2759207), address (DHA, Karachi, Pakistan), and the four services
 * listed below. Nothing else has been confirmed.
 *
 * Markers:
 *   PLACEHOLDER: required before launch. Shown on the site as a labelled
 *                placeholder. `npm run check:content` fails while any remain.
 *   OPTIONAL:    the section is hidden while empty. Fill in only if it applies.
 *
 * Never invent details to fill a gap: leave the value empty instead.
 */

type SiteConfig = {
  name: string;
  url: string;
  locale: string;
  tagline: string;
  description: string;
  /** Shows the site-wide "preview" banner. Set to false only when all content is confirmed. */
  preview: boolean;
  contact: { email: string; phone: string; address: string; hours: string };
  legal: { lastUpdated: string; jurisdiction: string };
};

export const siteConfig: SiteConfig = {
  name: "NA Enterprises",
  url: "https://naenterprises.site",
  locale: "en",
  // Plain description of the confirmed services, not a marketing claim.
  tagline: "Digital marketing and design services for your business.", // OPTIONAL: replace with the company's own slogan if it has one
  description:
    "NA Enterprises offers search engine optimization (SEO), social media marketing, content writing and logo design.",
  preview: true, // PLACEHOLDER: set to false once every placeholder is replaced
  contact: {
    email: "info@naenterprises.site", // Confirmed by the owner (2026-10-08)
    phone: "0313 2759207", // Confirmed by the owner (2026-10-08). Displayed as given; linked as tel:+923132759207.
    address: "DHA, Karachi, Pakistan", // Confirmed by the owner (2026-10-08). Display exactly as given; no street address.
    hours: "", // OPTIONAL: e.g. "Monday to Friday, 9:00 to 17:00" (hidden while empty)
  },
  legal: {
    lastUpdated: "2026-10-08",
    jurisdiction: "", // PLACEHOLDER: governing-law country / region
  },
};

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/services/", label: "Services" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/careers/", label: "Careers" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/terms-and-conditions/", label: "Terms and Conditions" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  /** True until the service has been confirmed by the business. */
  placeholder: boolean;
  description: string[];
  includes: string[];
};

// Confirmed by the owner (2026-10-08). Do not add services that have not been confirmed.
// Each entry gets its own page at /services/<slug>/ and a sitemap entry.
// `summary` and `description` explain what the discipline is in general terms;
// they make no claims about NA Enterprises' process, pricing or results.
export const services: Service[] = [
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    summary: "Improving how your website appears in search results, so people looking for what you offer can find you.",
    placeholder: false,
    description: [
      "Search engine optimization is the work of making a website easier for search engines such as Google to understand and show to the right people. It typically covers the site's content, structure and technical set-up.",
    ],
    includes: [], // PLACEHOLDER: what NA Enterprises' SEO service actually includes
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    summary: "Using social media platforms to reach your audience, share your message and build your brand.",
    placeholder: false,
    description: [
      "Social media marketing means planning and publishing content on platforms such as Facebook, Instagram, LinkedIn or TikTok to connect with customers and promote a business.",
    ],
    includes: [], // PLACEHOLDER: what NA Enterprises' social media marketing service actually includes
  },
  {
    slug: "content-writing",
    title: "Content Writing",
    summary: "Clear, purposeful written content for your website, marketing and communications.",
    placeholder: false,
    description: [
      "Content writing is the creation of written material such as website pages, articles, product descriptions and social media posts, written for a specific audience and purpose.",
    ],
    includes: [], // PLACEHOLDER: what NA Enterprises' content writing service actually includes
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    summary: "A distinctive logo that gives your business a recognisable visual identity.",
    placeholder: false,
    description: [
      "Logo design is the creation of the mark or wordmark that represents a business. A good logo is simple, memorable and works across a website, social media and print.",
    ],
    includes: [], // PLACEHOLDER: what NA Enterprises' logo design service actually includes
  },
];

/** Company facts. Empty values render as labelled placeholders. */
export const company = {
  founded: "", // PLACEHOLDER: year founded
  location: "Karachi, Pakistan", // From the confirmed address
  overview: "", // PLACEHOLDER: 2–3 sentence company overview
  mission: "", // PLACEHOLDER
  vision: "", // PLACEHOLDER
  goals: [] as string[], // OPTIONAL: 3–4 company goals (hidden while empty)
  whyChooseUs: [] as { title: string; text: string }[], // OPTIONAL: confirmed differentiators only (hidden while empty)
  leadership: [] as { name: string; role: string; bio: string }[], // OPTIONAL: hidden while empty
  founderMessage: "", // OPTIONAL: message from the founder / director (hidden while empty)
};

// OPTIONAL (hidden while empty): add clients / partners only with their permission to show their name or logo.
export const clients: { name: string; logo?: string }[] = [];

// OPTIONAL (hidden while empty): add only awards and certifications that can be verified.
export const awards: { title: string; issuer: string; year: string }[] = [];

export type Project = { title: string; client: string; category: string; summary: string; result?: string };
// PLACEHOLDER: add completed projects. Only publish results the client has agreed to share.
export const projects: Project[] = [];

export type Testimonial = { quote: string; name: string; role: string };
// OPTIONAL (hidden while empty): add genuine client reviews, with the client's permission.
export const testimonials: Testimonial[] = [];

export type Plan = { name: string; price: string; description: string; features: string[]; featured?: boolean };
// OPTIONAL: add real packages and prices. While empty, pricing shows "request a quote" only.
export const plans: Plan[] = [];

export type Job = { title: string; type: string; location: string; summary: string };
// OPTIONAL: add open positions when hiring. While empty, careers says none are listed.
export const jobs: Job[] = [];

// PLACEHOLDER: owner to review these answers and add the questions customers actually ask. Avoid
// promising response times, prices or guarantees the business has not confirmed.
export const faqs = [
  {
    q: "How do I get started?",
    a: "Send us a message through the contact page with a short description of what you need, and we will reply to discuss the next steps.",
  },
  {
    q: "How much do your services cost?",
    a: "Pricing depends on the scope of the work. Contact us with details of what you need and we will discuss costs with you.",
  },
  {
    q: "Does the contact form send my message directly?",
    a: "The form checks your details and then opens your own email app with the message ready to send. Nothing is sent until you press send in your email app.",
  },
  {
    q: "How do you handle my personal information?",
    a: "We only use the information you send us to respond to you and provide our services. See our Privacy Policy for full details.",
  },
];
