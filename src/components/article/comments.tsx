'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations('ArticlesPage');
  const initialized = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || initialized.current) return;

    const loadGiscus = () => {
      if (initialized.current || !ref.current) return;
      initialized.current = true;

      const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const lang = locale === 'zh-TW' ? 'zh-TW' : 'en';

      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'Charmying/blog');
      script.setAttribute('data-repo-id', 'R_kgDORaHqAQ');
      script.setAttribute('data-category', 'General');
      script.setAttribute('data-category-id', 'DIC_kwDORaHqAc4C3eUv');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', theme);
      script.setAttribute('data-lang', lang);
      script.setAttribute('data-loading', 'lazy');
      script.crossOrigin = 'anonymous';
      script.async = true;

      ref.current.appendChild(script);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadGiscus();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    const handleThemeChange = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('.giscus iframe');
      if (iframe?.contentWindow) {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
      }
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label={t('comments')} className="mt-16 pt-8 border-t border-(--border)">
      <div ref={ref} className="giscus" />
    </section>
  );
}
