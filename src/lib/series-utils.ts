/**
 * Client-safe utilities for series and category display name resolution.
 * This file must NOT import any Node.js-only modules (e.g., `fs`, `path`).
 */

/** Known localized display names for series and category directory slugs. */
const DISPLAY_NAMES: Record<string, { en: string; "zh-TW": string }> = {
  "design-patterns":     { en: "Design Patterns",     "zh-TW": "設計模式" },
  "SOLID-principles":    { en: "SOLID Principles",    "zh-TW": "SOLID 原則" },
  "creational-patterns": { en: "Creational Patterns", "zh-TW": "建立型模式" },
  "structural-patterns": { en: "Structural Patterns", "zh-TW": "結構型模式" },
  "behavioral-patterns": { en: "Behavioral Patterns", "zh-TW": "行為型模式" },
};

/**
 * Converts a kebab-case slug segment to a Title Case display name.
 * Preserves ALL-CAPS tokens (e.g. "SOLID-principles" → "SOLID Principles").
 *
 * @example
 * toDisplayName("design-patterns")   // "Design Patterns"
 * toDisplayName("SOLID-principles")  // "SOLID Principles"
 */
export function toDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Returns the localized display name for a series or category slug.
 * Falls back to `toDisplayName` when the slug is not in the known map.
 *
 * @param slug   - Directory slug, e.g. "design-patterns"
 * @param locale - Active locale, e.g. "zh-TW" or "en"
 */
export function getSeriesName(slug: string, locale: string): string {
  const names = DISPLAY_NAMES[slug];
  if (!names) return toDisplayName(slug);
  return locale === "zh-TW" ? names["zh-TW"] : names["en"];
}
