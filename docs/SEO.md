# SEO, AEO & GEO

**English** | [繁體中文](./SEO.zh-TW.md)

How the blog is made discoverable by search engines (SEO), answer engines (AEO) and AI crawlers (GEO). Everything is generated at build time. The layout and displayed content are unchanged, except that the article list is rendered on the server instead of showing a loading skeleton first, and the English About page shows the full name "Charmy Tseng".

---

## Table of Contents

- [How It Works](#how-it-works)
- [Rendering Rules](#rendering-rules)
- [Authoring Rules](#authoring-rules)
- [Environment Variables](#environment-variables)
- [After Deploying](#after-deploying)
- [Verify](#verify)

---

## How It Works

| Concern | Where |
|---|---|
| Title, description, canonical, hreflang, Open Graph, Twitter | `generatePageMetadata()` in `src/lib/seo.ts`. Every page calls it, because Next.js replaces (not merges) `alternates` and `openGraph` from parent layouts |
| Structured data (JSON-LD) | `generateSchemaGraph()` in `src/lib/schema.ts`, rendered by `<JsonLd />`. One `@graph` per page: Person → WebSite → page → BreadcrumbList → BlogPosting, linked by stable `@id`s |
| Author identity and name variants | `src/config/profile.ts` |
| `sitemap.xml`, `robots.txt`, `llms.txt` | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts` |

---

## Rendering Rules

- **Every page is prerendered.** `src/app/[locale]/layout.tsx` sets `<html lang>` through `RootDocument` and the root layout is a pass-through, so each page is static. The root `not-found.tsx` renders its own `RootDocument` for 404 responses
- **One URL, one language.** In `src/i18n/routing.ts`, `localeDetection: false` stops `Accept-Language` redirects, so every crawler and AI fetcher gets the same page at each URL (Google advises against redirecting by language). `alternateLinks: false` keeps the proxy from adding its own host-derived `Link` hreflang header, so hreflang comes only from the metadata and the sitemap and stays correct for an article that has not been translated yet
- **The article list is in the HTML.** `useSearchParams` is isolated in a component that renders nothing inside `<Suspense>`, so crawlers receive every article link
- **Code blocks are escaped in the HTML** (`code-block.tsx`), so crawlers receive the complete code text. Highlighting is applied in the browser

---

## Authoring Rules

- A new article needs nothing besides its frontmatter. Metadata, JSON-LD, sitemap and `llms.txt` are derived from `title`, `excerpt`, `date` and `tags`
- `excerpt` becomes the meta description and the Open Graph description. Make the first sentence stand on its own
- Link to other articles with `[text](/articles/<slug>)`. The link keeps the reader's language, so the target article must exist in both languages

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin used for canonical, hreflang, sitemap and JSON-LD. No trailing slash. Defaults to `https://charmying-blog.vercel.app` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification meta tag |
| `NEXT_PUBLIC_TWITTER_HANDLE` | `twitter:creator` |
| `NEXT_PUBLIC_GITHUB_URL` | Person `sameAs` |

---

## After Deploying

1. Add the site to Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
2. Run one article through the [Rich Results Test](https://search.google.com/test/rich-results).
3. Link the blog from your GitHub profile and other profiles, and add those profile URLs to `sameAs` in `src/lib/schema.ts`.

Indexing takes days to weeks, and no change can guarantee a ranking.

---

## Verify

```bash
npm run build
```

Every route should be `●` or `○`; only `/images/[...path]` is `ƒ`.

```bash
curl -s https://charmying-blog.vercel.app/articles/web-hydration | grep -E "<title>|rel=\"canonical\"|hrefLang"
```
