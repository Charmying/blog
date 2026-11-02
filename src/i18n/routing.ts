import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh-TW", "en"],
  defaultLocale: "zh-TW",
  localePrefix: "as-needed",
  localeDetection: false,
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
