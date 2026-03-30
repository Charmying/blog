# Blog

**English** | [繁體中文](./README.zh-TW.md)

A modern personal tech blog platform built with Next.js 16+ and React 19, featuring multilingual support and dark mode, focused on delivering an elegant reading experience and efficient content management.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

---

## ✨ Core Features

### Technical Highlights
- **Next.js 16+ App Router** — Latest App Router architecture with React Server Components
- **React 19 Compiler** — Automatic performance optimization with React Compiler
- **MDX Content System** — File-based MDX article management with rich interactive components
- **Multilingual Support** — Complete i18n implementation (Traditional Chinese / English)
- **Dark Mode** — Carefully designed light/dark theme switching system
- **Syntax Highlighting** — Professional code display with highlight.js integration
- **Mermaid Diagrams** — Flowcharts and diagrams rendered directly in articles, with automatic light/dark theme switching

### User Experience
- **Responsive Design** — Full support for desktop, tablet, and mobile devices
- **Smooth Animations** — Refined transitions and interactive feedback
- **Reading Optimization** — Typography and font system optimized for long-form reading
- **Search Functionality** — Real-time article and tag search
- **Reading Time** — Automatic article reading time calculation
- **Comments System** — Giscus-powered comments based on GitHub Discussions

---

## 🏗️ Architecture Highlights

### Modern Next.js Patterns
- **App Router** — File system-based routing and layouts
- **Server Components** — Default use of RSC for improved performance
- **Route Groups** — Organized route structure using `(site)`
- **Dynamic Routes** — Dynamic language routing `[locale]`
- **Metadata API** — SEO-friendly metadata management

### Content Management System
- **File-based CMS** — MDX files as direct content source
- **Metadata Extraction** — Automatic article metadata parsing
- **Multilingual Content** — Language-separated article directory structure
- **Tag System** — Automatic tag aggregation and categorization
- **Reading Time Calculation** — Smart calculation for mixed Chinese/English content

---

## 📁 Project Structure

```
blog/
├── docs/                             # Project documentation
│   ├── STRUCTURE.md                  # Architecture and design decisions
│   ├── DEPENDENCIES.md               # Package list and selection rationale
│   └── DEVELOPMENT.md                # Development environment and guidelines
├── messages/                         # i18n translation files
│   ├── en.json                       # English translations
│   └── zh-TW.json                    # Traditional Chinese translations
├── public/                           # Static assets
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Dynamic language routing
│   │   │   ├── (site)/               # Main site pages group
│   │   │   │   ├── about/            # About page
│   │   │   │   ├── articles/         # Article list and details
│   │   │   │   ├── layout.tsx        # Site layout
│   │   │   │   └── page.tsx          # Home page
│   │   │   └── layout.tsx            # Language-level layout
│   │   ├── globals.css               # Global styles and design tokens
│   │   └── layout.tsx                # Root layout
│   ├── components/                   # React components
│   │   ├── article/                  # Article-related components
│   │   │   ├── code-block.tsx        # Code block component
│   │   │   ├── comments.tsx          # Comments component
│   │   │   ├── mdx-components.tsx    # Custom MDX components
│   │   │   └── mermaid-chart.tsx     # Mermaid diagram component
│   │   ├── layout/                   # Layout components
│   │   │   ├── main-nav.tsx          # Main navigation
│   │   │   ├── mobile-menu.tsx       # Mobile menu
│   │   │   ├── search-modal.tsx      # Search modal
│   │   │   └── site-title.tsx        # Site title
│   │   ├── locale-switcher.tsx       # Language switcher
│   │   └── theme-toggle.tsx          # Theme toggle
│   ├── config/                       # Configuration files
│   │   ├── site.ts                   # Site config (nav items, etc.)
│   │   └── theme.ts                  # Theme configuration
│   ├── i18n/                         # Internationalization setup
│   │   ├── navigation.ts             # i18n navigation utilities
│   │   ├── request.ts                # Request-level i18n
│   │   └── routing.ts                # Routing and language config
│   ├── lib/                          # Utility functions
│   │   └── posts.ts                  # Article processing logic
│   ├── posts/                        # MDX article content
│   │   ├── en/                       # English articles
│   │   └── zh-TW/                    # Traditional Chinese articles
│   └── types/                        # TypeScript type definitions
├── .gitignore                        # Git ignore list
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Project dependencies and scripts
├── postcss.config.mjs                # PostCSS configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md
```

---

## 🎨 Design System

### Semantic Color System
The project uses a CSS variable-driven semantic color system defined in `src/app/globals.css`:

- **Surface Tokens** — Background color hierarchy (background, card-bg, nav-bg)
- **Text Tokens** — Text color hierarchy (foreground, secondary)
- **Interactive Tokens** — Interactive elements (accent, button-bg, button-hover)
- **Border Tokens** — Borders and dividers (border, divider)
- **Shadow Tokens** — Shadow levels (shadow-sm, shadow, shadow-lg)

### Theme Implementation
- **Light/Dark Themes** — Complete light/dark theme support
- **Instant Switching** — Flicker-free theme switching experience
- **Persistence** — User preference stored in localStorage
- **CSS Variables** — All theme values driven by CSS custom properties

### Styling Architecture
- **Tailwind CSS v4** — Latest Tailwind v4 with `@theme` syntax
- **Fluid Typography** — Responsive fonts using clamp()
- **Custom Breakpoints** — Custom breakpoint system (xs, sm, md, lg, xl, 2xl)
- **Design Tokens** — Unified design token management

---

## 🌍 Internationalization (i18n)

### Translation System
- **next-intl** — Complete i18n solution based on next-intl
- **Structured Keys** — Semantic translation key organization
- **Language Persistence** — User language preference automatically saved
- **Fallback Support** — Graceful default language fallback

### Translation Resources
```
messages/
├── en.json       # English translations
└── zh-TW.json    # Traditional Chinese translations
```

### Key Organization Structure
Translation keys follow a structured pattern:
- `Site.*` — Site-level information (title, description)
- `Nav.*` — Navigation items
- `HomePage.*` — Home page content
- `AboutPage.*` — About page content
- `ArticlesPage.*` — Articles page content
- `Search.*` — Search functionality
- `CodeBlock.*` — Code block

### Usage Examples
```typescript
// In Server Component
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('HomePage');

// In Client Component
import { useTranslations } from 'next-intl';
const t = useTranslations('Nav');
```

---

## 📝 Content Management

### MDX Article Structure
Each article is an `.mdx` file containing metadata and content:

```typescript
export const metadata = {
  title: "Article Title",
  date: "2026-03-01",
  excerpt: "Article excerpt",
  tags: ["React", "Next.js"],
};

// Article content using MDX syntax
```

### Article Organization
```
src/posts/
├── en/                    # English articles
│   ├── article-1.mdx
│   └── article-2.mdx
└── zh-TW/                 # Traditional Chinese articles
    ├── article-1.mdx
    └── article-2.mdx
```

### Content Features
- **Automatic Metadata Extraction** — Parse metadata from MDX files
- **Reading Time Calculation** — Smart calculation for mixed content
- **Tag Aggregation** — Automatic collection and categorization of all tags
- **Date Sorting** — Articles automatically sorted by date
- **Syntax Highlighting** — Automatic code block highlighting
- **Mermaid Diagram Rendering** — Diagrams rendered client-side with theme-aware styling

---

## 🔧 Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Adding Articles
1. Create a new `.mdx` file in `src/posts/[locale]/`
2. Add metadata export
3. Write MDX content
4. Article will automatically appear in the article list

### Adding Translations
1. Add new translation keys in `messages/[locale].json`
2. Use `useTranslations()` or `getTranslations()` in components
3. Translations will automatically display based on current language

---

## 🎯 Performance Optimization

### Build Optimization
- **React Compiler** — Automatic React component performance optimization
- **Tree Shaking** — Remove unused code
- **Code Splitting** — Route-level code splitting
- **Image Optimization** — Next.js automatic image optimization

### Runtime Performance
- **Server Components** — Default use of RSC to reduce client-side JS
- **Static Generation** — Article pages statically generated
- **Font Optimization** — System fonts prioritized, no external font loading
- **CSS-in-CSS** — Native CSS variables, no runtime overhead

---

## 📱 Responsive Design

### Breakpoint Strategy
```css
--breakpoint-xs: 30rem;         /* 480px */
--breakpoint-sm: 30.0625rem;    /* 481px */
--breakpoint-md: 48rem;         /* 768px */
--breakpoint-lg: 64rem;         /* 1024px */
--breakpoint-xl: 80rem;         /* 1280px */
--breakpoint-2xl: 100rem;       /* 1600px */
```

### Device Support
- **Mobile Devices** — Optimized touch experience and mobile menu
- **Tablet Support** — Adapted for medium screen sizes
- **Desktop Experience** — Full-featured desktop interface
- **Cross-browser** — Modern browser support

---

## 📚 Related Documentation

### Project Documentation
- [**Architecture Guide**](./docs/STRUCTURE.md) — Folder structure and design decisions
- [**Dependencies Reference**](./docs/DEPENDENCIES.md) — Package descriptions and selection rationale
- [**Development Guide**](./docs/DEVELOPMENT.md) — Environment setup and development guidelines

### Technical Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [next-intl Documentation](https://next-intl-docs.vercel.app)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## 📊 Project Maturity

**Status:** 🟢 Active Development

- ✅ Core features complete
- ✅ Multilingual support
- ✅ Responsive design
- ✅ Dark mode
- ✅ MDX content system
- ✅ Comments system (Giscus)
- 🚧 Continuous optimization and new features
