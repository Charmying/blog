"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { useMobileMenu } from "./mobile-menu-context";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

export function MobileMenu() {
  const { open, close } = useMobileMenu();
  const t = useTranslations("Nav");

  return (
    <div className={`xs:hidden fixed inset-0 z-[100] bg-[var(--background)] transition-[opacity,visibility] duration-300 ease-out ${ open ? "visible opacity-100" : "invisible opacity-0" }`}>
      <div className="flex h-[52px] items-center justify-end px-4">
        <button type="button" onClick={close} className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--button-bg)] text-[var(--foreground)] cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover)]">
          <CloseIcon />
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-4 py-2">
        {siteConfig.navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={close} className="block px-2 py-3 text-[16px] font-medium text-[var(--foreground)] no-underline border-b border-[var(--divider)] transition-opacity duration-200 hover:opacity-60">
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
