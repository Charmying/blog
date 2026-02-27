import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MobileMenuProvider>
      <div className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex h-[52px] max-w-[1200px] items-center px-4">
            <Link href="/" className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--foreground)] no-underline transition-opacity duration-400 ease-out hover:opacity-60">
              {siteConfig.title}
            </Link>
            <div className="ml-auto flex items-center gap-6">
              <MainNav />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <MobileMenu />
        <main className="mx-auto max-w-[1200px] px-4 py-6">
          {children}
        </main>
      </div>
    </MobileMenuProvider>
  );
}
