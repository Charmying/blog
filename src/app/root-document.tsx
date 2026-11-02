import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { THEME_STORAGE_KEY, THEME_DEFAULT } from "@/config/theme";

const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:"${THEME_DEFAULT}";document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`;

export function RootDocument({ lang, children }: Readonly<{ lang: string; children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={lang} data-theme={THEME_DEFAULT} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
