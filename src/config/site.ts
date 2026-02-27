export type NavItem = {
  href: string;
  label: string;
};

export const siteConfig = {
  title: "My Blog",
  description: "Personal blog focused on thoughts, projects, and notes.",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/articles", label: "Articles" },
  ] satisfies NavItem[],
} as const;
