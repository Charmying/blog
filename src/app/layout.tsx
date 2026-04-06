import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import "./globals.css";
import { THEME_STORAGE_KEY, THEME_DEFAULT } from "@/config/theme";
import { generateOrganizationSchema, generateWebsiteSchema, getSEOConfig, getLocaleCode } from "@/lib/seo";

const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:"${THEME_DEFAULT}";document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`;
const seoConfig = getSEOConfig();

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.siteName,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.siteDescription,
  keywords: [
    'Charmy', 'charmying', "Charmy's Lab", 'Charmy Tseng', 'Charmy blog',
    'Charmy 部落格', 'Charmy 前端', 'Charmy 前端部落格',
    '曾韋翰',
    'frontend developer', 'frontend engineer', 'front-end developer',
    'web developer', 'web engineer',
    'frontend', 'front-end', 'web development', 'frontend development',
    'blog', 'tech blog', 'frontend blog', 'developer blog',
    '前端', '前端開發', '前端工程師', '前端部落格', '前端筆記',
    '部落格', '技術部落格', '網頁開發',
    '工程師', '前端開發者', '前端工程師部落格', '台灣前端工程師',
  ],
  authors: [{ name: seoConfig.authorName }],
  creator: seoConfig.authorName,
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    type: 'website',
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.siteName,
    description: seoConfig.siteDescription,
    images: [
      {
        url: `${seoConfig.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.siteName,
    description: seoConfig.siteDescription,
    images: [`${seoConfig.siteUrl}/og-image.png`],
    creator: seoConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-theme={THEME_DEFAULT} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta property="og:locale" content={getLocaleCode(locale)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
