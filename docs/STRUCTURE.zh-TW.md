# 專案架構說明

[English](./STRUCTURE.md) | **繁體中文**

本文件說明專案的資料夾結構、命名規則，以及背後的設計決策。

---

## 目錄

- [整體架構](#整體架構)
- [核心目錄說明](#核心目錄說明)
- [設計決策](#設計決策)
- [命名規則](#命名規則)
- [檔案組織原則](#檔案組織原則)

---

## 整體架構

```
blog/
├── docs/                  # 專案文檔
├── messages/              # i18n 翻譯檔案
├── public/                # 靜態資源
├── src/                   # 原始碼
│   ├── app/               # Next.js App Router
│   ├── components/        # React 元件
│   ├── config/            # 設定檔
│   ├── i18n/              # 國際化設定
│   ├── lib/               # 工具函式
│   ├── posts/             # MDX 文章內容
│   └── types/             # TypeScript 型別
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 核心目錄說明

### `/docs` — 專案文檔

**職責：** 記錄專案的架構、依賴與開發規範

**內容：**
- `structure.md` — 架構說明與設計決策
- `dependencies.md` — 套件清單與選擇理由
- `development.md` — 開發環境與規範

**為什麼這樣設計：**
- 將文檔與程式碼分離，保持 README 簡潔
- 遵循「README 是入口，docs 是細節」的原則
- 方便未來維護者快速理解專案

---

### `/messages` — i18n 翻譯檔案

**職責：** 存放所有語言的翻譯資源

**結構：**
```
messages/
├── en.json       # 英文翻譯
└── zh-TW.json    # 繁體中文翻譯
```

**為什麼這樣設計：**
- 放在根目錄是 next-intl 的慣例
- JSON 格式易於編輯與版本控制
- 按語言分檔，方便管理與擴充

**翻譯鍵組織：**
```json
{
  "Site": { ... },           // 網站層級
  "Nav": { ... },            // 導航
  "HomePage": { ... },       // 首頁
  "AboutPage": { ... },      // 關於頁面
  "ArticlesPage": { ... }    // 文章頁面
}
```

---

### `/public` — 靜態資源

**職責：** 存放不需要處理的靜態檔案

**內容：**
- 圖片 (頭像、圖示等)
- favicon
- 其他靜態資源

**為什麼這樣設計：**
- Next.js 會直接提供 `/public` 下的檔案
- 不經過 webpack 處理，適合不需優化的資源
- 可直接透過 `/filename` 存取

---

### `/src/app` — Next.js App Router

**職責：** 定義應用程式的路由、佈局與頁面

**結構：**
```
app/
├── [locale]/                    # 動態語言路由
│   ├── (site)/                  # 路由群組：網站主要頁面
│   │   ├── about/               # 關於頁面
│   │   │   └── page.tsx
│   │   ├── articles/            # 文章相關頁面
│   │   │   ├── [slug]/          # 動態文章路由
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx         # 文章列表
│   │   ├── layout.tsx           # 網站佈局 (導航列等)
│   │   └── page.tsx             # 首頁
│   └── layout.tsx               # 語言層級佈局 (i18n provider)
├── globals.css                  # 全域樣式
└── layout.tsx                   # 根佈局 (HTML, body)
```

**為什麼這樣設計：**

1. **`[locale]` 動態路由**
    - 支援多語言路徑 (`/`, `/en`)
    - 使用 `localePrefix: "as-needed"` 策略，預設語言不顯示前綴

2. **`(site)` 路由群組**
    - 括號表示不影響 URL 結構
    - 將相關頁面組織在一起
    - 共用同一個 layout (導航列、footer 等)

3. **巢狀 layout**
    - 根 layout：HTML 結構、字體、theme provider
    - 語言 layout：i18n provider
    - 網站 layout：導航列、footer

4. **檔案命名**
    - `page.tsx` — 頁面元件
    - `layout.tsx` — 佈局元件
    - `loading.tsx` — 載入狀態 (未來可加)
    - `error.tsx` — 錯誤處理 (未來可加)

---

### `/src/components` — React 元件

**職責：** 存放可重用的 React 元件

**結構：**
```
components/
├── article/                       # 文章相關元件
│   ├── code-block.tsx             # 程式碼區塊
│   └── mdx-components.tsx         # MDX 自訂元件
├── layout/                        # 佈局元件
│   ├── main-nav.tsx               # 主導航列
│   ├── mobile-menu.tsx            # 行動版選單
│   ├── mobile-menu-context.tsx    # 選單狀態管理
│   ├── search-modal.tsx           # 搜尋彈窗
│   └── site-title.tsx             # 網站標題
├── locale-switcher.tsx            # 語言切換器
└── theme-toggle.tsx               # 主題切換器
```

**為什麼這樣設計：**

1. **按功能分類**
    - `article/` — 文章展示相關
    - `layout/` — 佈局結構相關
    - 根層級 — 獨立功能元件

2. **命名規則**
    - 使用 kebab-case (與 Next.js 慣例一致)
    - 檔名即元件名 (`theme-toggle.tsx` → `ThemeToggle`)

3. **元件職責**
    - 每個元件只負責一個明確的功能
    - 避免過度抽象或過度具體
    - 優先使用 Server Component，需要互動才用 Client Component

---

### `/src/config` — 設定檔

**職責：** 集中管理應用程式設定

**結構：**
```
config/
├── site.ts           # 網站設定 (導航項目、metadata 等)
└── theme.ts          # 主題設定 (storage key、預設主題)
```

**為什麼這樣設計：**
- 將設定與邏輯分離
- 方便修改與維護
- 型別安全的設定檔

**範例：**
```typescript
// site.ts
export const siteConfig = {
  navItems: [
    { href: "/", labelKey: "home" },
    { href: "/about", labelKey: "about" },
    { href: "/articles", labelKey: "articles" },
  ],
} as const;
```

---

### `/src/i18n` — 國際化設定

**職責：** 管理 i18n 相關的設定與工具

**結構：**
```
i18n/
├── navigation.ts     # i18n 導航工具 (Link, redirect 等)
├── request.ts        # 請求層級 i18n 設定
└── routing.ts        # 路由與語言設定
```

**為什麼這樣設計：**
- 遵循 next-intl 的最佳實踐
- 集中管理語言設定
- 提供型別安全的導航工具

**核心設定：**
```typescript
// routing.ts
export const routing = defineRouting({
  locales: ["zh-TW", "en"],
  defaultLocale: "zh-TW",
  localePrefix: "as-needed",
});
```

---

### `/src/lib` — 工具函式

**職責：** 存放純函式與工具邏輯

**結構：**
```
lib/
└── posts.ts    # 文章處理邏輯
```

**為什麼這樣設計：**
- 將業務邏輯與 UI 分離
- 方便測試與重用
- 保持元件簡潔

**posts.ts 職責：**
- 讀取 MDX 檔案
- 解析 metadata
- 計算閱讀時間
- 聚合標籤
- 排序與過濾

---

### `/src/posts` — MDX 文章內容

**職責：** 存放所有部落格文章

**結構：**
```
posts/
├── en/                   # 英文文章
│   ├── article-1.mdx
│   └── article-2.mdx
└── zh-TW/                # 繁體中文文章
    ├── article-1.mdx
    └── article-2.mdx
```

**為什麼這樣設計：**

1. **按語言分離**
    - 每個語言有獨立的文章目錄
    - 方便管理不同語言的內容
    - 支援語言特定的文章

2. **檔案即路由**
    - 檔名即文章 slug
    - `article-1.mdx` → `/articles/article-1`

3. **MDX 格式**
    - 支援 Markdown 語法
    - 可嵌入 React 元件
    - 靈活的內容創作

**文章結構：**
```typescript
export const metadata = {
  title: "文章標題",
  date: "2026-03-01",
  excerpt: "文章摘要",
  tags: ["React", "Next.js"],
};

// MDX 內容
```

---

### `/src/types` — TypeScript 型別

**職責：** 存放共用的型別定義

**為什麼這樣設計：**
- 集中管理型別定義
- 避免重複定義
- 提升型別安全性

**使用時機：**
- 跨多個檔案使用的型別
- 複雜的型別定義
- API 回應型別

---

## 設計決策

### 1. 為什麼使用 App Router？

**決策：** 採用 Next.js 15 的 App Router

**理由：**
- 更好的效能 (Server Components)
- 更直觀的路由與佈局系統
- 更好的 SEO 支援
- 未來的主流方向

**權衡：**
- 學習曲線較陡
- 生態系統仍在成熟中
- 但長期收益大於短期成本

---

### 2. 為什麼使用檔案式 CMS？

**決策：** 使用 MDX 檔案作為內容來源，而非資料庫

**理由：**
- 簡單：無需架設資料庫
- 版本控制：內容與程式碼一起管理
- 效能：靜態生成，無需查詢資料庫
- 靈活：MDX 支援 React 元件

**適用情境：**
- 個人部落格
- 文章更新頻率不高
- 內容由開發者管理

**不適用情境：**
- 需要非技術人員編輯
- 高頻率內容更新
- 需要複雜的內容管理功能

---

### 3. 為什麼使用 CSS Variables？

**決策：** 使用原生 CSS 變數實作主題系統

**理由：**
- 無 runtime overhead
- 瀏覽器原生支援
- 易於維護與擴充
- 支援即時切換

**替代方案：**
- CSS-in-JS (styled-components, emotion)
     - 缺點：runtime overhead, 增加 bundle size
- Tailwind 的 dark mode
    - 缺點：需要重複寫 class，不夠語意化

---

### 4. 為什麼使用 next-intl？

**決策：** 使用 next-intl 而非 next-i18next

**理由：**
- 專為 App Router 設計
- 更好的 TypeScript 支援
- 更簡潔的 API
- 更好的效能 (Server Components)

**核心功能：**
- 路由層級的語言切換
- Server/Client Component 都支援
- 型別安全的翻譯鍵

---

## 命名規則

### 檔案命名

**規則：** 使用 kebab-case

```
✅ theme-toggle.tsx
✅ main-nav.tsx
✅ search-modal.tsx

❌ ThemeToggle.tsx
❌ mainNav.tsx
❌ SearchModal.tsx
```

**理由：**
- Next.js 官方慣例
- 與路由檔案一致
- 避免大小寫問題

---

### 元件命名

**規則：** 使用 PascalCase

```typescript
✅ export function ThemeToggle() { ... }
✅ export function MainNav() { ... }

❌ export function themeToggle() { ... }
❌ export function main_nav() { ... }
```

---

### 變數與函式命名

**規則：** 使用 camelCase

```typescript
✅ const siteConfig = { ... }
✅ function getAllPosts() { ... }

❌ const SiteConfig = { ... }
❌ function GetAllPosts() { ... }
```

---

### 型別命名

**規則：** 使用 PascalCase

```typescript
✅ type PostMetadata = { ... }
✅ interface NavItem { ... }

❌ type postMetadata = { ... }
❌ interface nav_item { ... }
```

---

### 常數命名

**規則：** 使用 UPPER_SNAKE_CASE

```typescript
✅ const THEME_STORAGE_KEY = "blog-theme"
✅ const THEME_DEFAULT = "dark"

❌ const themeStorageKey = "blog-theme"
❌ const ThemeDefault = "dark"
```

---

## 檔案組織原則

### 1. 就近原則

**原則：** 檔案應該放在最接近使用它的地方

**範例：**
```
✅ components/article/code-block.tsx  # 只在文章中使用
✅ components/theme-toggle.tsx        # 多處使用，放根層級

❌ components/code-block.tsx          # 應該放在 article/ 下
```

---

### 2. 單一職責

**原則：** 每個檔案只負責一件事

**範例：**
```typescript
✅ posts.ts  # 只處理文章邏輯
✅ theme.ts  # 只處理主題設定

❌ utils.ts  # 太籠統，職責不明確
```

---

### 3. 避免過度抽象

**原則：** 不要為了抽象而抽象

**何時抽象：**
- 邏輯在 3 個以上地方重複
- 邏輯複雜且獨立
- 需要單獨測試

**何時不抽象：**
- 只用一次的邏輯
- 過度簡單的邏輯
- 抽象會降低可讀性

---

### 4. 明確的依賴關係

**原則：** 依賴關係應該是單向的

**依賴層級：**
```
app/ (頁面)
    ↓
components/ (元件)
    ↓
lib/ (工具)
    ↓
config/ (設定)
```

**禁止：**
- config 依賴 components
- lib 依賴 app
- 循環依賴

---

## 未來擴充考量

### 可能的新增目錄

```
src/
├── hooks/        # 自訂 React Hooks
├── utils/        # 通用工具函式
├── styles/       # 共用樣式檔案
├── constants/    # 常數定義
└── api/          # API 相關邏輯
```

### 何時新增目錄

**hooks/**
- 當有 3 個以上自訂 hooks
- 當 hooks 邏輯複雜且可重用

**utils/**
- 當有通用的工具函式 (非業務邏輯)
- 例如：日期格式化、字串處理等

**styles/**
- 當有共用的 CSS 模組
- 當需要更複雜的樣式組織

**constants/**
- 當有大量的常數定義
- 當常數需要分類管理

**api/**
- 當需要串接後端 API
- 當 API 邏輯變得複雜

---

## 總結

### 核心原則

1. **清晰 > 完整**
    - 結構應該一目了然
    - 不追求過度完美的分類

2. **就近 > 集中**
    - 檔案放在最接近使用的地方
    - 避免過度抽象

3. **語意 > 形式**
    - 命名應該表達意圖
    - 結構應該反映功能

4. **簡單 > 複雜**
    - 優先選擇簡單的方案
    - 只在必要時增加複雜度

### 維護建議

- 定期檢視檔案組織是否合理
- 當發現重複邏輯時考慮抽象
- 當目錄過於龐大時考慮拆分
- 保持結構的一致性

### 推翻規則的時機

當你能清楚回答以下問題時，可以推翻規則：
1. 為什麼現有結構不適合？
2. 新結構如何解決問題？
3. 新結構的長期維護成本如何？
4. 是否有更簡單的替代方案？
