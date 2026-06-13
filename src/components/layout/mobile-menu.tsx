"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { useMobileMenu } from "./mobile-menu-context";

const FOCUSABLE_SELECTORS =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

export function MobileMenu() {
  const { open, close } = useMobileMenu();
  const t = useTranslations("Nav");
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const container = menuRef.current;
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trapFocus);
    };
  }, [open, close]);

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("mobileMenu")}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      className={`xs:hidden fixed inset-0 z-[100] bg-[var(--background)] transition-[opacity,visibility] duration-300 ease-out ${open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
    >
      <div className="flex h-[52px] items-center justify-end px-4">
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={t("closeMenu")}
          onClick={close}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--button-bg)] text-[var(--foreground)] cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover)]"
        >
          <CloseIcon />
        </button>
      </div>
      <nav aria-label={t("mobileNav")} className="flex flex-col gap-1 px-4 py-2">
        {siteConfig.navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="block px-2 py-3 text-[16px] font-medium text-[var(--foreground)] no-underline border-b border-[var(--divider)] transition-opacity duration-200 hover:opacity-60"
          >
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
