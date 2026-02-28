import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ArticlesPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ArticlesPage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("ArticlesPage");

  return (
    <section>
      <h1>{t("heading")}</h1>
      <p>{t("content")}</p>
    </section>
  );
}
