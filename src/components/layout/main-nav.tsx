"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { useMobileMenu } from "./mobile-menu-context";

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export function MainNav() {
  const { toggle } = useMobileMenu();
  const t = useTranslations("Nav");

  return (
    <>
      <nav className="hidden xs:flex items-center gap-6">
        {siteConfig.navItems.map((item) => (
          <Link key={item.href} href={item.href} className="text-[14px] font-medium text-[var(--foreground)] no-underline transition-opacity duration-400 ease-out hover:opacity-60">
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
      <button type="button" className="order-1 xs:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--button-bg)] text-[var(--foreground)] cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover)]" onClick={toggle}>
        <MenuIcon />
      </button>
    </>
  );
}
