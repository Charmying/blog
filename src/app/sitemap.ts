import { MetadataRoute } from 'next';
import { getAllPosts, getAllPostSlugs } from '@/lib/posts';
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
        alternates,
      },
      {
        url: enUrl,
        lastModified: new Date(),
        alternates,
      },
    );
  }

  const zhPosts = getAllPosts('zh-TW' as Locale);
  const enSlugs = new Set(
    getAllPostSlugs('en' as Locale).map((p) => p.slugParts.join('/')),
  );

  const articleEntries: MetadataRoute.Sitemap = [];

  for (const post of zhPosts) {
    const zhUrl = `${siteUrl}/articles/${post.slug}`;
    const hasEn = enSlugs.has(post.slug);
    const enUrl = `${siteUrl}/en/articles/${post.slug}`;

    const alternates = {
      languages: {
        'zh-TW': zhUrl,
        ...(hasEn ? { 'en': enUrl } : {}),
        'x-default': zhUrl,
      } as Record<string, string>,
    };

    articleEntries.push({
      url: zhUrl,
      lastModified: new Date(post.date),
      alternates,
    });

    if (hasEn) {
      articleEntries.push({
        url: enUrl,
        lastModified: new Date(post.date),
        alternates,
      });
    }
  }

  return [...staticPageEntries, ...articleEntries];
}
