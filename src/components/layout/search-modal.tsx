"use client";

import { useState, useEffect, useRef, useMemo, useId, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { PostMetadata } from "@/lib/posts";

const FOCUSABLE_SELECTORS =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

interface SearchModalProps {
  posts: PostMetadata[];
  tags: string[];
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations("Search");
  return (
    <button
      type="button"
      aria-label={t("openSearch")}
      onClick={onClick}
      className="inline-flex items-center justify-center w-9 h-9 text-[var(--foreground)] cursor-pointer transition-colors duration-200"
    >
      <SearchIcon className="w-[18px] h-[18px]" />
    </button>
  );
}

export function SearchModal({ posts, tags }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("Search");
  const resultsId = useId();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)),
      )
      .slice(0, 5);
  }, [query, posts]);

  const matchedTags = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tags.filter((tag) => tag.toLowerCase().includes(q)).slice(0, 8);
  }, [query, tags]);

  const closeModal = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;
      const container = contentRef.current;
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [open, closeModal]);

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const navigate = (path: string) => {
    closeModal();
    router.push(path);
  };

  const hasResults = results.length > 0 || matchedTags.length > 0;
  const resultCount = results.length + matchedTags.length;

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("searchDialog")}
          onMouseDown={handleBackdropMouseDown}
          className="fixed h-[100vh] inset-0 z-[200] bg-black/60 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-[600px] px-4 mt-[15vh]">
            <div ref={contentRef} className="rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] shadow-[0_8px_32px_var(--shadow)]">
              <div className="flex items-center gap-3 px-5 border-b border-[var(--border)]">
                <SearchIcon className="w-5 h-5 opacity-40 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="search"
                  role="searchbox"
                  aria-label={t("placeholder")}
                  aria-controls={resultsId}
                  aria-autocomplete="list"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("placeholder")}
                  className="w-full py-4 text-[15px] outline-none bg-transparent placeholder:opacity-50"
                />
                <button
                  type="button"
                  aria-label={t("closeSearch")}
                  onClick={closeModal}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
                >
                  <CloseIcon className="w-4 h-4 opacity-60" />
                </button>
              </div>
              <div id={resultsId} aria-live="polite" aria-relevant="additions text" aria-atomic="false">
                {query.trim() && (
                  <p className="sr-only">
                    {hasResults
                      ? t("searchResultCount", { count: resultCount })
                      : t("noResults")}
                  </p>
                )}
                {hasResults && (
                  <div className="max-h-[50vh] overflow-y-auto">
                    {matchedTags.length > 0 && (
                      <div className="p-4 border-b border-[var(--border)]">
                        <div className="text-[12px] opacity-50 mb-3 uppercase tracking-wide font-medium">
                          {t("tags")}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {matchedTags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => navigate(`/articles?tag=${encodeURIComponent(tag)}`)}
                              className="text-[12px] px-3 py-1.5 rounded-full bg-[var(--button-bg)] hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {results.length > 0 && (
                      <div className="p-4">
                        <div className="text-[12px] opacity-50 mb-3 uppercase tracking-wide font-medium">
                          {t("articles")}
                        </div>
                        {results.map((item) => (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => navigate(`/articles/${item.slug}`)}
                            className="w-full text-left p-3 rounded-xl hover:bg-[var(--button-bg)] mb-2 last:mb-0 transition-colors duration-300 cursor-pointer"
                          >
                            <div className="text-[14px] font-medium mb-1">{item.title}</div>
                            {item.excerpt && (
                              <div className="text-[12px] opacity-60 line-clamp-1">{item.excerpt}</div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {query.trim() && !hasResults && (
                  <div className="p-8 text-center">
                    <p className="text-sm opacity-50">{t("noResults")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
