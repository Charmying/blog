import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export async function SiteTitle() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Site" });

  return (
    <Link
      href="/"
      className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--foreground)] no-underline transition-opacity duration-400 ease-out hover:opacity-60"
    >
      {t("title")}
    </Link>
  );
}
