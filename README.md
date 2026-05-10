# PreciseHire — Developer Handoff

This is the codebase for the new **precisehire.com** marketing site, designed to replace the existing WordPress site while preserving 20+ years of accumulated SEO equity. The redesign was modeled visually after [GoodHire](https://www.goodhire.com/) and rebuilt on a modern frontend stack with full sitemap, schema, and metadata coverage.

The site is currently published on a Manus-hosted preview at `precisehire-hnyykv3t.manus.space`. Cutover to the live precisehire.com domain is the responsibility of the receiving developer.

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | Vite 7 + React 19 (SPA, client-side routed) |
| Routing | [Wouter](https://github.com/molefrog/wouter) — patched, lightweight |
| Styling | Tailwind CSS 4 + shadcn/ui primitives |
| Animation | Framer Motion 12 |
| Markdown | Streamdown (used to render lazily-loaded blog bodies) |
| Forms | Plain `fetch` POST to a Formspree endpoint (already wired) |
| Package manager | pnpm 10 (required — `package.json` declares it) |
| Build target | Static — output is a `dist/public/` folder of HTML/JS/CSS |

There is no backend at this time. The `server/` directory contains a tiny Express helper used only by Manus tooling and does **not** need to run in production.

---

## 2. Local development

```bash
# install
pnpm install

# run dev server (port 3000)
pnpm dev

# typecheck
pnpm check

# production build (static output)
pnpm build
```

Production output lands in `dist/public/`. Deploy that folder to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, plain nginx).

---

## 3. Repository map

```
client/
  index.html                  Vite entry; Google Fonts (Fraunces, Inter) loaded here
  public/
    brand/                    Logo asset(s) (bundled, served from /brand/...)
    posts/                    240 migrated blog posts as standalone .md files
    sitemap.xml               269 canonical URLs
    robots.txt                Crawl directives
  src/
    App.tsx                   Wouter routes
    main.tsx                  React entry
    index.css                 Design tokens (palette, typography, prose styles)
    components/
      site/                   Header, Footer, SiteLayout, SEO, Reveal, StatCounter
      ui/                     shadcn/ui primitives
    content/
      site.ts                 ★ All site copy (services, pricing, FAQ, contact info, NAV, ASSETS)
      posts.ts                ★ 7 hand-written blog articles + helpers (findPost, relatedPosts, ALL_POSTS_INDEX, getInlineMarkdown)
      migrated_posts.ts       ★ Lightweight index of 240 migrated WP posts (no body)
    pages/                    One file per route (Home, Services, Pricing, About, Resources, ResourcePost, etc.)
REDIRECTS.json                ★ 240 old WP slugs → new /resources/ paths (USE THIS BEFORE DNS CUTOVER)
vercel.json                   Vercel build + SPA rewrite config
package.json                  Dependencies + scripts
```

The three files marked ★ are where 95% of content edits happen. They're plain TypeScript objects/arrays — no CMS, no database, no API.

---

## 4. Content model

### Site copy (`client/src/content/site.ts`)

Single source of truth for company info, navigation, services, pricing tiers, industries, FAQ, and asset URLs:

```ts
export const COMPANY = { name, legalName, phone, email, address, ... }
export const ASSETS  = { logoIcon, hero, swoosh*, service*, ... }
export const NAV     = [{ label, href }, ...]
export const SERVICES = [{ slug, name, hero, summary, ... }, ...]
export const PRICING_TIERS = [...]
export const INDUSTRIES = [...]
export const FAQ_ITEMS = [...]
```

Editing site copy = editing this file. The change propagates everywhere it's referenced.

### Blog posts

There are two stores that get merged into one combined index at runtime:

- **`posts.ts`** — 7 hand-written, SEO-targeted articles. Each has `markdown` inline.
- **`migrated_posts.ts`** — 240 articles migrated from the old WordPress site. Index-only; the body lives at `client/public/posts/<slug>.md` and is fetched lazily by `ResourcePost.tsx` via `fetch('/posts/<slug>.md')` when a visitor opens the article.

`ALL_POSTS_INDEX` (exported from `posts.ts`) merges both stores and is what the Resources page paginates and filters over.

To add a new blog post by hand:

1. Append a new `Post` object to `POSTS` in `posts.ts` with inline `markdown`, OR
2. Append a `MigratedPost` index entry in `migrated_posts.ts` and drop a matching `<slug>.md` into `client/public/posts/`.

Both styles work; both appear in the unified index.

---

## 5. SEO foundation (don't break these)

The whole point of the redesign is preserving and improving SEO. These pieces matter:

| Element | Where it lives |
|---|---|
| Per-page `<title>` and `<meta name="description">` | `<SEO>` component (`client/src/components/site/SEO.tsx`) used in every page |
| Canonical URLs | Set in each page via `<SEO canonical={...}>` — they all use `https://precisehire.com/...` |
| OpenGraph / Twitter cards | Same `<SEO>` component |
| JSON-LD schema | Inline `<script type="application/ld+json">` in each page (Organization, Service, BlogPosting, BreadcrumbList, FAQPage) |
| Sitemap | `client/public/sitemap.xml` — static file with all 269 URLs |
| Robots | `client/public/robots.txt` |

After deploy, **submit the sitemap to Google Search Console immediately**: `https://precisehire.com/sitemap.xml`.

---

## 6. ⚠️ The 301 redirect map (most important step)

`REDIRECTS.json` at the repo root contains 240 entries mapping old WordPress URLs to their new locations on this site. **You must add these as 301 redirects before pointing precisehire.com DNS at the new deploy.**

Format:

```json
[
  { "from": "/some-old-wp-slug", "to": "/resources/clean-new-slug" },
  ...
]
```

### For Vercel

Add a `redirects` array to `vercel.json`:

```js
// Example — generate the full array from REDIRECTS.json at build time
{
  "redirects": [
    { "source": "/some-old-wp-slug", "destination": "/resources/clean-new-slug", "permanent": true },
    // ...238 more
  ]
}
```

A small build-time script can read `REDIRECTS.json` and emit the rewritten `vercel.json`. See `scripts/build-redirects.mjs` if you want to add one.

### For nginx

```nginx
rewrite ^/some-old-wp-slug$ /resources/clean-new-slug permanent;
```

### Why this matters

Your domain has 20+ years of search authority. A meaningful percentage of incoming traffic comes from external links and Google results pointing at the old WP URLs. Without 301s, every one of those becomes a 404 on cutover day, and Google will start treating the domain as broken — meaning **measurable, sometimes permanent, traffic loss**.

---

## 7. Forms

The contact form (`client/src/pages/Contact.tsx`) submits via a real `fetch` POST to:

```
https://formspree.io/f/xnjworvg
```

Submissions deliver to `Mark@precisehire.com`. The form includes a honeypot anti-spam field (`_gotcha`) and a generated `_subject` line. Spam protection level can be increased in the Formspree dashboard (reCAPTCHA, allowed domains, rate limiting).

> **Important:** The Formspree form's *delivery* email address is set in the Formspree dashboard, not in this codebase. After changing the contact email here, log in to Formspree (form `xnjworvg`) and update the recipient address so submissions actually land in the new inbox.

If you ever migrate off Formspree, the change is one line — just update the `FORM_ENDPOINT` constant in `Contact.tsx`.

---

## 8. Deployment notes

### Recommended path: Vercel

1. Connect this GitHub repo to a new Vercel project
2. Vercel auto-detects Vite — no config needed beyond what's already in `vercel.json`
3. Set environment variables (none required for the static site, but if you add any later they'd go here)
4. Add the redirect rules from `REDIRECTS.json` (see §6)
5. Add `precisehire.com` and `www.precisehire.com` as custom domains
6. Update DNS (A record + CNAME) at your registrar to point at Vercel
7. Set the apex → www (or www → apex) redirect in Vercel's domain settings, whichever you prefer

### Alternative: any static host

`pnpm build` produces a `dist/public/` folder. Upload its contents to any static host. Make sure the host serves `index.html` for unmatched paths (SPA fallback), and add the redirect rules per the host's syntax.

---

## 9. Brand and design system

| Token | Value | Use |
|---|---|---|
| `#0B1F3A` | Deep navy | Primary text, headlines, footer background |
| `#B7232A` | Brand red | CTA buttons, accents, the underline mark |
| `#FAF7F2` | Cream | Page background |
| `#0B1F3A` at 6–10% opacity | Light gray | Borders, dividers, subtle backgrounds |
| Fraunces (variable) | Display serif | Headlines, page titles |
| Inter (400/500/600) | Sans body | Body copy, UI |

Avoid the temptation to "brighten" or "modernize" by adding teal/green/violet — the navy + red palette is intentional and brand-consistent. If a new section needs a third color, prefer cream tints, navy at varying opacities, or a subtle gold (`#C8A957`) only if absolutely required.

---

## 10. What to do first, in order

1. Clone the repo, `pnpm install`, `pnpm dev`, confirm it runs locally on `localhost:3000`
2. Read `client/src/content/site.ts` to understand the content model
3. Open Vercel, connect the repo, and ship a preview deploy
4. Write a small build-time script that converts `REDIRECTS.json` into `vercel.json` redirects, OR add them by hand
5. Add `precisehire.com` as a custom domain in Vercel — but **don't** flip DNS yet
6. Once the preview at `precisehire.com.vercel.app` (or similar) looks good and redirects test correctly, schedule the cutover
7. On cutover day, update DNS, immediately submit the sitemap to Google Search Console, and watch error logs for 24 hours

---

## 11. Open follow-ups (nice-to-have, not required for launch)

- Replace placeholder client logo names (`Northbrook Health`, `Vector Logistics`, etc.) on the homepage with real client logos
- Replace the homepage testimonial with a real quote + headshot
- Add a real headshot/byline for blog articles (currently authored by "PreciseHire Team")
- Build out the case-study and customer-story content

---

## 12. Contacts

- **Site owner:** PreciseHire — Mark@precisehire.com — (866) 773-5486
- **Originally built by:** Manus AI agent in collaboration with the PreciseHire team
- **Form submissions:** Mark@precisehire.com (via Formspree)
- **Client portal (existing):** https://dot.precisehire.com/login.php

Last updated: 2026-05-10.
