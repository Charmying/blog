"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  "zh-TW": "中",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: Locale = locale === "zh-TW" ? "en" : "zh-TW";

  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button type="button" onClick={handleSwitch} className="inline-flex items-center justify-center h-9 px-2.5 rounded-full border border-[var(--border)] bg-[var(--button-bg)] text-[13px] font-medium text-[var(--foreground)] cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover)]">
      {localeLabels[nextLocale]}
    </button>
  );
}
