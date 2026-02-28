import { getLocale } from "next-intl/server";
import "./globals.css";
import { THEME_STORAGE_KEY, THEME_DEFAULT } from "@/config/theme";

const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:"${THEME_DEFAULT}";document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-theme={THEME_DEFAULT} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
