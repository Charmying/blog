import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import { getAllPostSlugs, getPostMetadata, getPostContent } from "@/lib/posts";
import { routing, type Locale } from "@/i18n/routing";
import { mdxComponents } from "@/components/article/mdx-components";
import { Comments } from "@/components/article/comments";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }>; }) {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const post = getPostMetadata(locale as Locale, decodedSlug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    const t = await getTranslations({ locale, namespace: "ArticlesPage" });
    return { title: t("notFound") };
  }
}

function BackArrow() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }>; }) {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
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

  return (
    <article>
      {/* Header */}
      <header className="pt-16 xs:pt-20 sm:pt-24 pb-12 xs:pb-14 sm:pb-16 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <Link href="/articles" className="inline-flex items-center text-sm font-medium opacity-60 hover:opacity-100 hover:-translate-x-1 transition-all duration-300 mb-8 no-underline">
            <BackArrow />
            <span>{t("backToArticles")}</span>
          </Link>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-6 break-words">
            {post.title}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm opacity-60 mb-6">
            <time>{post.date}</time>
            <span>{t("readingTime", { time: post.readingTime })}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-[var(--button-bg)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      {/* Content */}
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
      {/* Comments */}
      <div className="mx-auto max-w-3xl px-4">
        <Comments />
      </div>
      {/* Footer */}
      <footer className="mx-auto max-w-3xl px-4 pb-16 sm:pb-20">
        <div className="border-t border-[var(--border)] pt-10">
          <Link href="/articles" className="inline-flex items-center text-[15px] sm:text-[17px] font-medium hover:opacity-60 hover:-translate-x-1 transition-all duration-300 no-underline">
            <BackArrow />
            <span>{t("backToArticles")}</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
