import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";

const METADATA_REGEX = /export const metadata = ({[\s\S]*?});/;

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

function getPostsDir(locale: Locale) {
  return path.join(process.cwd(), "src/posts", locale);
}

function calculateReadingTime(content: string): number {
  const text = content.replace(METADATA_REGEX, "").replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  const codeLines = (content.match(/```[\s\S]*?```/g) || []).join('\n').split('\n').length;
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

function parseMetadata(content: string, slug: string): PostMetadata {
  const match = content.replace(/^\uFEFF/, "").match(METADATA_REGEX);

  if (match) {
    try {
      const metadata = new Function(`'use strict'; return ${match[1]}`)() as Record<string, unknown>;
      return {
        slug,
        title: typeof metadata.title === "string" ? metadata.title : slug,
        date: typeof metadata.date === "string" ? metadata.date : "",
        excerpt: typeof metadata.excerpt === "string" ? metadata.excerpt : "",
        tags: Array.isArray(metadata.tags) ? metadata.tags.filter((t): t is string => typeof t === "string") : [],
        readingTime: calculateReadingTime(content),
      };
    } catch {
      /* fallback below */
    }
  }

  return {
    slug,
    title: slug,
    date: "",
    excerpt: "",
    tags: [],
    readingTime: calculateReadingTime(content),
  };
}

export function getAllPosts(locale: Locale): PostMetadata[] {
  const dir = getPostsDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      return parseMetadata(content, slug);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostSlugs(locale: Locale) {
  const dir = getPostsDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export function getPostMetadata(locale: Locale, slug: string): PostMetadata {
  const filePath = path.join(getPostsDir(locale), `${slug}.mdx`);
  const content = fs.readFileSync(filePath, "utf8");
  return parseMetadata(content, slug);
}

export function getPostContent(locale: Locale, slug: string): string {
  const filePath = path.join(getPostsDir(locale), `${slug}.mdx`);
  const content = fs.readFileSync(filePath, "utf8");
  return content.replace(/^\uFEFF/, "").replace(METADATA_REGEX, "");
}

export function getAllTags(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
