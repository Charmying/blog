import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import { getAllPostSlugs, getPostMetadata, getPostContent } from "@/lib/posts";
import { getSeriesName } from "@/lib/series-utils";
import { routing, type Locale } from "@/i18n/routing";
import { mdxComponents } from "@/components/article/mdx-components";
import { Comments } from "@/components/article/comments";
import {
  generateArticleMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  getCanonicalUrl,
  getLocaleCode,
  getSEOConfig,
} from "@/lib/seo";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// ─── Static generation ───────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((post) => ({
      locale,
      slug: post.slugParts,
    })),
  );
}

export const dynamicParams = false;

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug: slugParts } = await params;
  const decodedSlug = slugParts.map(decodeURIComponent).join("/");

  try {
    const post = getPostMetadata(locale as Locale, decodedSlug);
    const { authorName } = getSEOConfig();
    const metadata = generateArticleMetadata({
      title: post.title,
      description: post.excerpt,
      slug: decodedSlug,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
      locale,
      authorName,
    });
    return {
      ...metadata,
      openGraph: {
        ...metadata.openGraph,
        locale: getLocaleCode(locale),
      },
    };
  } catch {
    const t = await getTranslations({ locale, namespace: "ArticlesPage" });
    return { title: t("notFound") };
  }
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="w-3.5 h-3.5 opacity-40 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 18l6-6-6-6"
      />
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug: slugParts } = await params;
  const decodedSlug = slugParts.map(decodeURIComponent).join("/");
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ArticlesPage" });

  let post;
  let content;

  try {
    post = getPostMetadata(locale as Locale, decodedSlug);
    content = getPostContent(locale as Locale, decodedSlug);
  } catch {
    notFound();
  }

  const { authorName } = getSEOConfig();

  // ── Structured data ────────────────────────────────────────────────────────
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: decodedSlug,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
    locale,
    authorName,
  });

  // Build breadcrumb items for both JSON-LD and visual navigation
  const articlesLabel = t("title");
  const articlesUrl = getCanonicalUrl("/articles", locale);

  const breadcrumbItems: { name: string; url: string }[] = [
    { name: locale === "zh-TW" ? "首頁" : "Home", url: getCanonicalUrl("/", locale) },
    { name: articlesLabel, url: articlesUrl },
  ];
  if (post.series) {
    breadcrumbItems.push({
      name: getSeriesName(post.series, locale),
      url: getCanonicalUrl(`/articles?series=${post.series}`, locale),
    });
  }
  if (post.category) {
    breadcrumbItems.push({
      name: getSeriesName(post.category, locale),
      // Point to the series-filtered list; category-level filtering is not yet implemented
      url: getCanonicalUrl(`/articles?series=${post.series}`, locale),
    });
  }
  breadcrumbItems.push({
    name: post.title,
    url: getCanonicalUrl(`/articles/${decodedSlug}`, locale),
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  // ── Visual breadcrumb for series articles ──────────────────────────────────
  const seriesBreadcrumbs = post.series
    ? ([
        { label: articlesLabel, href: "/articles" as const },
        {
          label: getSeriesName(post.series, locale),
          href: `/articles?series=${post.series}` as const,
        },
        ...(post.category
          ? [
              {
                label: getSeriesName(post.category, locale),
                // Same series-filtered URL; category-level filtering is not yet implemented
                href: `/articles?series=${post.series}` as const,
              },
            ]
          : []),
      ] as { label: string; href: string }[])
    : null;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Header ── */}
      <header className="pt-16 xs:pt-20 sm:pt-24 pb-12 xs:pb-14 sm:pb-16 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          {seriesBreadcrumbs ? (
            // Series article: show full breadcrumb trail
            <nav
              aria-label="breadcrumb"
              className="inline-flex items-center flex-wrap justify-center gap-1.5 text-sm font-medium mb-8"
            >
              {seriesBreadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="inline-flex items-center gap-1.5">
                  {i > 0 && <ChevronRight />}
                  <Link
                    href={crumb.href}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-200 no-underline"
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          ) : (
            // Regular article: simple back button
            <Link
              href="/articles"
              className="inline-flex items-center text-sm font-medium opacity-60 hover:opacity-100 hover:-translate-x-1 transition-all duration-300 mb-8 no-underline"
            >
              <BackArrow />
              <span>{t("backToArticles")}</span>
            </Link>
          )}

          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-6 break-words">
            {post.title}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm opacity-60 mb-6">
            <time dateTime={post.date}>{post.date}</time>
            <span>{t("readingTime", { time: post.readingTime })}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-[var(--button-bg)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="mx-auto max-w-3xl px-4 py-12 xs:py-14 sm:py-16 prose-custom">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </div>

      {/* ── Comments ── */}
      <div className="mx-auto max-w-3xl px-4">
        <Comments />
      </div>

      {/* ── Footer ── */}
      <footer className="mx-auto max-w-3xl px-4 pb-16 sm:pb-20">
        <div className="border-t border-[var(--border)] pt-10">
          <Link
            href="/articles"
            className="inline-flex items-center text-[15px] sm:text-[17px] font-medium hover:opacity-60 hover:-translate-x-1 transition-all duration-300 no-underline"
          >
            <BackArrow />
            <span>{t("backToArticles")}</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
