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
  siteDescription: "Charmy's personal frontend development blog — exploring web technology, engineering thinking, and developer growth. 前端工程師 Charmy (曾韋翰) 的個人部落格，分享前端開發與網頁技術心得。",
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
  const localePath = locale === 'zh-TW' ? cleanPath : `/${locale}${cleanPath}`;
  return getFullUrl(localePath);
}

export function generateArticleSchema(props: ArticleSEOProps) {
  const url = getCanonicalUrl(`/articles/${props.slug}`, props.locale);
  const datePublished = new Date(props.date).toISOString();
  const authorName = props.authorName || seoConfig.authorName;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    image: {
      '@type': 'ImageObject',
      url: getFullUrl('/og-image.png'),
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      alternateName: ['曾韋翰', 'Charmy Tseng', 'charmying'],
      url: getFullUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: getFullUrl('/favicon_io/favicon-32x32.png'),
        width: 32,
        height: 32,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: props.tags.join(', '),
    inLanguage: props.locale === 'zh-TW' ? 'zh-TW' : 'en',
    timeRequired: `PT${props.readingTime}M`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    alternateName: ["Charmy Blog", "Charmy 部落格", "Charmy 前端部落格"],
    url: seoConfig.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: getFullUrl('/favicon_io/favicon-32x32.png'),
      width: 32,
      height: 32,
    },
    description: seoConfig.siteDescription,
    founder: {
      '@type': 'Person',
      name: 'Charmy',
      alternateName: ['曾韋翰', 'Charmy Tseng', 'charmying'],
    },
    sameAs: [
      seoConfig.githubUrl,
    ],
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Charmy',
    alternateName: ['曾韋翰', 'Charmy Tseng', 'charmying'],
    url: getFullUrl('/about'),
    jobTitle: 'Frontend Developer',
    image: getFullUrl('/Charmy.png'),
    description: 'Frontend developer from Taiwan. Experienced in React, Next.js, TypeScript, Angular, Vue.js, and enterprise financial system development. 台灣前端工程師，擅長 React、Next.js、TypeScript、Angular、Vue.js。',
    nationality: {
      '@type': 'Country',
      name: 'Taiwan',
    },
    knowsAbout: [
      'Frontend Development', 'Front-end Development', 'Web Development',
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'Vue.js',
      'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS', 'Node.js',
      'UI/UX Design', 'Web Performance', 'Responsive Design',
      '前端開發', '前端工程師', '網頁開發', '前端技術',
    ],
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
    alternateName: ["Charmy Blog", "Charmy 部落格", "Charmy 前端部落格", "Charmy's Lab 前端"],
    url: seoConfig.siteUrl,
    description: seoConfig.siteDescription,
    inLanguage: ['zh-TW', 'en'],
    author: {
      '@type': 'Person',
      name: 'Charmy',
      alternateName: ['曾韋翰', 'Charmy Tseng', 'charmying'],
    },
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
        'x-default': getCanonicalUrl(`/articles/${props.slug}`, 'zh-TW'),
      },
    },
    keywords: [
      ...props.tags,
      'Charmy', 'charmying',
      props.locale === 'zh-TW' ? 'Charmy 部落格' : 'Charmy blog',
    ],
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
