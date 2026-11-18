/**
 * Single source of truth for business details and page content.
 *
 * Confirmed by the owner: the business name (NA Enterprises), the domain
 * (naenterprises.site), the business email (info@naenterprises.site), the
 * phone (0313 2759207), address (Karachi, Pakistan), the ten services
 * listed below, and the partnership with Galaxy Airport Taxi (2026-11-18). Nothing else has been confirmed.
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
  tagline: "Digital marketing and design services for your business.", // OPTIONAL: replace with the company's own slogan if it has one
  description:
    "NA Enterprises is a digital services agency in Karachi offering website development, SaaS (software as a service), logo and business card design, social media marketing, SEO, content writing, eBooks, graphic design and video editing.",
  preview: false, // Owner asked to remove the preview banner (2026-11-18). Unfilled placeholders are hidden while false.
  contact: {
    email: "info@naenterprises.site", // Confirmed by the owner (2026-10-08)
    phone: "0313 2759207", // Confirmed by the owner (2026-10-08). Displayed as given; linked as tel:+923132759207.
    address: "Karachi, Pakistan", // Confirmed by the owner (2026-11-18). Display exactly as given; no street address.
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
  /** Short name for menus and chips. */
  short: string;
  summary: string;
  /** True until the service has been confirmed by the business. */
  placeholder: boolean;
  description: string[];
  includes: string[];
};

// Confirmed by the owner (2026-11-18): website development, SaaS, logo design, business card design,
// social media marketing, SEO, content writing, eBook writing & design, graphic design, and
// video editing & animation.
// Each entry gets its own page at /services/<slug>/, an animated preview, and a sitemap entry.
// `summary` and `description` explain the discipline in general terms. `includes` lists the
// typical deliverables of each service. REVIEW: owner to confirm or edit each `includes` list.
export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    short: "Websites",
    summary: "Fast, modern and mobile-friendly websites that look great and turn visitors into customers.",
    placeholder: false,
    description: [
      "Your website is often the first place a customer meets your business. Website development covers planning the pages, designing the look, and building a site that loads quickly and works on every screen.",
      "From a simple business website to a full online store, the goal is the same: a site that clearly explains what you offer and makes it easy for visitors to get in touch or buy.",
    ],
    includes: [
      "Custom website design matched to your brand",
      "Responsive layout for mobile, tablet and desktop",
      "Business websites, landing pages and online stores",
      "Contact forms, WhatsApp and social media links",
      "Speed optimisation and basic on-page SEO",
      "Domain, hosting and launch support",
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS (Software as a Service)",
    short: "SaaS",
    summary: "Custom cloud software your customers use online, with accounts, dashboards and subscriptions, built and run for you.",
    placeholder: false,
    description: [
      "Software as a service (SaaS) is software that runs in the cloud and is used through a web browser or app, usually on a subscription. There is nothing for your customers to install, and everyone always has the latest version.",
      "We plan, build and run SaaS platforms for businesses: from booking and management systems to customer portals and admin dashboards. Our partner Galaxy Airport Taxi runs on a SaaS platform from NA Enterprises.",
    ],
    includes: [
      "Planning your software around how your business works",
      "Web app with user accounts and secure login",
      "Admin dashboard and reports",
      "Booking, order or customer management features",
      "Subscriptions and online payments",
      "Cloud hosting, updates and ongoing support",
    ],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    short: "Logos",
    summary: "A distinctive logo that gives your business a recognisable visual identity.",
    placeholder: false,
    description: [
      "Logo design is the creation of the mark or wordmark that represents a business. A good logo is simple, memorable and works across a website, social media and print.",
      "A logo is usually delivered together with a colour palette and font choices, so your brand looks consistent wherever it appears.",
    ],
    includes: [
      "Several initial logo concepts to choose from",
      "Revisions on your chosen concept",
      "Colour palette and font recommendations",
      "Versions for light and dark backgrounds",
      "Final files in PNG, JPG, SVG and PDF",
      "Sizes ready for social media profiles",
    ],
  },
  {
    slug: "business-card-design",
    title: "Business Card & Stationery Design",
    short: "Business Cards",
    summary: "Professional business cards, letterheads and stationery that leave a lasting impression.",
    placeholder: false,
    description: [
      "A business card is often the one thing a potential client takes away from a meeting. Business card and stationery design gives your printed materials a consistent, professional look that matches your brand.",
    ],
    includes: [
      "Front and back business card design",
      "Letterhead and envelope design",
      "Email signature design",
      "Designs that follow your logo and brand colours",
      "Print-ready files with bleed and crop marks",
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Social Media",
    summary: "Using social media platforms to reach your audience, share your message and build your brand.",
    placeholder: false,
    description: [
      "Social media marketing means planning and publishing content on social media to connect with customers and promote a business.",
      "It typically covers platforms such as Facebook, Instagram, TikTok and LinkedIn, and can include both regular posting and paid advertising.",
    ],
    includes: [
      "Social media page setup and optimisation",
      "Monthly content calendar",
      "Post and story designs",
      "Short video and reel ideas",
      "Paid ad campaigns on Facebook and Instagram",
      "Monthly performance report",
    ],
  },
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    short: "SEO",
    summary: "Improving how your website appears in search results, so people looking for what you offer can find you.",
    placeholder: false,
    description: [
      "Search engine optimization is the work of making a website easier for search engines such as Google to understand and show to the right people. It typically covers the site's content, structure and technical set-up.",
    ],
    includes: [
      "Website SEO audit",
      "Keyword research for your business",
      "On-page optimisation of titles, headings and content",
      "Technical SEO and site speed improvements",
      "Google Business Profile setup for local search",
      "Monthly ranking and traffic report",
    ],
  },
  {
    slug: "content-writing",
    title: "Content Writing",
    short: "Content",
    summary: "Clear, purposeful written content for your website, marketing and communications.",
    placeholder: false,
    description: [
      "Content writing is the creation of written material for a specific audience and purpose.",
      "Good content explains what you do in plain language, answers your customers' questions and helps your pages appear in search results.",
    ],
    includes: [
      "Website page content",
      "Blog posts and articles",
      "SEO-friendly product and service descriptions",
      "Social media captions",
      "Company profiles and brochures",
    ],
  },
  {
    slug: "ebook-writing-design",
    title: "eBook Writing & Design",
    short: "eBooks",
    summary: "Professionally written and beautifully designed eBooks that share your knowledge and grow your brand.",
    placeholder: false,
    description: [
      "An eBook is a digital book people read on a phone, tablet, e-reader or computer. Businesses use eBooks as guides for their customers, as free downloads that bring in new leads, or as products to sell.",
      "eBook writing and design covers planning the chapters, writing and editing the text, designing the cover and pages, and preparing the files for download or for online stores.",
    ],
    includes: [
      "Topic research and chapter outline",
      "eBook writing and editing",
      "Eye-catching cover design",
      "Page layout with images and charts",
      "Files in PDF and EPUB formats",
      "Ready for your website or online stores",
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    short: "Graphic Design",
    summary: "Eye-catching flyers, banners, posters and brochures that put your brand in front of people.",
    placeholder: false,
    description: [
      "Graphic design turns your message into visuals people notice and remember. It covers everything from social media posts and online banners to printed flyers, posters and brochures.",
    ],
    includes: [
      "Flyers, posters and brochures",
      "Social media post and ad designs",
      "Website banners and display ads",
      "Packaging and label design",
      "Print-ready and web-ready files",
    ],
  },
  {
    slug: "video-editing-animation",
    title: "Video Editing & Animation",
    short: "Video & Animation",
    summary: "Engaging videos, reels and motion graphics that tell your story and grab attention.",
    placeholder: false,
    description: [
      "Video is one of the most effective ways to explain a product or service. Video editing and animation covers cutting and polishing your footage, adding music and captions, and creating animated graphics.",
    ],
    includes: [
      "Promotional and product videos",
      "Reels and short videos for social media",
      "Logo animation and intros",
      "Animated explainer videos",
      "Subtitles, music and colour correction",
    ],
  },
];

/** How a project usually runs. General steps, not a promise of timings. REVIEW: owner to confirm. */
export const process = [
  { title: "Discuss", text: "Tell us about your business, your goals and what you need." },
  { title: "Plan & design", text: "We plan the work and share designs for your feedback." },
  { title: "Build & refine", text: "We build, test and refine until you are happy with it." },
  { title: "Launch & grow", text: "We hand over the final work and help you take it live." },
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

// OPTIONAL (hidden while empty): add clients only with their permission to show their name or logo.
export const clients: { name: string; logo?: string }[] = [];

export type Partner = { name: string; role: string; text: string; service: string };
// Confirmed by the owner (2026-11-18). `service` is the slug of the service we provide to the partner.
export const partners: Partner[] = [
  {
    name: "Galaxy Airport Taxi",
    role: "Official partner",
    text: "Galaxy Airport Taxi is our partner. Their business runs on a SaaS (software as a service) platform built and run by NA Enterprises.",
    service: "saas-development",
  },
];

// OPTIONAL (hidden while empty): add only awards and certifications that can be verified.
export const awards: { title: string; issuer: string; year: string }[] = [];

export type Project = { title: string; client: string; category: string; summary: string; result?: string };
// Add completed projects. Only publish results the client has agreed to share.
// While empty, /portfolio/ shows "Portfolio coming soon" and the home page hides the section.
export const projects: Project[] = [
  {
    title: "SaaS platform for Galaxy Airport Taxi",
    client: "Galaxy Airport Taxi (partner)",
    category: "SaaS",
    summary: "A software-as-a-service platform that NA Enterprises built and runs for our partner Galaxy Airport Taxi. It is live and in use today.",
  },
];

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
