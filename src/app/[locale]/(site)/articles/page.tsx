import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getAllPosts, getAllTags, getAllSeries } from "@/lib/posts";
import type { Locale } from "@/i18n/routing";
import { ArticleList } from "./article-list";
import { getCanonicalUrl, getLocaleCode, generateBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ArticlesPage" });
  const url = getCanonicalUrl("/articles", locale);
  const isZh = locale === 'zh-TW';

  return {
    title: t("title"),
    description: t("description"),
    keywords: isZh ? ['Charmy', 'charmying', 'Charmy 部落格', '前端文章', '前端筆記', '技術文章', '前端部落格', '網路協定', '網頁開發', '技術部落格', '曾韋翰'] : ['Charmy', 'charmying', 'Charmy blog', 'Charmy Tseng', 'frontend articles', 'frontend notes', 'tech articles', 'frontend blog', 'web protocols', 'web development'],
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': getCanonicalUrl("/articles", "zh-TW"),
        'en': getCanonicalUrl("/articles", "en"),
        'x-default': getCanonicalUrl("/articles", "zh-TW"),
      },
    },
    openGraph: {
      locale: getLocaleCode(locale),
    },
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ArticlesPage" });
  const posts = getAllPosts(locale as Locale);
  const tags = getAllTags(locale as Locale);
  const series = getAllSeries(locale as Locale);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'zh-TW' ? '首頁' : 'Home', url: getCanonicalUrl('/', locale) },
    { name: t("title"), url: getCanonicalUrl('/articles', locale) },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="px-4 pt-16 xs:pt-20 sm:pt-24 pb-12 xs:pb-16 sm:pb-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.015em] leading-[1.05] mb-4 xs:mb-5 sm:mb-6 animate-fadeIn">
            {t("heroTitle")}
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl leading-[1.14] opacity-60 animate-fadeIn">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>
      <ArticleList posts={posts} tags={tags} series={series} />
    </>
  );
}
