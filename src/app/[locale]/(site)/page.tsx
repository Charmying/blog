import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCanonicalUrl, getLocaleCode } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import type { Locale } from "@/i18n/routing";

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="home-article-item__chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 18l6-6-6-6" />
    </svg>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const url = getCanonicalUrl("/", locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': getCanonicalUrl("/", "zh-TW"),
        'en': getCanonicalUrl("/", "en"),
      },
    },
    openGraph: {
      locale: getLocaleCode(locale),
    },
  };
}

export default function HomePage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("HomePage");
  const recentPosts = getAllPosts(locale as Locale).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-16 xs:pt-20 sm:pt-24 pb-12 xs:pb-16 sm:pb-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl font-semibold tracking-[-0.025em] leading-[0.9] mb-6 xs:mb-8 sm:mb-10 animate-fadeIn">
            {t("heroTitle")}
          </h1>
          <p className="text-xl xs:text-2xl sm:text-3xl leading-[1.2] opacity-70 font-light animate-fadeIn">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>
      {/* Introduction */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[0.95] mb-6">
            <span>{t("introHeading")}</span>
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#7C3AED] dark:from-[#C4B5FD] dark:via-[#A78BFA] dark:to-[#8B5CF6] bg-clip-text text-transparent font-medium">
              {t("introHighlight")}
            </span>
          </h2>
          <div className="mx-auto mb-8 max-w-2xl space-y-3">
            <p className="text-lg xs:text-xl leading-[1.5] opacity-85">{t("introDesc")}</p>
            <p className="text-base leading-[1.6] opacity-70">{t("introSubDesc")}</p>
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold no-underline transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
            <span>{t("learnMore")}</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
      {/* Latest Articles */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-baseline justify-between mb-10 xs:mb-12">
            <h2 className="text-2xl xs:text-3xl font-semibold tracking-[-0.02em]">
              {t("latestTitle")}
            </h2>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-medium no-underline opacity-40 hover:opacity-80 transition-opacity duration-200"
            >
              <span>{t("viewAll")}</span>
              <ArrowIcon />
            </Link>
          </div>
          <div className="home-article-list">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/articles/${encodeURIComponent(post.slug)}`}
                className="home-article-item"
              >
                <div className="home-article-item__content">
                  <div className="home-article-item__header">
                    <div className="home-article-item__tags">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="home-article-item__tag">{tag}</span>
                      ))}
                    </div>
                    <time className="home-article-item__date">{post.date}</time>
                  </div>
                  <h3 className="home-article-item__title">{post.title}</h3>
                  {post.excerpt && (
                    <div className="home-article-item__footer">
                      <p className="home-article-item__excerpt">{post.excerpt}</p>
                      <span className="home-article-item__reading-time">
                        {t("readingTime", { time: post.readingTime })}
                      </span>
                    </div>
                  )}
                </div>
                <ChevronRightIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
