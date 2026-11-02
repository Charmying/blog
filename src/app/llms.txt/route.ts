import type { Locale } from "@/i18n/routing";
import { profile } from "@/config/profile";
import { getAllPosts } from "@/lib/posts";
import { getCanonicalUrl, getSEOConfig } from "@/lib/seo";

export const dynamic = "force-static";

function getArticleLinks(locale: Locale): string[] {
  return getAllPosts(locale).map((post) => `- [${post.title}](${getCanonicalUrl(`/articles/${post.slug}`, locale)}): ${post.excerpt}`);
}

export function GET() {
  const { siteUrl, siteName } = getSEOConfig();

  const lines = [
    `# ${siteName}`,
    "",
    `> ${profile.description.en}`,
    "",
    `${siteName} is a bilingual blog: every article exists in Traditional Chinese (default URLs) and in English (under /en) at parallel URLs.`,
    "",
    "## About",
    "",
    `- [About ${profile.fullName}](${getCanonicalUrl("/about", "en")})`,
    `- [關於${profile.fullNameZh}](${getCanonicalUrl("/about", "zh-TW")})`,
    "",
    "## Articles (English)",
    "",
    ...getArticleLinks("en"),
    "",
    "## 文章 (繁體中文)",
    "",
    ...getArticleLinks("zh-TW"),
    "",
    "## Optional",
    "",
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
