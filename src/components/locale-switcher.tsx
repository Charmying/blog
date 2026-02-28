"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  "zh-TW": "中",
  en: "EN",
};

const ARTICLE_PATTERN = /^\/articles\/(.+)$/;

export function LocaleSwitcher({ availableSlugs }: { availableSlugs?: Record<Locale, string[]>; }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: Locale = locale === "zh-TW" ? "en" : "zh-TW";

  function handleSwitch() {
    const match = pathname.match(ARTICLE_PATTERN);
    if (match && availableSlugs) {
      const slug = decodeURIComponent(match[1]);
      const existsInTarget = availableSlugs[nextLocale]?.includes(slug);
      if (!existsInTarget) {
        router.replace("/articles", { locale: nextLocale });
        return;
      }
    }
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button type="button" onClick={handleSwitch} className="inline-flex items-center justify-center h-9 px-2.5  text-[13px] font-medium text-[var(--foreground)] cursor-pointer transition-colors duration-200">
      {localeLabels[nextLocale]}
    </button>
  );
}
