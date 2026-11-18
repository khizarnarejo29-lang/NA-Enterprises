/** Line icon for each service, keyed by slug. */
export function ServiceIcon({ slug, size = 24, className = "" }: { slug: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[slug] ?? <path d="M4 7h16M4 12h16M4 17h10" />}
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  "website-development": (
    <>
      <rect x="2.5" y="4" width="19" height="15" rx="2.5" />
      <path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01M9.5 12.5l-2 2 2 2M14.5 12.5l2 2-2 2" />
    </>
  ),
  "saas-development": (
    <>
      <path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.5 3.8 3.8 0 0 1-.4 7.5z" />
      <path d="M9.5 12.5 8 14l1.5 1.5M14.5 12.5 16 14l-1.5 1.5M12.8 12l-1.6 4" />
    </>
  ),
  "ebook-writing-design": (
    <>
      <path d="M12 6.5C10.3 5 7.8 4.5 4 4.5v13c3.8 0 6.3.5 8 2 1.7-1.5 4.2-2 8-2v-13c-3.8 0-6.3.5-8 2z" />
      <path d="M12 6.5v13M7 8.5h2.5M7 11.5h2.5M14.5 8.5H17" />
    </>
  ),
  "logo-design": (
    <>
      <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" />
      <path d="M8.5 15.5 12 8l3.5 7.5M9.7 13h4.6" />
    </>
  ),
  "business-card-design": (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <circle cx="8" cy="11" r="2" />
      <path d="M5.5 15.5c.6-1.3 1.5-2 2.5-2s1.9.7 2.5 2M13.5 10h5M13.5 13h3.5" />
    </>
  ),
  "social-media-marketing": (
    <>
      <path d="M12 20.5s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9c0 5.6-7.5 10-7.5 10z" />
      <path d="M19 2.5v3M17.5 4h3" />
    </>
  ),
  "search-engine-optimization": (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M7.5 12.5l2-2 1.5 1.5 2.5-3" />
    </>
  ),
  "content-writing": (
    <>
      <path d="M14.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14.5 3.5V8H19M8.5 12h7M8.5 15.5h5" />
    </>
  ),
  "graphic-design": (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.8 0-1.3-1-1.6-1-2.7 0-1 .8-1.7 1.9-1.7H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10.5" cy="7" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </>
  ),
  "video-editing-animation": (
    <>
      <rect x="2.5" y="5" width="14" height="14" rx="2.5" />
      <path d="m16.5 10 5-3v10l-5-3M7.5 9.5v5l4-2.5z" />
    </>
  ),
};
