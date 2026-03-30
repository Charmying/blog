# Project Architecture

**English** | [繁體中文](./STRUCTURE.zh-TW.md)

This document explains the project's folder structure, naming conventions, and the design decisions behind them.

---

## Table of Contents

- [Overall Architecture](#overall-architecture)
- [Core Directory Descriptions](#core-directory-descriptions)
- [Design Decisions](#design-decisions)
- [Naming Conventions](#naming-conventions)
- [File Organization Principles](#file-organization-principles)

---

## Overall Architecture

```
blog/
├── docs/                 # Project documentation
├── messages/             # i18n translation files
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── i18n/             # Internationalization setup
│   ├── lib/              # Utility functions
│   ├── posts/            # MDX article content
│   └── types/            # TypeScript types
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Core Directory Descriptions

### `/docs` — Project Documentation

**Responsibility:** Document project architecture, dependencies, and development guidelines

**Contents:**
- `structure.md` — Architecture and design decisions
- `dependencies.md` — Package list and selection rationale
- `development.md` — Development environment and guidelines

**Why this design:**
- Separates documentation from code, keeping README concise
- Follows "README is the entry point, docs are the details" principle
- Makes it easy for future maintainers to quickly understand the project

---

### `/messages` — i18n Translation Files

**Responsibility:** Store translation resources for all languages

**Structure:**
```
messages/
├── en.json       # English translations
└── zh-TW.json    # Traditional Chinese translations
```

**Why this design:**
- Root directory placement is next-intl convention
- JSON format is easy to edit and version control
- Separate files per language for easy management and expansion

**Translation key organization:**
```json
{
  "Site": { ... },           // Site-level
  "Nav": { ... },            // Navigation
  "HomePage": { ... },       // Home page
  "AboutPage": { ... },      // About page
  "ArticlesPage": { ... }    // Articles page
}
```

---

### `/public` — Static Assets

**Responsibility:** Store static files that don't need processing

**Contents:**
- Images (avatars, icons, etc.)
- favicon
- Other static resources

**Why this design:**
- Next.js serves files from `/public` directly
- Not processed by webpack, suitable for resources that don't need optimization
- Accessible directly via `/filename`

---

### `/src/app` — Next.js App Router

**Responsibility:** Define application routes, layouts, and pages

**Structure:**
```
app/
├── [locale]/                    # Dynamic language routing
│   ├── (site)/                  # Route group: main site pages
│   │   ├── about/               # About page
│   │   │   └── page.tsx
│   │   ├── articles/            # Article-related pages
│   │   │   ├── [slug]/          # Dynamic article routing
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx         # Article list
│   │   ├── layout.tsx           # Site layout (nav, etc.)
│   │   └── page.tsx             # Home page
│   └── layout.tsx               # Language-level layout (i18n provider)
├── globals.css                  # Global styles
└── layout.tsx                   # Root layout (HTML, body)
```

**Why this design:**

1. **`[locale]` Dynamic Routing**
    - Supports multilingual paths (`/`, `/en`)
    - Uses `localePrefix: "as-needed"` strategy, default language doesn't show prefix

2. **`(site)` Route Group**
    - Parentheses indicate no URL structure impact
    - Organizes related pages together
    - Shares the same layout (nav, footer, etc.)

3. **Nested Layouts**
    - Root layout: HTML structure, fonts, theme provider
    - Language layout: i18n provider
    - Site layout: navigation, footer

4. **File Naming**
    - `page.tsx` — Page component
    - `layout.tsx` — Layout component
    - `loading.tsx` — Loading state (can be added)
    - `error.tsx` — Error handling (can be added)

---

### `/src/components` — React Components

**Responsibility:** Store reusable React components

**Structure:**
```
components/
├── article/                       # Article-related components
│   ├── code-block.tsx             # Code block
│   ├── mdx-components.tsx         # Custom MDX components
│   └── mermaid-chart.tsx          # Mermaid diagram component
├── layout/                        # Layout components
│   ├── main-nav.tsx               # Main navigation
│   ├── mobile-menu.tsx            # Mobile menu
│   ├── mobile-menu-context.tsx    # Menu state management
│   ├── search-modal.tsx           # Search modal
│   └── site-title.tsx             # Site title
├── locale-switcher.tsx            # Language switcher
└── theme-toggle.tsx               # Theme toggle
```

**Why this design:**

1. **Categorized by Function**
    - `article/` — Article display related
    - `layout/` — Layout structure related
    - Root level — Independent feature components

2. **Naming Convention**
    - Use kebab-case (consistent with Next.js convention)
    - Filename is component name (`theme-toggle.tsx` → `ThemeToggle`)

3. **Component Responsibility**
    - Each component responsible for one clear function
    - Avoid over-abstraction or over-specificity
    - Prefer Server Components, use Client Components only when interaction needed

---

### `/src/config` — Configuration Files

**Responsibility:** Centrally manage application configuration

**Structure:**
```
config/
├── site.ts           # Site config (nav items, metadata, etc.)
└── theme.ts          # Theme config (storage key, default theme)
```

**Why this design:**
- Separates configuration from logic
- Easy to modify and maintain
- Type-safe configuration files

**Example:**
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

### `/src/i18n` — Internationalization Setup

**Responsibility:** Manage i18n-related configuration and utilities

**Structure:**
```
i18n/
├── navigation.ts     # i18n navigation utilities (Link, redirect, etc.)
├── request.ts        # Request-level i18n setup
└── routing.ts        # Routing and language configuration
```

**Why this design:**
- Follows next-intl best practices
- Centrally manages language configuration
- Provides type-safe navigation utilities

**Core configuration:**
```typescript
// routing.ts
export const routing = defineRouting({
  locales: ["zh-TW", "en"],
  defaultLocale: "zh-TW",
  localePrefix: "as-needed",
});
```

---

### `/src/lib` — Utility Functions

**Responsibility:** Store pure functions and utility logic

**Structure:**
```
lib/
└── posts.ts    # Article processing logic
```

**Why this design:**
- Separates business logic from UI
- Easy to test and reuse
- Keeps components clean

**posts.ts responsibilities:**
- Read MDX files
- Parse metadata
- Calculate reading time
- Aggregate tags
- Sort and filter

---

### `/src/posts` — MDX Article Content

**Responsibility:** Store all blog articles

**Structure:**
```
posts/
├── en/                   # English articles
│   ├── article-1.mdx
│   └── article-2.mdx
└── zh-TW/                # Traditional Chinese articles
    ├── article-1.mdx
    └── article-2.mdx
```

**Why this design:**

1. **Separated by Language**
    - Each language has independent article directory
    - Easy to manage different language content
    - Supports language-specific articles

2. **File as Route**
    - Filename is article slug
    - `article-1.mdx` → `/articles/article-1`

3. **MDX Format**
    - Supports Markdown syntax
    - Can embed React components
    - Flexible content creation

**Article structure:**
```typescript
export const metadata = {
  title: "Article Title",
  date: "2026-03-01",
  excerpt: "Article excerpt",
  tags: ["React", "Next.js"],
};

// MDX content
```

---

### `/src/types` — TypeScript Types

**Responsibility:** Store shared type definitions

**Why this design:**
- Centrally manage type definitions
- Avoid duplicate definitions
- Improve type safety

**When to use:**
- Types used across multiple files
- Complex type definitions
- API response types

---

## Design Decisions

### 1. Why Use App Router?

**Decision:** Adopt Next.js 15's App Router

**Rationale:**
- Better performance (Server Components)
- More intuitive routing and layout system
- Better SEO support
- Future mainstream direction

**Trade-offs:**
- Steeper learning curve
- Ecosystem still maturing
- But long-term benefits outweigh short-term costs

---

### 2. Why Use File-based CMS?

**Decision:** Use MDX files as content source instead of database

**Rationale:**
- Simple: No need to set up database
- Version control: Content managed with code
- Performance: Static generation, no database queries
- Flexible: MDX supports React components

**Suitable for:**
- Personal blogs
- Infrequent article updates
- Content managed by developers

**Not suitable for:**
- Non-technical editors needed
- High-frequency content updates
- Complex content management features needed

---

### 3. Why Use CSS Variables?

**Decision:** Use native CSS variables for theme system

**Rationale:**
- No runtime overhead
- Native browser support
- Easy to maintain and extend
- Supports instant switching

**Alternatives:**
- CSS-in-JS (styled-components, emotion)
    - Drawback: runtime overhead, increases bundle size
- Tailwind's dark mode
    - Drawback: need to repeat classes, not semantic enough

---

### 4. Why Use next-intl?

**Decision:** Use next-intl instead of next-i18next

**Rationale:**
- Designed specifically for App Router
- Better TypeScript support
- Cleaner API
- Better performance (Server Components)

**Core features:**
- Route-level language switching
- Supports both Server/Client Components
- Type-safe translation keys

---

## Naming Conventions

### File Naming

**Rule:** Use kebab-case

```
✅ theme-toggle.tsx
✅ main-nav.tsx
✅ search-modal.tsx

❌ ThemeToggle.tsx
❌ mainNav.tsx
❌ SearchModal.tsx
```

**Rationale:**
- Next.js official convention
- Consistent with route files
- Avoids case sensitivity issues

---

### Component Naming

**Rule:** Use PascalCase

```typescript
✅ export function ThemeToggle() { ... }
✅ export function MainNav() { ... }

❌ export function themeToggle() { ... }
❌ export function main_nav() { ... }
```

---

### Variable and Function Naming

**Rule:** Use camelCase

```typescript
✅ const siteConfig = { ... }
✅ function getAllPosts() { ... }

❌ const SiteConfig = { ... }
❌ function GetAllPosts() { ... }
```

---

### Type Naming

**Rule:** Use PascalCase

```typescript
✅ type PostMetadata = { ... }
✅ interface NavItem { ... }

❌ type postMetadata = { ... }
❌ interface nav_item { ... }
```

---

### Constant Naming

**Rule:** Use UPPER_SNAKE_CASE

```typescript
✅ const THEME_STORAGE_KEY = "blog-theme"
✅ const THEME_DEFAULT = "dark"

❌ const themeStorageKey = "blog-theme"
❌ const ThemeDefault = "dark"
```

---

## File Organization Principles

### 1. Proximity Principle

**Principle:** Files should be placed closest to where they're used

**Example:**
```
✅ components/article/code-block.tsx  # Only used in articles
✅ components/theme-toggle.tsx        # Used in multiple places, at root level

❌ components/code-block.tsx          # Should be under article/
```

---

### 2. Single Responsibility

**Principle:** Each file responsible for one thing

**Example:**
```typescript
✅ posts.ts  # Only handles article logic
✅ theme.ts  # Only handles theme config

❌ utils.ts  # Too generic, unclear responsibility
```

---

### 3. Avoid Over-abstraction

**Principle:** Don't abstract for the sake of abstraction

**When to abstract:**
- Logic repeated in 3+ places
- Logic is complex and independent
- Needs separate testing

**When not to abstract:**
- Logic used only once
- Logic is overly simple
- Abstraction reduces readability

---

### 4. Clear Dependencies

**Principle:** Dependencies should be unidirectional

**Dependency hierarchy:**
```
app/ (pages)
    ↓
components/ (components)
    ↓
lib/ (utilities)
    ↓
config/ (configuration)
```

**Forbidden:**
- config depends on components
- lib depends on app
- Circular dependencies

---

## Future Expansion Considerations

### Possible New Directories

```
src/
├── hooks/        # Custom React Hooks
├── utils/        # General utility functions
├── styles/       # Shared style files
├── constants/    # Constant definitions
└── api/          # API-related logic
```

### When to Add Directories

**hooks/**
- When there are 3+ custom hooks
- When hook logic is complex and reusable

**utils/**
- When there are general utility functions (non-business logic)
- Example: date formatting, string processing, etc.

**styles/**
- When there are shared CSS modules
- When more complex style organization is needed

**constants/**
- When there are many constant definitions
- When constants need categorized management

**api/**
- When backend API integration is needed
- When API logic becomes complex

---

## Summary

### Core Principles

1. **Clarity > Completeness**
    - Structure should be self-evident
    - Don't pursue overly perfect categorization

2. **Proximity > Centralization**
    - Place files closest to where they're used
    - Avoid over-abstraction

3. **Semantics > Form**
    - Naming should express intent
    - Structure should reflect functionality

4. **Simple > Complex**
    - Prefer simple solutions
    - Only add complexity when necessary

### Maintenance Recommendations

- Regularly review if file organization is reasonable
- Consider abstraction when duplicate logic is found
- Consider splitting when directories become too large
- Maintain structural consistency

### When to Override Rules

When you can clearly answer these questions, you can override rules:
1. Why doesn't the existing structure work?
2. How does the new structure solve the problem?
3. What are the long-term maintenance costs of the new structure?
4. Is there a simpler alternative?
