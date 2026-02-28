import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
