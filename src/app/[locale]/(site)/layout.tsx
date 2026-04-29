import { MainNav } from "@/components/layout/main-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteTitle } from "@/components/layout/site-title";
import { SearchModal } from "@/components/layout/search-modal";
import { BackToTop } from "@/components/back-to-top";
import { getAllPosts, getAllTags, getAllPostSlugs } from "@/lib/posts";
import { routing, type Locale } from "@/i18n/routing";

export default async function SiteLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }>; }>) {
  const { locale } = await params;
  const posts = getAllPosts(locale as Locale);
  const tags = getAllTags(locale as Locale);
  const availableSlugs = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      getAllPostSlugs(loc).map((p) => p.slugParts.join("/")),
    ]),
  ) as Record<Locale, string[]>;

  return (
    <MobileMenuProvider>
      <div className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex h-[52px] max-w-[1200px] items-center px-4">
            <SiteTitle />
            <div className="ml-auto flex items-center gap-4">
              <MainNav />
              <SearchModal posts={posts} tags={tags} />
              <LocaleSwitcher availableSlugs={availableSlugs} />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <MobileMenu />
        <main className="mx-auto max-w-[1200px] px-4 py-6">{children}</main>
        <BackToTop />
      </div>
    </MobileMenuProvider>
  );
}
