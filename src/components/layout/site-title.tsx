"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteTitle() {
  const t = useTranslations("Site");

  return (
    <Link href="/" className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--foreground)] no-underline transition-opacity duration-400 ease-out hover:opacity-60">
      {t("title")}
    </Link>
  );
}
