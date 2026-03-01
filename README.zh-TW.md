# Blog

[English](./README.md) | **繁體中文**

現代化的個人技術部落格平台，採用 Next.js 15+ 與 React 19 構建，支援多語言與深色模式，專注於提供優雅的閱讀體驗與高效的內容管理。

---

## 🚀 快速開始

```bash
npm install
npm run dev
```

---

## ✨ 核心特色

### 技術亮點
- **Next.js 15+ App Router** — 採用最新 App Router 架構與 React Server Components
- **React 19 Compiler** — 啟用 React Compiler 自動優化效能
- **MDX 內容系統** — 基於檔案的 MDX 文章管理，支援豐富的互動元件
- **多語言支援** — 完整的 i18n 實作 (繁體中文 / English)
- **深色模式** — 精心設計的明暗主題切換系統
- **語法高亮** — 整合 highlight.js 提供專業的程式碼展示

### 使用者體驗
- **響應式設計** — 完整支援桌面、平板與行動裝置
- **流暢動畫** — 細膩的過場動畫與互動回饋
- **閱讀優化** — 針對長文閱讀優化的排版與字體系統
- **搜尋功能** — 即時搜尋文章與標籤
- **閱讀時間** — 自動計算文章閱讀時間
- **留言系統** — 基於 GitHub Discussions 的 Giscus 留言功能

---

## 🏗️ 架構特點

### 現代化 Next.js 模式
- **App Router** — 基於檔案系統的路由與佈局
- **Server Components** — 預設使用 RSC 提升效能
- **Route Groups** — 使用 `(site)` 組織路由結構
- **Dynamic Routes** — 動態語言路由 `[locale]`
- **Metadata API** — SEO 友善的 metadata 管理

### 內容管理系統
- **檔案式 CMS** — MDX 檔案直接作為內容來源
- **Metadata 提取** — 自動解析文章 metadata
- **多語言內容** — 按語言分離的文章目錄結構
- **標籤系統** — 自動聚合與分類標籤
- **閱讀時間計算** — 智慧計算中英文混合內容

---

## 📁 專案結構

```
blog/
├── docs/                             # 專案文檔
│   ├── structure.md                  # 架構說明與設計決策
│   ├── dependencies.md               # 套件清單與選擇理由
│   └── development.md                # 開發環境與規範
├── messages/                         # i18n 翻譯檔案
│   ├── en.json                       # 英文翻譯
│   └── zh-TW.json                    # 繁體中文翻譯
├── public/                           # 靜態資源
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # 動態語言路由
│   │   │   ├── (site)/               # 網站主要頁面群組
│   │   │   │   ├── about/            # 關於頁面
│   │   │   │   ├── articles/         # 文章列表與詳情
│   │   │   │   ├── layout.tsx        # 網站佈局
│   │   │   │   └── page.tsx          # 首頁
│   │   │   └── layout.tsx            # 語言層級佈局
│   │   ├── globals.css               # 全域樣式與設計 tokens
│   │   └── layout.tsx                # 根佈局
│   ├── components/                   # React 元件
│   │   ├── article/                  # 文章相關元件
│   │   │   ├── code-block.tsx        # 程式碼區塊
│   │   │   ├── comments.tsx          # 留言元件
│   │   │   └── mdx-components.tsx    # MDX 自訂元件
│   │   ├── layout/                   # 佈局元件
│   │   │   ├── main-nav.tsx          # 主導航列
│   │   │   ├── mobile-menu.tsx       # 行動版選單
│   │   │   ├── search-modal.tsx      # 搜尋彈窗
│   │   │   └── site-title.tsx        # 網站標題
│   │   ├── locale-switcher.tsx       # 語言切換器
│   │   └── theme-toggle.tsx          # 主題切換器
│   ├── config/                       # 設定檔
│   │   ├── site.ts                   # 網站設定 (導航項目等)
│   │   └── theme.ts                  # 主題設定
│   ├── i18n/                         # 國際化設定
│   │   ├── navigation.ts             # i18n 導航工具
│   │   ├── request.ts                # 請求層級 i18n
│   │   └── routing.ts                # 路由與語言設定
│   ├── lib/                          # 工具函式
│   │   └── posts.ts                  # 文章處理邏輯
│   ├── posts/                        # MDX 文章內容
│   │   ├── en/                       # 英文文章
│   │   └── zh-TW/                    # 繁體中文文章
│   └── types/                        # TypeScript 型別定義
├── .gitignore                        # Git 忽略清單
├── eslint.config.mjs                 # ESLint 設定
├── next.config.ts                    # Next.js 設定
├── package.json                      # 專案依賴與腳本
├── postcss.config.mjs                # PostCSS 設定
├── tsconfig.json                     # TypeScript 設定
└── README.md
```

---

## 🎨 設計系統

### 語意化色彩系統
專案採用 CSS 變數驅動的語意化色彩系統，定義於 `src/app/globals.css`：

- **Surface Tokens** — 背景色階層 (background, card-bg, nav-bg)
- **Text Tokens** — 文字色階層 (foreground, secondary)
- **Interactive Tokens** — 互動元素 (accent, button-bg, button-hover)
- **Border Tokens** — 邊框與分隔線 (border, divider)
- **Shadow Tokens** — 陰影層級 (shadow-sm, shadow, shadow-lg)

### 主題實作
- **明暗主題** — 完整的 light/dark 主題支援
- **即時切換** — 無閃爍的主題切換體驗
- **持久化** — localStorage 儲存使用者偏好
- **CSS Variables** — 所有主題值由 CSS 自訂屬性驅動

### 樣式架構
- **Tailwind CSS v4** — 採用最新 Tailwind v4 與 `@theme` 語法
- **Fluid Typography** — 使用 clamp() 實現響應式字體
- **Custom Breakpoints** — 自訂斷點系統 (xs, sm, md, lg, xl, 2xl)
- **Design Tokens** — 統一的設計 token 管理

---

## 🌍 國際化 (i18n)

### 翻譯系統
- **next-intl** — 基於 next-intl 的完整 i18n 方案
- **結構化 Keys** — 語意化的翻譯鍵組織
- **語言持久化** — 使用者語言偏好自動儲存
- **Fallback 支援** — 優雅的預設語言回退

### 翻譯資源
```
messages/
├── en.json       # 英文翻譯
└── zh-TW.json    # 繁體中文翻譯
```

### Key 組織結構
翻譯鍵遵循結構化模式：
- `Site.*` — 網站層級資訊 (標題、描述)
- `Nav.*` — 導航項目
- `HomePage.*` — 首頁內容
- `AboutPage.*` — 關於頁面內容
- `ArticlesPage.*` — 文章頁面內容
- `Search.*` — 搜尋功能
- `CodeBlock.*` — 程式碼區塊

### 使用範例
```typescript
// 在 Server Component 中
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('HomePage');

// 在 Client Component 中
import { useTranslations } from 'next-intl';
const t = useTranslations('Nav');
```

---

## 📝 內容管理

### MDX 文章結構
每篇文章都是一個 `.mdx` 檔案，包含 metadata 與內容：

```typescript
export const metadata = {
  title: "文章標題",
  date: "2026-03-01",
  excerpt: "文章摘要",
  tags: ["React", "Next.js"],
};

// 文章內容使用 MDX 語法
```

### 文章組織
```
src/posts/
├── en/                    # 英文文章
│   ├── article-1.mdx
│   └── article-2.mdx
└── zh-TW/                 # 繁體中文文章
    ├── article-1.mdx
    └── article-2.mdx
```

### 內容功能
- **自動 Metadata 提取** — 從 MDX 檔案解析 metadata
- **閱讀時間計算** — 智慧計算中英文混合內容
- **標籤聚合** — 自動收集與分類所有標籤
- **日期排序** — 文章按日期自動排序
- **語法高亮** — 程式碼區塊自動高亮

---

## 🔧 開發工作流

### 本地開發
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start

# 執行 ESLint
npm run lint
```

### 新增文章
1. 在 `src/posts/[locale]/` 建立新的 `.mdx` 檔案
2. 加入 metadata export
3. 撰寫 MDX 內容
4. 文章會自動出現在文章列表

### 新增翻譯
1. 在 `messages/[locale].json` 加入新的翻譯鍵
2. 在元件中使用 `useTranslations()` 或 `getTranslations()`
3. 翻譯會自動根據當前語言顯示

---

## 🎯 效能優化

### 建置優化
- **React Compiler** — 自動優化 React 元件效能
- **Tree Shaking** — 移除未使用的程式碼
- **Code Splitting** — 路由層級的程式碼分割
- **Image Optimization** — Next.js 自動圖片優化

### 執行時效能
- **Server Components** — 預設使用 RSC 減少客戶端 JS
- **Static Generation** — 文章頁面靜態生成
- **Font Optimization** — 系統字體優先，無需載入外部字體
- **CSS-in-CSS** — 使用原生 CSS 變數，無 runtime overhead

---

## 📱 響應式設計

### 斷點策略
```css
--breakpoint-xs: 30rem;         /* 480px */
--breakpoint-sm: 30.0625rem;    /* 481px */
--breakpoint-md: 48rem;         /* 768px */
--breakpoint-lg: 64rem;         /* 1024px */
--breakpoint-xl: 80rem;         /* 1280px */
--breakpoint-2xl: 100rem;       /* 1600px */
```

### 裝置支援
- **行動裝置** — 優化的觸控體驗與行動版選單
- **平板支援** — 適配中等螢幕尺寸
- **桌面體驗** — 完整功能的桌面介面
- **跨瀏覽器** — 支援現代瀏覽器

---

## 📚 相關文檔

### 專案文檔
- [**架構說明**](./docs/STRUCTURE.zh-TW.md) — 資料夾結構與設計決策
- [**依賴清單**](./docs/DEPENDENCIES.zh-TW.md) — 套件說明與選擇理由
- [**開發指南**](./docs/DEVELOPMENT.zh-TW.md) — 環境設定與開發規範

### 技術文檔
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [next-intl Documentation](https://next-intl-docs.vercel.app)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## 📊 專案成熟度

**狀態：** 🟢 Active Development

- ✅ 核心功能完整
- ✅ 多語言支援
- ✅ 響應式設計
- ✅ 深色模式
- ✅ MDX 內容系統
- ✅ 留言系統 (Giscus)
- 🚧 持續優化與新增功能
