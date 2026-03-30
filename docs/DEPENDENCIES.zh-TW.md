# 依賴套件說明

[English](./DEPENDENCIES.md) | **繁體中文**

本文件說明專案使用的所有 npm 套件，包括用途、選擇理由與替代方案。

---

## 目錄

- [核心依賴](#核心依賴)
- [內容處理](#內容處理)
- [國際化](#國際化)
- [開發工具](#開發工具)
- [樣式工具](#樣式工具)
- [依賴關係圖](#依賴關係圖)

---

## 核心依賴

### Next.js

| 項目 | 內容 |
|------|------|
| **套件名稱** | `next` |
| **版本** | `16.1.6` |
| **用途** | React 框架，提供 SSR、SSG、路由等功能 |
| **為什麼選擇** | • 業界標準的 React 框架<br>• 優秀的效能與 SEO<br>• App Router 提供更好的開發體驗<br>• 內建圖片優化、字體優化等功能 |
| **替代方案** | • Remix — 更現代但生態系統較小<br>• Gatsby — 適合靜態網站但較重<br>• Vite + React Router — 更輕量但需自行處理 SSR |
| **核心功能** | • App Router 路由系統<br>• Server Components<br>• 靜態生成與伺服器渲染<br>• 自動程式碼分割 |

---

### React

| 項目 | 內容 |
|------|------|
| **套件名稱** | `react`, `react-dom` |
| **版本** | `19.2.3` |
| **用途** | UI 函式庫，建構使用者介面 |
| **為什麼選擇** | • 最成熟的 UI 函式庫<br>• 龐大的生態系統<br>• React 19 引入 Compiler 自動優化<br>• Server Components 提升效能 |
| **替代方案** | • Vue — 更簡單但生態系統較小<br>• Svelte — 更輕量但社群較小<br>• Solid — 效能更好但生態系統不成熟 |
| **核心功能** | • 元件化開發<br>• Virtual DOM<br>• Hooks<br>• Server Components |

---

## 內容處理

### next-mdx-remote

| 項目 | 內容 |
|------|------|
| **套件名稱** | `next-mdx-remote` |
| **版本** | `^6.0.0` |
| **用途** | 在 Next.js 中渲染 MDX 內容 |
| **為什麼選擇** | • 支援 Server Components<br>• 可自訂 MDX 元件<br>• 效能優異 (伺服器端編譯) <br>• 與 Next.js 整合良好 |
| **替代方案** | • @next/mdx — 需要在 next.config 設定，較不靈活<br>• mdx-bundler — 功能強大但設定複雜<br>• contentlayer — 功能完整但過於重量級 |
| **使用情境** | • 部落格文章渲染<br>• 在 MDX 中嵌入 React 元件<br>• 自訂程式碼區塊樣式 |

---

### remark-gfm

| 項目 | 內容 |
|------|------|
| **套件名稱** | `remark-gfm` |
| **版本** | `^4.0.1` |
| **用途** | 支援 GitHub Flavored Markdown |
| **為什麼選擇** | • 支援表格、任務清單、刪除線等<br>• GitHub 標準語法<br>• 輕量且穩定 |
| **替代方案** | • 無，這是 GFM 的標準實作 |
| **支援功能** | • 表格<br>• 任務清單<br>• 刪除線<br>• 自動連結 |

---

### rehype-slug

| 項目 | 內容 |
|------|------|
| **套件名稱** | `rehype-slug` |
| **版本** | `^6.0.0` |
| **用途** | 為標題自動加入 id |
| **為什麼選擇** | • 支援錨點連結<br>• 改善文章導航體驗<br>• 輕量且無副作用 |
| **替代方案** | • 手動加入 id — 維護成本高 |
| **使用情境** | • 文章內部連結<br>• 目錄導航<br>• 分享特定段落 |

---

### rehype-autolink-headings

| 項目 | 內容 |
|------|------|
| **套件名稱** | `rehype-autolink-headings` |
| **版本** | `^7.1.0` |
| **用途** | 為標題加入可點擊的連結 |
| **為什麼選擇** | • 改善使用者體驗<br>• 方便分享特定段落<br>• 可自訂連結樣式 |
| **替代方案** | • 手動實作 — 維護成本高 |
| **使用情境** | • 標題懸停顯示連結圖示<br>• 點擊複製連結<br>• 分享文章特定段落 |

---

### highlight.js

| 項目 | 內容 |
|------|------|
| **套件名稱** | `highlight.js` |
| **版本** | `^11.11.1` |
| **用途** | 程式碼語法高亮 |
| **為什麼選擇** | • 支援 200+ 語言<br>• 無需 runtime 編譯<br>• 可自訂主題<br>• 輕量且效能好 |
| **替代方案** | • Prism.js — 功能類似，但需要手動載入語言<br>• Shiki — 更精美但 bundle size 較大<br>• react-syntax-highlighter — 基於 Prism/highlight.js 的 React wrapper |
| **使用情境** | • 文章中的程式碼區塊<br>• 支援深色/淺色主題<br>• 自訂語法高亮顏色 |

---

### mermaid

| 項目 | 內容 |
|------|------|
| **套件名稱** | `mermaid` |
| **版本** | `^11` |
| **用途** | 在瀏覽器端將 Mermaid 圖表語法渲染為 SVG |
| **為什麼選擇** | • 官方 Mermaid 函式庫，語法支援最完整<br>• 客戶端 SVG 渲染，無需建置時依賴<br>• 內建主題系統 (default / dark)<br>• 活躍維護，社群龐大 |
| **替代方案** | • rehype-mermaid — 伺服器端渲染但需要 Playwright/Puppeteer<br>• mermaid-js/mermaid-live-editor — 線上工具，無法嵌入 |
| **使用情境** | • 文章中的流程圖、時序圖、類別圖<br>• 自動跟隨明暗主題切換<br>• 渲染失敗時優雅退化 |

---

## 國際化

### next-intl

| 項目 | 內容 |
|------|------|
| **套件名稱** | `next-intl` |
| **版本** | `^4.8.3` |
| **用途** | Next.js 國際化解決方案 |
| **為什麼選擇** | • 專為 App Router 設計<br>• 支援 Server Components<br>• 型別安全的翻譯鍵<br>• 簡潔的 API<br>• 優秀的效能 |
| **替代方案** | • next-i18next — 為 Pages Router 設計，不適合 App Router<br>• react-intl — 功能強大但較複雜<br>• i18next — 通用方案但需要更多設定 |
| **核心功能** | • 路由層級語言切換<br>• Server/Client Component 支援<br>• 日期、數字格式化<br>• 複數形式處理 |

---

## 開發工具

### TypeScript

| 項目 | 內容 |
|------|------|
| **套件名稱** | `typescript` |
| **版本** | `^5` |
| **用途** | JavaScript 的型別超集 |
| **為什麼選擇** | • 型別安全<br>• 更好的開發體驗 (自動完成、重構) <br>• 減少 runtime 錯誤<br>• 業界標準 |
| **替代方案** | • JavaScript — 無型別檢查<br>• Flow — 社群較小 |
| **設定重點** | • `strict: true` — 啟用嚴格模式<br>• `paths` — 路徑別名 (`@/*`) <br>• `jsx: "react-jsx"` — 新版 JSX 轉換 |

---

### ESLint

| 項目 | 內容 |
|------|------|
| **套件名稱** | `eslint`, `eslint-config-next` |
| **版本** | `^9`, `16.1.6` |
| **用途** | JavaScript/TypeScript 程式碼檢查 |
| **為什麼選擇** | • 統一程式碼風格<br>• 提早發現潛在問題<br>• Next.js 官方設定<br>• 支援 TypeScript |
| **替代方案** | • Biome — 更快但生態系統較小<br>• TSLint — 已棄用 |
| **設定重點** | • 使用 Next.js 官方設定<br>• 支援 TypeScript<br>• 自訂 ignore 規則 |

---

### babel-plugin-react-compiler

| 項目 | 內容 |
|------|------|
| **套件名稱** | `babel-plugin-react-compiler` |
| **版本** | `1.0.0` |
| **用途** | React 19 編譯器，自動優化元件 |
| **為什麼選擇** | • 自動 memoization<br>• 減少不必要的重新渲染<br>• 無需手動優化<br>• React 官方工具 |
| **替代方案** | • 手動使用 useMemo/useCallback — 維護成本高<br>• 不使用 — 效能較差 |
| **效能提升** | • 自動優化元件渲染<br>• 減少 bundle size<br>• 改善執行時效能 |

---

## 樣式工具

### Tailwind CSS

| 項目 | 內容 |
|------|------|
| **套件名稱** | `tailwindcss`, `@tailwindcss/postcss` |
| **版本** | `^4` |
| **用途** | Utility-first CSS 框架 |
| **為什麼選擇** | • 快速開發<br>• 一致的設計系統<br>• 優秀的 tree-shaking<br>• v4 效能大幅提升<br>• 支援 CSS 變數整合 |
| **替代方案** | • CSS Modules — 更傳統但開發較慢<br>• styled-components — runtime overhead<br>• UnoCSS — 更快但生態系統較小 |
| **v4 新特性** | • `@theme` 語法<br>• 更快的編譯速度<br>• 更好的 CSS 變數支援<br>• 簡化的設定 |

---

### PostCSS

| 項目 | 內容 |
|------|------|
| **套件名稱** | `@tailwindcss/postcss` |
| **版本** | `^4` |
| **用途** | CSS 處理工具 |
| **為什麼選擇** | • Tailwind CSS 必需<br>• 支援 CSS 轉換<br>• 與 Next.js 整合良好 |
| **替代方案** | • 無，Tailwind 必需 |
| **功能** | • 處理 Tailwind 指令<br>• CSS 優化<br>• 瀏覽器相容性處理 |

---

## 型別定義

### @types 套件

| 套件 | 用途 |
|------|------|
| `@types/node` | Node.js API 型別定義 |
| `@types/react` | React 型別定義 |
| `@types/react-dom` | React DOM 型別定義 |

**為什麼需要：**
- 提供 TypeScript 型別支援
- 改善開發體驗
- 型別檢查與自動完成

---

## 依賴關係圖

### 核心依賴鏈

```
Next.js
    ├─ React
    │   └─ react-dom
    ├─ next-intl (i18n)
    └─ next-mdx-remote (MDX)
        ├─ remark-gfm (Markdown 擴充)
        ├─ rehype-slug (標題 id)
        ├─ rehype-autolink-headings (標題連結)
        ├─ highlight.js (程式碼語法高亮)
        └─ mermaid (圖表渲染)
```

### 開發工具鏈

```
TypeScript
    ├─ @types/node
    ├─ @types/react
    └─ @types/react-dom

ESLint
    └─ eslint-config-next

Tailwind CSS
    └─ @tailwindcss/postcss
```

---

## 套件選擇原則

### 1. 優先選擇官方方案

**原則：** 優先使用框架官方推薦的套件

**範例：**
- ✅ next-intl (Next.js 官方推薦)
- ✅ eslint-config-next (Next.js 官方設定)

**理由：**
- 更好的整合
- 更及時的更新
- 更好的文檔支援

---

### 2. 評估維護狀態

**原則：** 選擇活躍維護的套件

**評估指標：**
- 最近更新時間
- Issue 回應速度
- 社群活躍度
- 下載量

**範例：**
- ✅ highlight.js (活躍維護，每月更新)
- ❌ 已棄用的套件

---

### 3. 考慮 Bundle Size

**原則：** 在功能相近時，選擇更輕量的方案

**範例：**
- ✅ next-intl (輕量，專為 Next.js 設計)
- ❌ i18next (功能強大但較重)

**工具：**
- [Bundlephobia](https://bundlephobia.com/) — 查看套件大小
- Next.js Bundle Analyzer — 分析 bundle

---

### 4. 型別安全優先

**原則：** 優先選擇有 TypeScript 支援的套件

**範例：**
- ✅ next-intl (完整 TypeScript 支援)
- ✅ next-mdx-remote (型別定義完整)

**好處：**
- 更好的開發體驗
- 減少 runtime 錯誤
- 更容易重構

---

### 5. 避免過度依賴

**原則：** 只在必要時引入新套件

**評估問題：**
1. 這個功能是否必需？
2. 能否用現有套件實現？
3. 能否自己實作 (成本合理的情況下)？
4. 長期維護成本如何？

**範例：**
- ✅ highlight.js (語法高亮複雜，值得引入)
- ❌ lodash (大部分功能可用原生 JS 實現)

---

## 套件更新策略

### 版本管理

**語意化版本：** `major.minor.patch`

```json
{
  "next": "16.1.6",             // 固定版本
  "react": "19.2.3",            // 固定版本
  "next-intl": "^4.8.3",        // 允許 minor 更新
  "highlight.js": "^11.11.1"    // 允許 minor 更新
}
```

**策略：**
- **核心框架** (Next.js, React) — 固定版本，手動更新
- **工具套件** — 允許 minor 更新 (`^`)
- **開發工具** — 允許 minor 更新 (`^`)

---

### 更新頻率

**每月檢查：**
- 安全性更新
- 重要 bug 修復

**每季更新：**
- Minor 版本更新
- 新功能評估

**每年評估：**
- Major 版本更新
- 套件替換評估

---

### 更新流程

1. **檢查更新**
    ```bash
    npm outdated
    ```

2. **閱讀 Changelog**
    - 了解變更內容
    - 評估影響範圍

3. **測試更新**
    ```bash
    npm update [package]
    npm run build
    npm run dev
    ```

4. **驗證功能**
    - 手動測試核心功能
    - 檢查 console 錯誤
    - 驗證 build 成功

5. **提交變更**
    ```bash
    git commit -m "chore: update dependencies"
    ```

---

## 未來可能引入的套件

### 測試工具

| 套件 | 用途 | 引入時機 |
|------|------|----------|
| Vitest | 單元測試 | 當需要測試複雜邏輯時 |
| Playwright | E2E 測試 | 當需要測試使用者流程時 |
| Testing Library | 元件測試 | 當需要測試 React 元件時 |

---

### 效能監控

| 套件 | 用途 | 引入時機 |
|------|------|----------|
| @vercel/analytics | 網站分析 | 當需要追蹤使用者行為時 |
| @vercel/speed-insights | 效能監控 | 當需要監控網站效能時 |

---

### 內容管理

| 套件 | 用途 | 引入時機 |
|------|------|----------|
| contentlayer | 內容管理 | 當內容變得複雜時 |
| gray-matter | Frontmatter 解析 | 當需要更複雜的 metadata 時 |

---

### SEO 優化

| 套件 | 用途 | 引入時機 |
|------|------|----------|
| next-sitemap | 生成 sitemap | 當需要 SEO 優化時 |
| next-seo | SEO 管理 | 當需要更細緻的 SEO 控制時 |

---

## 套件移除考量

### 何時移除套件

1. **不再使用**
    - 功能已移除
    - 被其他套件取代

2. **維護問題**
    - 長期未更新
    - 有安全性問題
    - 與新版本不相容

3. **效能考量**
    - Bundle size 過大
    - 有更輕量的替代方案

4. **過度依賴**
    - 功能簡單，可自行實作
    - 只用到一小部分功能

---

### 移除流程

1. **評估影響**
    - 搜尋所有使用處
    - 評估替代方案

2. **實作替代**
    - 自行實作功能
    - 或引入替代套件

3. **測試驗證**
    - 確保功能正常
    - 檢查 build 成功

4. **移除套件**
    ```bash
    npm uninstall [package]
    ```

---

## 總結

### 依賴管理原則

1. **最小化原則**
    - 只引入必要的套件
    - 避免功能重複的套件

2. **品質優先**
    - 選擇維護良好的套件
    - 優先選擇官方方案

3. **效能考量**
    - 注意 bundle size
    - 評估 runtime overhead

4. **長期維護**
    - 考慮更新成本
    - 評估社群活躍度

### 定期檢視

- 每月檢查安全性更新
- 每季評估套件狀態
- 每年重新評估技術選型

### 文檔維護

- 新增套件時更新此文件
- 記錄選擇理由
- 記錄替代方案
- 記錄使用情境
