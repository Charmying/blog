import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";

const METADATA_REGEX = /export const metadata = ({[\s\S]*?});/;

export interface PostMetadata {
  /** Full slash-joined path, e.g. "javascript-closure" or "design-patterns/creational-patterns/singleton" */
  slug: string;
  /** Individual path segments, e.g. ["design-patterns", "creational-patterns", "singleton"] */
  slugParts: string[];
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  /** Top-level series directory slug, e.g. "design-patterns". Undefined for flat posts. */
  series?: string;
  /** Second-level category directory slug, e.g. "creational-patterns". Undefined when depth < 3. */
  category?: string;
}

function getPostsDir(locale: Locale): string {
  return path.join(process.cwd(), "src/posts", locale);
}

function calculateReadingTime(content: string): number {
  const text = content.replace(METADATA_REGEX, "").replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  const codeLines = (content.match(/```[\s\S]*?```/g) || []).join("\n").split("\n").length;
  const headings = (content.match(/^#+\s/gm) || []).length;
  const lists = (content.match(/^[-*+]\s/gm) || []).length;
  const englishTime = words / 200;
  const chineseTime = chineseChars / 400;
  const baseTime = englishTime + chineseTime;
  const codeComplexity = Math.min(codeLines * 0.5, baseTime * 0.5);
  const structureBonus = (headings + lists) * 0.2;
  const totalTime = baseTime + codeComplexity + structureBonus;

  return Math.max(1, Math.ceil(totalTime));
}

function parseMetadata(
  content: string,
  slug: string,
  slugParts: string[],
): PostMetadata {
  const match = content.replace(/^\uFEFF/, "").match(METADATA_REGEX);

  // Derive series / category from directory depth
  const series = slugParts.length >= 2 ? slugParts[0] : undefined;
  const category = slugParts.length >= 3 ? slugParts[1] : undefined;

  if (match) {
    try {
      const metadata = new Function(
        `'use strict'; return ${match[1]}`,
      )() as Record<string, unknown>;
      return {
        slug,
        slugParts,
        title: typeof metadata.title === "string" ? metadata.title : slug,
        date: typeof metadata.date === "string" ? metadata.date : "",
        excerpt: typeof metadata.excerpt === "string" ? metadata.excerpt : "",
        tags: Array.isArray(metadata.tags)
          ? metadata.tags.filter((t): t is string => typeof t === "string")
          : [],
        readingTime: calculateReadingTime(content),
        series,
        category,
      };
    } catch {
      /* fallback below */
    }
  }

  return {
    slug,
    slugParts,
    title: slug,
    date: "",
    excerpt: "",
    tags: [],
    readingTime: calculateReadingTime(content),
    series,
    category,
  };
}

/**
 * Recursively collects every `.mdx` file under `dir`.
 * Returns absolute file paths.
 */
function collectMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Converts an absolute MDX file path to an array of URL-safe slug segments,
 * relative to `postsDir`.
 *
 * e.g. "/…/posts/en/design-patterns/creational-patterns/singleton.mdx"
 *      → ["design-patterns", "creational-patterns", "singleton"]
 */
function filePathToSlugParts(filePath: string, postsDir: string): string[] {
  const relative = path.relative(postsDir, filePath);
  return relative
    .replace(/\.mdx$/, "")
    .replace(/\\/g, "/")
    .split("/");
}

export function getAllPosts(locale: Locale): PostMetadata[] {
  const dir = getPostsDir(locale);
  return collectMdxFiles(dir)
    .map((filePath) => {
      const slugParts = filePathToSlugParts(filePath, dir);
      const slug = slugParts.join("/");
      const content = fs.readFileSync(filePath, "utf8");
      return parseMetadata(content, slug, slugParts);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns `{ slugParts }` for every post — used by `generateStaticParams`. */
export function getAllPostSlugs(locale: Locale): { slugParts: string[] }[] {
  const dir = getPostsDir(locale);
  return collectMdxFiles(dir).map((filePath) => ({
    slugParts: filePathToSlugParts(filePath, dir),
  }));
}

export function getPostMetadata(locale: Locale, slug: string): PostMetadata {
  const postsDir = getPostsDir(locale);
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const content = fs.readFileSync(filePath, "utf8");
  return parseMetadata(content, slug, slug.split("/"));
}

export function getPostContent(locale: Locale, slug: string): string {
  const postsDir = getPostsDir(locale);
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const content = fs.readFileSync(filePath, "utf8");
  return content.replace(/^\uFEFF/, "").replace(METADATA_REGEX, "");
}

export function getAllTags(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

/** Returns sorted unique series slugs (top-level directory names). */
export function getAllSeries(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const series = new Set<string>();
  posts.forEach((post) => {
    if (post.series) series.add(post.series);
  });
  return Array.from(series).sort();
}
