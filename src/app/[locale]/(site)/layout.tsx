import { MainNav } from "@/components/layout/main-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteTitle } from "@/components/layout/site-title";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MobileMenuProvider>
      <div className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex h-[52px] max-w-[1200px] items-center px-4">
            <SiteTitle />
            <div className="ml-auto flex items-center gap-6">
              <MainNav />
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <MobileMenu />
        <main className="mx-auto max-w-[1200px] px-4 py-6">{children}</main>
      </div>
    </MobileMenuProvider>
  );
}
