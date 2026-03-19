import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getSEOConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getSEOConfig();
  const localizedStaticPages = routing.locales.flatMap((locale) => {
    const prefix = locale === 'zh-TW' ? '' : `/${locale}`;
    return [
      {
        url: `${siteUrl}${prefix}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${siteUrl}${prefix}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${siteUrl}${prefix}/articles`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];
  });

  const articlePages = routing.locales.flatMap((locale) => {
    const posts = getAllPosts(locale as Locale);
    const prefix = locale === 'zh-TW' ? '' : `/${locale}`;

    return posts.map((post) => ({
      url: `${siteUrl}${prefix}/articles/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  });

  return [...localizedStaticPages, ...articlePages];
}
