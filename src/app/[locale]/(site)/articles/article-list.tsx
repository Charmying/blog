"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostMetadata } from "@/lib/posts";

interface ArticleListProps {
  posts: PostMetadata[];
  tags: string[];
}

export function ArticleList({ posts, tags }: ArticleListProps) {
  const t = useTranslations("ArticlesPage");
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam && tags.includes(tagParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedTag(tagParam);
    }
  }, [searchParams, tags]);

  const filtered = useMemo(
    () => selectedTag ? posts.filter((p) => p.tags.includes(selectedTag)) : posts, [posts, selectedTag]
  );

  return (
    <section className="px-4 py-12 xs:py-14 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-8 xs:mb-10 sm:mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => setSelectedTag(null)} className={`text-xs sm:text-[13px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ${ !selectedTag ? "bg-[var(--accent)] text-[var(--background)]" : "bg-[var(--button-bg)] hover:bg-[var(--button-hover)]" }`}>
                {t("all")}
              </button>
              {tags.map((tag) => (
                <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} className={`text-xs sm:text-[13px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ${selectedTag === tag ? "bg-[var(--accent)] text-[var(--background)]" : "bg-[var(--button-bg)] hover:bg-[var(--button-hover)]"}`}>
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs sm:text-sm opacity-50">
              {selectedTag ? `${filtered.length} / ${posts.length}` : t("articleCount", { count: posts.length })}
            </p>
          </div>
        )}
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/articles/${encodeURIComponent(post.slug)}`} className="group block rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-6 no-underline transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-[var(--button-bg)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-2 leading-tight group-hover:opacity-80 transition-opacity duration-200">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm opacity-60 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs opacity-50">
                <time>{post.date}</time>
                <span>{t("readingTime", { time: post.readingTime })}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
