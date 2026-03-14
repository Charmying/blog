import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCanonicalUrl, getLocaleCode } from "@/lib/seo";

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
      {/* Philosophy */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-6">
              {t("philosophyTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg xs:text-xl leading-[1.5] opacity-80">
              {t("philosophySubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {([
              { titleKey: "philSimpleTitle", descKey: "philSimpleDesc", icon: "✨" },
              { titleKey: "philIntuitiveTitle", descKey: "philIntuitiveDesc", icon: "🎯" },
              { titleKey: "philCraftTitle", descKey: "philCraftDesc", icon: "🔍" },
            ] as const).map((item) => (
              <div key={item.titleKey} className="rounded-xl border p-6 text-center transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="mb-4 text-3xl">{item.icon}</div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight">{t(item.titleKey)}</h3>
                <p className="text-sm opacity-70 leading-[1.5]">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
