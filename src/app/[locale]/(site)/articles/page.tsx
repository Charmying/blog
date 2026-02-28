import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getAllPosts, getAllTags } from "@/lib/posts";
import type { Locale } from "@/i18n/routing";
import { ArticleList } from "./article-list";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ArticlesPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ArticlesPage" });
  const posts = getAllPosts(locale as Locale);
  const tags = getAllTags(locale as Locale);

  return (
    <>
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
      <ArticleList posts={posts} tags={tags} />
    </>
  );
}
