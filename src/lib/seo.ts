import type { Metadata } from 'next';

export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  siteDescription: string;
  twitterHandle?: string;
  authorName?: string;
  githubUrl?: string;
}

export interface ArticleSEOProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  readingTime: number;
  locale: string;
  authorName?: string;
}

const seoConfig: SEOConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://charmying-blog.vercel.app',
  siteName: "Charmy's Lab",
  siteDescription: 'Personal blog focused on thoughts, projects, and notes.',
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@charmying',
  authorName: 'Charmy',
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Charmying',
};

const LOCALE_MAP: Record<string, string> = {
  'zh-TW': 'zh_TW',
  'en': 'en_US',
};

export function getLocaleCode(locale: string): string {
  return LOCALE_MAP[locale] || 'en_US';
}

export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
}

export function getCanonicalUrl(path: string, locale: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const localePath = locale === 'zh-TW' ? `/zh-TW${cleanPath}` : cleanPath;
  return getFullUrl(localePath);
}

export function generateArticleSchema(props: ArticleSEOProps) {
  const url = getCanonicalUrl(`/articles/${props.slug}`, props.locale);
  const datePublished = new Date(props.date).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    image: getFullUrl('/og-image.png'),
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: props.authorName || seoConfig.authorName,
      url: getFullUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: getFullUrl('/favicon_io/favicon-32x32.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: props.tags.join(', '),
    inLanguage: props.locale,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: getFullUrl('/favicon_io/favicon-32x32.png'),
    description: seoConfig.siteDescription,
    sameAs: [
      seoConfig.githubUrl,
    ],
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoConfig.authorName,
    url: getFullUrl('/about'),
    jobTitle: 'Frontend Developer',
    image: getFullUrl('/Charmy.png'),
    description: 'Frontend developer passionate about React, Next.js, and modern web technologies',
    sameAs: [
      seoConfig.githubUrl,
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/articles?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateArticleMetadata(props: ArticleSEOProps): Metadata {
  const url = getCanonicalUrl(`/articles/${props.slug}`, props.locale);
  const authorName = props.authorName || seoConfig.authorName;

  return {
    title: props.title,
    description: props.description,
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': getCanonicalUrl(`/articles/${props.slug}`, 'zh-TW'),
        'en': getCanonicalUrl(`/articles/${props.slug}`, 'en'),
      },
    },
    keywords: props.tags,
    authors: [{ name: authorName }],
    openGraph: {
      title: props.title,
      description: props.description,
      url,
      type: 'article',
      publishedTime: new Date(props.date).toISOString(),
      authors: authorName,
      tags: props.tags,
      images: [
        {
          url: getFullUrl('/og-image.png'),
          width: 1200,
          height: 630,
          alt: props.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: [getFullUrl('/og-image.png')],
      creator: seoConfig.twitterHandle,
    },
  };
}

export function getSEOConfig(): SEOConfig {
  return seoConfig;
}
