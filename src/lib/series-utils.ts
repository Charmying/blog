const DISPLAY_NAMES: Record<string, { en: string; "zh-TW": string }> = {
  "design-patterns":     { en: "Design Patterns",     "zh-TW": "設計模式" },
  "SOLID-principles":    { en: "SOLID Principles",    "zh-TW": "SOLID 原則" },
  "creational-patterns": { en: "Creational Patterns", "zh-TW": "建立型模式" },
  "structural-patterns": { en: "Structural Patterns", "zh-TW": "結構型模式" },
  "behavioral-patterns": { en: "Behavioral Patterns", "zh-TW": "行為型模式" },
};

export function toDisplayName(slug: string): string {
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function getSeriesName(slug: string, locale: string): string {
  const names = DISPLAY_NAMES[slug];
  if (!names) return toDisplayName(slug);
  return locale === "zh-TW" ? names["zh-TW"] : names["en"];
}
