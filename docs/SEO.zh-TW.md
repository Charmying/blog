# SEO、AEO 與 GEO

[English](./SEO.md) | **繁體中文**

說明部落格如何讓搜尋引擎 (SEO)、答案引擎 (AEO) 與 AI 爬蟲 (GEO) 找到並正確理解內容。所有內容都在建置時產生，畫面與顯示內容皆未改動，唯一的差別是文章列表改由伺服器端渲染，不再先顯示載入骨架，以及英文關於頁顯示完整姓名「Charmy Tseng」。

---

## 目錄

- [運作方式](#運作方式)
- [渲染規則](#渲染規則)
- [撰寫規則](#撰寫規則)
- [環境變數](#環境變數)
- [部署後](#部署後)
- [驗證](#驗證)

---

## 運作方式

| 項目 | 位置 |
|---|---|
| 標題、描述、canonical、hreflang、Open Graph、Twitter | `src/lib/seo.ts` 的 `generatePageMetadata()`。每個頁面都要呼叫它，因為 Next.js 會取代 (而不是合併) 父 layout 的 `alternates` 與 `openGraph` |
| 結構化資料 (JSON-LD) | `src/lib/schema.ts` 的 `generateSchemaGraph()`，由 `<JsonLd />` 輸出。每頁一個 `@graph`：Person → WebSite → 頁面 → BreadcrumbList → BlogPosting，以固定的 `@id` 互相關聯 |
| 作者身分與名稱變體 | `src/config/profile.ts` |
| `sitemap.xml`、`robots.txt`、`llms.txt` | `src/app/sitemap.ts`、`src/app/robots.ts`、`src/app/llms.txt/route.ts` |

---

## 渲染規則

- **所有頁面都是預先渲染。** `src/app/[locale]/layout.tsx` 透過 `RootDocument` 設定 `<html lang>`，根 layout 只傳遞 children，所以每頁都是靜態的。根目錄的 `not-found.tsx` 為 404 回應自行渲染 `RootDocument`
- **一個網址只對應一種語言。** `src/i18n/routing.ts` 中，`localeDetection: false` 停止依 `Accept-Language` 重新導向，讓每個爬蟲與 AI 抓取工具在同一個網址都拿到同一頁 (Google 也建議不要依語言自動導向)。`alternateLinks: false` 讓 proxy 不再自行加上依請求主機產生的 `Link` hreflang header，hreflang 只由 metadata 與 sitemap 提供，尚未翻譯的文章也不會出錯
- **文章列表直接在 HTML 中。** `useSearchParams` 被隔離在 `<Suspense>` 內一個不渲染任何內容的元件，爬蟲能拿到每一篇文章的連結
- **程式碼區塊在 HTML 中已跳脫** (`code-block.tsx`)，爬蟲能拿到完整的程式碼文字，上色則在瀏覽器端進行

---

## 撰寫規則

- 新增文章只需要 frontmatter。Metadata、JSON-LD、sitemap 與 `llms.txt` 都由 `title`、`excerpt`、`date`、`tags` 自動產生
- `excerpt` 會成為 meta description 與 Open Graph description，第一句話要能獨立成立
- 連到其他文章請用 `[文字](/articles/<slug>)`，連結會保持讀者目前的語言，所以目標文章必須同時存在於兩種語言

---

## 環境變數

| 變數 | 用途 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 正式站台網址，用於 canonical、hreflang、sitemap 與 JSON-LD，結尾不加斜線。預設 `https://charmying-blog.vercel.app` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console 驗證用 meta tag |
| `NEXT_PUBLIC_TWITTER_HANDLE` | `twitter:creator` |
| `NEXT_PUBLIC_GITHUB_URL` | Person 的 `sameAs` |

---

## 部署後

1. 在 Google Search Console 與 Bing Webmaster Tools 新增網站，並提交 `/sitemap.xml`。
2. 用 [Rich Results Test](https://search.google.com/test/rich-results) 測試一篇文章。
3. 在 GitHub 個人檔案與其他個人頁面放上部落格連結，並把這些個人頁面網址加進 `src/lib/schema.ts` 的 `sameAs`。

收錄需要數天到數週，任何調整都無法保證排名。

---

## 驗證

```bash
npm run build
```

所有路由都應為 `●` 或 `○`，只有 `/images/[...path]` 是 `ƒ`。

```bash
curl -s https://charmying-blog.vercel.app/articles/web-hydration | grep -E "<title>|rel=\"canonical\"|hrefLang"
```
