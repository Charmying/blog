import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { siteConfig } from "@/config/site";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <header>
        <Link href="/">{siteConfig.title}</Link>
        <MainNav />
      </header>
      <main>{children}</main>
    </div>
  );
}
