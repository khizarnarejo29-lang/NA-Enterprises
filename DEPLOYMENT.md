# Deploying naenterprises.site

The site is a **fully static export**. `npm run build` writes plain HTML/CSS/JS to `out/`,
which any static host can serve. No Node.js server is needed in production.

## Before launch

1. Replace every value marked `PLACEHOLDER`, mostly in `src/content/site.ts`.
   `npm run check:content` lists any that remain and fails until none are left.
2. Have the Privacy Policy and Terms and Conditions reviewed for your jurisdiction, and set
   `legal.jurisdiction` and `legal.lastUpdated` in `src/content/site.ts`.
3. Make sure the confirmed mailbox `info@naenterprises.site` receives mail: the contact form and
   email links send to it. Set `preview: false` only after `npm run check:content` passes.
4. Run `npm run typecheck && npm run lint && npm run build` and confirm it finishes without errors.

> **Building on Windows:** Next.js 16.4 writes some prefetch files to the wrong
> place on Windows. `npm run build` automatically runs `scripts/fix-export-segments.mjs`
> afterwards to fix this. If you build some other way, run
> `node scripts/fix-export-segments.mjs out` before uploading `out/`. Builds on Linux
> hosts (Vercel, Netlify, Cloudflare) are unaffected.

## Option A: Vercel (recommended)

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The Next.js preset is
   detected automatically, so no settings need changing.
3. Deploy. Vercel serves `out/` and shows `404.html` for unknown URLs automatically.

Using the CLI instead: `npm i -g vercel`, then run `vercel` (preview) or `vercel --prod` (production).

## Option B: Netlify or Cloudflare Pages

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Output directory  | `out`           |
| Node.js version   | 20 or later     |

Both hosts serve `404.html` for missing pages automatically.

## Option C: Shared hosting (cPanel, Apache or nginx)

1. Run `npm run build` locally.
2. Upload the **contents** of `out/` (not the folder itself) to `public_html/` or the web root.
3. Configure the custom 404 page:
   - **Apache:** add `ErrorDocument 404 /404.html` to `.htaccess`.
   - **nginx:** add `error_page 404 /404.html;` to the server block.
4. Enable HTTPS (most panels offer free Let's Encrypt certificates) and force HTTP → HTTPS redirects.

## Configuring the custom domain naenterprises.site

All canonical URLs, the sitemap and robots.txt use **`https://naenterprises.site`** (no `www`).
Make the apex domain primary and redirect `www` to it.

1. **Add the domain at your host:** add both `naenterprises.site` and `www.naenterprises.site`
   to the project (Vercel: Project → Settings → Domains). Set the apex as primary and
   `www` to redirect to it.
2. **Create DNS records at your domain registrar,** using exactly the values your host shows. Typical values:

   | Host       | Type  | Name  | Value                                     |
   | ---------- | ----- | ----- | ----------------------------------------- |
   | Vercel     | A     | `@`   | `76.76.21.21`                             |
   | Vercel     | CNAME | `www` | `cname.vercel-dns.com`                    |
   | Netlify    | A     | `@`   | `75.2.60.5`                               |
   | Netlify    | CNAME | `www` | `<your-site>.netlify.app`                 |
   | Cloudflare | -     | -     | Add the domain under Pages → Custom domains; records are created for you |
   | Shared     | A     | `@`   | The server IP shown in your hosting panel |

   Remove any conflicting `A`, `AAAA` or `CNAME` records for `@` and `www`. Leave `MX`
   records alone so that email keeps working.
3. **Wait for DNS to update.** This usually takes minutes, but can take up to 48 hours. You
   can check progress with `nslookup naenterprises.site`.
4. **HTTPS:** Vercel, Netlify and Cloudflare issue certificates automatically once DNS resolves.
5. **Search engines:** add the domain in Google Search Console and submit
   `https://naenterprises.site/sitemap.xml`.

## Checking a deployment

- `https://naenterprises.site/robots.txt` lists the sitemap URL.
- `https://naenterprises.site/sitemap.xml` lists every page.
- `https://www.naenterprises.site` redirects to the apex domain.
- A made-up URL such as `/does-not-exist/` shows the custom 404 page and returns HTTP status 404.

## Changing the domain later

Update `url` in `src/content/site.ts`. Canonical URLs, Open Graph tags, structured data,
sitemap.xml and robots.txt are all generated from that one value.
