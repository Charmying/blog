"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostMetadata } from "@/lib/posts";
import { useLocalStorage, useClickOutside } from "@/lib/hooks";

interface ArticleListProps {
  posts: PostMetadata[];
  tags: string[];
}

type ViewMode = "grid" | "list";
type SortBy = "date" | "title" | "readingTime";

const SORT_OPTIONS = [
  { value: "date" as const, icon: "📅", key: "sortByDate" },
  { value: "title" as const, icon: "🔤", key: "sortByTitle" },
  { value: "readingTime" as const, icon: "⏱️", key: "sortByReadingTime" },
];

export function ArticleList({ posts, tags }: ArticleListProps) {
  const t = useTranslations("ArticlesPage");
  const searchParams = useSearchParams();
  const urlTag = searchParams.get("tag");
  const activeTag = urlTag && tags.includes(urlTag) ? urlTag : null;
  const [viewMode, setViewMode, isViewLoaded] = useLocalStorage<ViewMode>("article-view-mode", "grid");
  const [sortBy, setSortBy, isSortLoaded] = useLocalStorage<SortBy>("article-sort-by", "date");
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const dropdownRef = useClickOutside<HTMLDivElement>(close);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && isOpen && close();
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen, close]);

  const sorted = useMemo(() => {
    const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts;
    return [...filtered].sort((a, b) => {
      if (sortBy === "date") return b.date.localeCompare(a.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return b.readingTime - a.readingTime;
    });
  }, [posts, activeTag, sortBy]);

  const handleSort = useCallback((value: SortBy) => {
    setSortBy(value);
    close();
  }, [setSortBy, close]);

  if (!isViewLoaded || !isSortLoaded) {
    return (
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="article-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="article-card article-card--skeleton">
                <div className="skeleton skeleton--tag" />
                <div className="skeleton skeleton--title" />
                <div className="skeleton skeleton--excerpt" />
                <div className="skeleton skeleton--meta" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 xs:py-14 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {tags.length > 0 && (
          <div className="mb-10 xs:mb-12 sm:mb-16">
            <div className="flex flex-wrap gap-2 mb-8">
              <Link href="/articles" className={`article-tag ${!activeTag ? "article-tag--active" : ""}`}>
                {t("all")}
              </Link>
              {tags.map(tag => (
                <Link key={tag} href={`/articles?tag=${encodeURIComponent(tag)}`} className={`article-tag ${activeTag === tag ? "article-tag--active" : ""}`}>
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <p className="text-sm opacity-50 font-medium tracking-tight">
                {activeTag ? `${sorted.length} / ${posts.length}` : t("articleCount", { count: posts.length })}
              </p>
              <div className="flex items-center gap-3">
                <div className="view-toggle">
                  <button onClick={() => setViewMode("grid")} className={`view-toggle__btn ${viewMode === "grid" ? "view-toggle__btn--active" : ""}`} title={t("viewGrid")}>
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                  </button>
                  <button onClick={() => setViewMode("list")} className={`view-toggle__btn ${viewMode === "list" ? "view-toggle__btn--active" : ""}`} title={t("viewList")}>
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" strokeLinecap="round"/><line x1="8" y1="12" x2="21" y2="12" strokeLinecap="round"/><line x1="8" y1="18" x2="21" y2="18" strokeLinecap="round"/><rect x="3" y="4.5" width="2" height="3" rx="0.5"/><rect x="3" y="10.5" width="2" height="3" rx="0.5"/><rect x="3" y="16.5" width="2" height="3" rx="0.5"/></svg>
                  </button>
                </div>
                <div className="sort-dropdown" ref={dropdownRef}>
                  <button onClick={() => setIsOpen(!isOpen)} className="sort-dropdown__trigger">
                    <span className="sort-dropdown__label">{t(SORT_OPTIONS.find(o => o.value === sortBy)!.key)}</span>
                    <svg className={`sort-dropdown__arrow ${isOpen ? "sort-dropdown__arrow--open" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  {isOpen && (
                    <div className="sort-dropdown__menu">
                      {SORT_OPTIONS.map(opt => (
                        <button key={opt.value} onClick={() => handleSort(opt.value)} className={`sort-dropdown__item ${sortBy === opt.value ? "sort-dropdown__item--active" : ""}`}>
                          <span className="sort-dropdown__icon">{opt.icon}</span>
                          <span className="sort-dropdown__text">{t(opt.key)}</span>
                          {sortBy === opt.value && <svg className="sort-dropdown__check" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {sorted.length === 0 ? (
          <div className="article-empty">
            <svg className="article-empty__icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="article-empty__text">{t("noArticles")}</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "article-grid" : "article-list"}>
            {sorted.map(post => viewMode === "grid" ? (
              <Link key={post.slug} href={`/articles/${encodeURIComponent(post.slug)}`} className="article-card">
                <div className="article-card__tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="article-card__tag">{tag}</span>
                  ))}
                </div>
                <h2 className="article-card__title">{post.title}</h2>
                {post.excerpt && <p className="article-card__excerpt">{post.excerpt}</p>}
                <div className="article-card__meta">
                  <time className="article-card__date">{post.date}</time>
                  <span className="article-card__divider">·</span>
                  <span className="article-card__time">{t("readingTime", { time: post.readingTime })}</span>
                </div>
              </Link>
            ) : (
              <Link key={post.slug} href={`/articles/${encodeURIComponent(post.slug)}`} className="article-row">
                <time className="article-row__date">{post.date}</time>
                <div className="article-row__content">
                  <h2 className="article-row__title">{post.title}</h2>
                  {post.excerpt && <p className="article-row__excerpt">{post.excerpt}</p>}
                </div>
                <div className="article-row__tags">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="article-row__tag">{tag}</span>
                  ))}
                </div>
                <span className="article-row__time">{t("readingTime", { time: post.readingTime })}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
