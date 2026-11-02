import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { profile } from '@/config/profile';

export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  twitterHandle?: string;
  githubUrl: string;
}

interface PageMetadataInput {
  locale: string;
  path: string;
  title: string;
  description: string;
  isAbsoluteTitle?: boolean;
  type?: 'website' | 'article' | 'profile';
  availableLocales?: readonly string[];
  article?: { publishedTime: string; authors: string[]; tags: string[] };
}

const seoConfig: SEOConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://charmying-blog.vercel.app',
  siteName: "Charmy's Lab",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@charmying',
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Charmying',
};

const LOCALE_MAP: Record<string, string> = {
  'zh-TW': 'zh_TW',
  'en': 'en_US',
};

export const DEFAULT_OG_IMAGE = {
  url: `${seoConfig.siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
};

function getLocaleCode(locale: string): string {
  return LOCALE_MAP[locale] || 'en_US';
}

export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
}

export function getCanonicalUrl(path: string, locale: string): string {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const localePath = locale === routing.defaultLocale ? cleanPath : `/${locale}${cleanPath}`;
  return `${seoConfig.siteUrl}${localePath}`;
}

export function getAlternateLanguages(path: string, locales: readonly string[] = routing.locales): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, getCanonicalUrl(path, locale)])),
    'x-default': getCanonicalUrl(path, routing.defaultLocale),
  };
}

export function generatePageMetadata({
  locale,
  path,
  title,
  description,
  isAbsoluteTitle = false,
  type = 'website',
  availableLocales = routing.locales,
  article,
}: PageMetadataInput): Metadata {
  const url = getCanonicalUrl(path, locale);

  return {
    title: isAbsoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: getAlternateLanguages(path, availableLocales),
    },
    openGraph: {
      type,
      url,
      siteName: seoConfig.siteName,
      title,
      description,
      locale: getLocaleCode(locale),
      alternateLocale: availableLocales.filter((item) => item !== locale).map(getLocaleCode),
      images: [{ ...DEFAULT_OG_IMAGE, alt: title, type: 'image/png' }],
      ...(type === 'article' && article),
      ...(type === 'profile' && { firstName: profile.givenName, lastName: profile.familyName, username: profile.handle }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
      creator: seoConfig.twitterHandle,
    },
  };
}

export function getSEOConfig(): SEOConfig {
  return seoConfig;
}
