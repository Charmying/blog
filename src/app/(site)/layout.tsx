import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/">{siteConfig.title}</Link>
        <MainNav />
        <ThemeToggle />
      </header>
      <main className="site-main">{children}</main>
    </div>
  );
}
