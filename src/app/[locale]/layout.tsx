import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { RootDocument } from "../root-document";
import { routing } from "@/i18n/routing";
import { profile } from "@/config/profile";
import { getCanonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Site" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    authors: [{ name: profile.fullName, url: getCanonicalUrl("/about", locale) }],
    creator: profile.fullName,
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }>; }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <RootDocument lang={locale}>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </RootDocument>
  );
}
