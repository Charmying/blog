export type NavItem = {
  href: string;
  labelKey: string;
};

export const siteConfig = {
  navItems: [
    { href: "/", labelKey: "home" },
    { href: "/about", labelKey: "about" },
    { href: "/articles", labelKey: "articles" },
  ] satisfies NavItem[],
} as const;
