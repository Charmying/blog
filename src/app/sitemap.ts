import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import type { Locale } from '@/i18n/routing';
import { getSEOConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getSEOConfig();

  const staticPaths = ['', '/about', '/articles'];
  const staticPageEntries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const zhUrl = `${siteUrl}${path}`;
    const enUrl = `${siteUrl}/en${path}`;
    const alternates = {
      languages: {
        'zh-TW': zhUrl,
        'en': enUrl,
        'x-default': zhUrl,
      } as Record<string, string>,
    };

    staticPageEntries.push(
      {
        url: zhUrl,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : path === '/articles' ? 'daily' : 'monthly' as const,
        priority: path === '' ? 1 : path === '/articles' ? 0.9 : 0.8,
        alternates,
      },
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : path === '/articles' ? 'daily' : 'monthly' as const,
        priority: path === '' ? 1 : path === '/articles' ? 0.9 : 0.8,
        alternates,
      },
    );
  }

  const articleEntries: MetadataRoute.Sitemap = [];
  const zhPosts = getAllPosts('zh-TW' as Locale);

  for (const post of zhPosts) {
    const zhUrl = `${siteUrl}/articles/${post.slug}`;
    const enUrl = `${siteUrl}/en/articles/${post.slug}`;
    const alternates = {
      languages: {
        'zh-TW': zhUrl,
        'en': enUrl,
        'x-default': zhUrl,
      } as Record<string, string>,
    };

    articleEntries.push(
      {
        url: zhUrl,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates,
      },
      {
        url: enUrl,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates,
      },
    );
  }

  return [...staticPageEntries, ...articleEntries];
}
