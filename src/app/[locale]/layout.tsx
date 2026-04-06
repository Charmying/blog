import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getCanonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Site" });
  const canonicalUrl = getCanonicalUrl("/", locale);
  const isZh = locale === 'zh-TW';

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: isZh ? ['Charmy', 'charmying', '曾韋翰', 'Charmy 部落格', '前端', '前端開發', '前端工程師', '前端部落格', '部落格', '技術部落格', '網頁開發', '台灣前端工程師'] : ['Charmy', 'charmying', 'Charmy Tseng', "Charmy's Lab", 'Charmy blog', 'frontend', 'front-end', 'frontend developer', 'frontend engineer', 'blog', 'tech blog', 'web development'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'zh-TW': getCanonicalUrl("/", "zh-TW"),
        'en': getCanonicalUrl("/", "en"),
        'x-default': getCanonicalUrl("/", "zh-TW"),
      },
    },
    openGraph: {
      siteName: t("title"),
      locale: isZh ? 'zh_TW' : 'en_US',
      alternateLocale: isZh ? 'en_US' : 'zh_TW',
    },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }>; }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
