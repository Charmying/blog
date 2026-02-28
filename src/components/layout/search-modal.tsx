"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { PostMetadata } from "@/lib/posts";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

interface SearchModalProps {
  posts: PostMetadata[];
  tags: string[];
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center justify-center w-9 h-9 text-[var(--foreground)] cursor-pointer transition-colors duration-200">
      <SearchIcon className="w-[18px] h-[18px]" />
    </button>
  );
}

export function SearchModal({ posts, tags }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const t = useTranslations("Search");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)),
    ).slice(0, 5);
  }, [query, posts]);

  const matchedTags = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tags.filter((tag) => tag.toLowerCase().includes(q)).slice(0, 8);
  }, [query, tags]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
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

  const contentRef = useRef<HTMLDivElement>(null);

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setOpen(false);
      setQuery("");
    }
  };

  const navigate = (path: string) => {
    setOpen(false);
    setQuery("");
    router.push(path);
  };

  const hasResults = results.length > 0 || matchedTags.length > 0;

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      {open && (
        <div onMouseDown={handleBackdropMouseDown} className="fixed h-[100vh] inset-0 z-[200] bg-black/60 backdrop-blur-sm">
          <div className="mx-auto max-w-[600px] px-4 mt-[15vh]">
            <div ref={contentRef} className="rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] shadow-[0_8px_32px_var(--shadow)]">
              <div className="flex items-center gap-3 px-5 border-b border-[var(--border)]">
                <SearchIcon className="w-5 h-5 opacity-40 flex-shrink-0" />
                <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("placeholder")} className="w-full py-4 text-[15px] outline-none bg-transparent placeholder:opacity-50" />
                <button onClick={() => { setOpen(false); setQuery(""); }} className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200">
                  <CloseIcon className="w-4 h-4 opacity-60" />
                </button>
              </div>
              {hasResults && (
                <div className="max-h-[50vh] overflow-y-auto">
                  {matchedTags.length > 0 && (
                    <div className="p-4 border-b border-[var(--border)]">
                      <div className="text-[12px] opacity-50 mb-3 uppercase tracking-wide font-medium">
                        {t("tags")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchedTags.map((tag) => (
                          <button key={tag} onClick={() => navigate(`/articles?tag=${encodeURIComponent(tag)}`,)} className="text-[12px] px-3 py-1.5 rounded-full bg-[var(--button-bg)] hover:opacity-60 transition-opacity duration-300 cursor-pointer">
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
                        <button key={item.slug} onClick={() => navigate(`/articles/${encodeURIComponent(item.slug)}`,)} className="w-full text-left p-3 rounded-xl hover:bg-[var(--button-bg)] mb-2 last:mb-0 transition-colors duration-300 cursor-pointer">
                          <div className="text-[14px] font-medium mb-1">
                            {item.title}
                          </div>
                          {item.excerpt && (
                            <div className="text-[12px] opacity-60 line-clamp-1">
                              {item.excerpt}
                            </div>
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
      )}
    </>
  );
}
