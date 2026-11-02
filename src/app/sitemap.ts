import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { routing, type Locale } from '@/i18n/routing';
import { getAlternateLanguages, getCanonicalUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts(routing.defaultLocale);
  const slugs = Object.fromEntries(
    routing.locales.map((locale) => [locale, new Set(getAllPosts(locale).map((post) => post.slug))]),
  );

  const entries: MetadataRoute.Sitemap = [];
  const add = (path: string, locales: readonly Locale[], lastModified?: string) => {
    const languages = getAlternateLanguages(path, locales);
    for (const locale of locales) {
      entries.push({ url: getCanonicalUrl(path, locale), lastModified, alternates: { languages } });
    }
  };

  add('/', routing.locales, posts[0].date);
  add('/articles', routing.locales, posts[0].date);
  add('/about', routing.locales);

  for (const post of posts) {
    add(`/articles/${post.slug}`, routing.locales.filter((locale) => slugs[locale].has(post.slug)), post.date);
  }

  return entries;
}
