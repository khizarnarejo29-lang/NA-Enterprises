# naenterprises.site

Static marketing website built with Next.js 16 (App Router, TypeScript) and Tailwind CSS v4,
exported as plain HTML to `out/`.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run typecheck
npm run lint
npm run build          # writes the static site to out/
npm start              # serves out/ locally
npm run check:content  # fails while any PLACEHOLDER content remains
```

## Where things live

| What                                  | Where                          |
| ------------------------------------- | ------------------------------ |
| Business details, services, projects, testimonials, plans, jobs, FAQs | `src/content/site.ts` |
| Shared page sections (services grid, portfolio, pricing…) | `src/components/sections.tsx` |
| Contact form (validation, email hand-off) | `src/components/contact-form.tsx` |
| Placeholder styling | `src/components/placeholder.tsx` |
| Pages                                 | `src/app/**/page.tsx`          |
| Per-page metadata and canonical URLs  | `src/lib/seo.ts`               |
| Header, footer, breadcrumbs           | `src/components/`              |
| Sitemap / robots.txt                  | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Custom 404                            | `src/app/not-found.tsx`        |

To add a service, add an entry to `services` in `src/content/site.ts`. Its page, the
navigation links and its sitemap entry are generated automatically.

Nothing about the business is confirmed yet. Empty values in `site.ts` show as clearly labelled
placeholders on the site, and a preview banner is shown while `siteConfig.preview` is true.
`npm run check:content` lists every `PLACEHOLDER` that still has to be replaced.

The contact form has no backend: a valid submission opens the visitor's email app addressed to
`siteConfig.contact.email`. While that is empty, the form says the message cannot be sent yet.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting and custom-domain setup.
