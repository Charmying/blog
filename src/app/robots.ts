import { MetadataRoute } from 'next';
import { getSEOConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getSEOConfig();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
