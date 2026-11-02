import type { Locale } from "@/i18n/routing";
import { profile } from "@/config/profile";
import { DEFAULT_OG_IMAGE, getCanonicalUrl, getFullUrl, getSEOConfig } from "@/lib/seo";

export type SchemaNode = Record<string, unknown>;

interface SchemaGraphInput {
  locale: string;
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "ProfilePage" | "CollectionPage";
  breadcrumbs?: { name: string; path: string }[];
  article?: { date: string; tags: string[]; readingTime: number };
}

const HOME_LABEL: Record<Locale, string> = { "zh-TW": "首頁", en: "Home" };

export function generateSchemaGraph({
  locale,
  path,
  name,
  description,
  type = "WebPage",
  breadcrumbs = [],
  article,
}: SchemaGraphInput): SchemaNode[] {
  const { siteUrl, siteName, githubUrl } = getSEOConfig();
  const localeKey = locale as Locale;
  const url = getCanonicalUrl(path, locale);
  const aboutUrl = getCanonicalUrl("/about", locale);
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.fullName,
    alternateName: profile.alternateNames,
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: aboutUrl,
    image: { "@type": "ImageObject", url: getFullUrl("/Charmy.png"), width: 1135, height: 804 },
    description: profile.description[localeKey],
    jobTitle: profile.jobTitle[localeKey],
    nationality: { "@type": "Country", name: "Taiwan" },
    knowsAbout: profile.knowsAbout,
    sameAs: [githubUrl],
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    alternateName: ["Charmy Blog", "Charmy 部落格", "Charmy 前端部落格", "Charmy's Lab 前端"],
    description: profile.description[localeKey],
    inLanguage: ["zh-TW", "en"],
    author: { "@id": personId },
  };

  const webPage = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    ...(type === "ProfilePage" && { mainEntity: { "@id": personId } }),
    ...(breadcrumbs.length > 0 && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [{ name: HOME_LABEL[localeKey], path: "/" }, ...breadcrumbs].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path, locale),
    })),
  };

  const blogPosting = article && {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: name,
    description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: { "@type": "Person", "@id": personId, name: profile.fullName, url: aboutUrl },
    publisher: { "@type": "Person", "@id": personId, name: profile.fullName, url: aboutUrl },
    image: { "@type": "ImageObject", ...DEFAULT_OG_IMAGE },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    keywords: article.tags.join(", "),
    inLanguage: locale,
    timeRequired: `PT${article.readingTime}M`,
  };

  return [
    person,
    website,
    webPage,
    ...(breadcrumbs.length > 0 ? [breadcrumbList] : []),
    ...(blogPosting ? [blogPosting] : []),
  ];
}
