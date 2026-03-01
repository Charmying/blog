# Development Guide

**English** | [繁體中文](./DEVELOPMENT.zh-TW.md)

This document explains the project's development environment setup, development guidelines, and common troubleshooting solutions.

---

## Table of Contents

- [Environment Requirements](#environment-requirements)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Development Guidelines](#development-guidelines)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)

---

## Environment Requirements

### Required Environment

| Tool | Version | Description |
|------|---------|-------------|
| Node.js | >= 18.17.0 | JavaScript runtime |
| npm | >= 9.0.0 | Package manager |
| Git | >= 2.0.0 | Version control |

### Recommended Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code editor |
| Chrome DevTools | Debugging and performance analysis |
| React DevTools | React component debugging |

---

### VS Code Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",             // ESLint
    "esbenp.prettier-vscode",             // Prettier
    "bradlc.vscode-tailwindcss",          // Tailwind CSS IntelliSense
    "unifiedjs.vscode-mdx",               // MDX syntax support
    "ms-vscode.vscode-typescript-next"    // TypeScript
  ]
}
```

---

## Quick Start

### 1. Clone Project

```bash
git clone <repository-url>
cd blog
```

---

### 2. Install Dependencies

```bash
npm install
```

**Notes:**
- Ensure Node.js version 18.17.0 or higher
- If installation issues occur, try deleting `node_modules` and `package-lock.json` then reinstall

---

### 3. Start Development Server

```bash
npm run dev
```

**Development server features:**
- 🔥 Hot Module Replacement (HMR)
- ⚡ Fast Refresh
- 🔍 Detailed error messages
- 📊 Real-time compilation status

---

### 4. Verify Environment

Open browser and visit `http://localhost:3000`, confirm:
- ✅ Page displays correctly
- ✅ Navigation works
- ✅ Language switching works
- ✅ Theme switching works
- ✅ Article list displays correctly

---

## Development Workflow

### Daily Development Flow

```bash
# 1. Update code
git pull origin main

# 2. Install new dependencies (if any)
npm install

# 3. Start development server
npm run dev

# 4. Develop features...

# 5. Check code quality
npm run lint

# 6. Test build
npm run build

# 7. Commit changes
git add .
git commit -m "feature: add new feature"
git push
```

---

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

### Git Workflow

**Branch strategy:**
```
main                  # Main branch, always deployable
    ├─ feature/xxx    # New feature development
    ├─ fix/xxx        # Bug fixes
    └─ docs/xxx       # Documentation updates
```

**Development flow:**
```bash
# 1. Create new branch
git checkout -b feature/new-feature

# 2. Develop and commit
git add .
git commit -m "feature: add new feature"

# 3. Push branch
git push origin feature/new-feature

# 4. Merge back to main (locally or via PR)
git checkout main
git merge feature/new-feature

# 5. Delete branch
git branch -d feature/new-feature
```

---

## Development Guidelines

### Commit Message Convention

**Format:** `<type>: <description>`

**Type categories:**
- `feature` — New feature
- `fix` — Bug fix
- `docs` — Documentation update
- `refactor` — Code refactoring
- `style` — Code formatting
- `chore` — Miscellaneous (dependency updates, config changes, etc.)

**Examples:**
```bash
✅ feature: add search functionality
✅ fix: resolve mobile menu issue
✅ docs: update README
✅ refactor: simplify post parsing logic
✅ chore: update dependencies

❌ Update code
❌ Fix bug
❌ WIP
```

---

### Code Style

**TypeScript conventions:**
```typescript
// ✅ Use const/let, avoid var
const name = "Charmy";
let count = 0;

// ✅ Explicit type definitions
interface User {
    name: string;
    age: number;
}

// ✅ Use arrow functions
const greet = (name: string) => `Hello, ${name}`;

// ✅ Destructuring
const { title, date } = metadata;

// ✅ Optional chaining
const userName = user?.profile?.name;

// ❌ Avoid any
const data: any = {};     // Bad
const data: User = {};    // Good
```

---

**React conventions:**
```typescript
// ✅ Use function components
export function MyComponent() {
  return <div>Hello</div>;
}

// ✅ Use TypeScript for props
interface Props {
  title: string;
  count?: number;
}

export function MyComponent({ title, count = 0 }: Props) {
  return <div>{title}: {count}</div>;
}

// ✅ Default to Server Component
export function ServerComponent() {
  // Can use async/await directly
  return <div>Server Component</div>;
}

// ✅ Use Client Component when interaction needed
"use client";

export function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

**CSS conventions:**
```tsx
// ✅ Prefer Tailwind
<div className="flex items-center gap-4 p-4">

// ✅ Use CSS variables
<div style={{ color: "var(--foreground)" }}>

// ✅ Responsive design
<div className="text-sm md:text-base lg:text-lg">

// ❌ Avoid inline styles (unless dynamic values)
<div style={{ color: "black" }}>     // Bad
<div className="text-foreground">    // Good
```

---

### File Organization Convention

**Component files:**
```typescript
// theme-toggle.tsx

"use client";

import { useState } from "react";

// 1. Type definitions
interface ThemeToggleProps {
  defaultTheme?: "light" | "dark";
}

// 2. Component implementation
export function ThemeToggle({ defaultTheme = "dark" }: ThemeToggleProps) {
  const [theme, setTheme] = useState(defaultTheme);

  // 3. Event handlers
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 4. Render
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

---

**Utility function files:**
```typescript
// posts.ts

// 1. Type definitions
export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
}

// 2. Constant definitions
const POSTS_DIR = "src/posts";

// 3. Helper functions (not exported)
function parseMetadata(content: string): PostMetadata {
  // ...
}

// 4. Public functions
export function getAllPosts(locale: string): PostMetadata[] {
  // ...
}

export function getPostBySlug(slug: string): PostMetadata {
  // ...
}
```

---

### Naming Conventions

**File naming:**
```
✅ theme-toggle.tsx
✅ main-nav.tsx
✅ search-modal.tsx

❌ ThemeToggle.tsx
❌ mainNav.tsx
❌ SearchModal.tsx
```

**Component naming:**
```typescript
✅ export function ThemeToggle() { }
✅ export function MainNav() { }

❌ export function themeToggle() { }
❌ export function main_nav() { }
```

**Variable naming:**
```typescript
✅ const userName = "Charmy";
✅ const postList = [];
✅ const isLoading = false;

❌ const user_name = "Charmy";
❌ const PostList = [];
❌ const loading = false;    // Boolean should start with is/has
```

**Constant naming:**
```typescript
✅ const THEME_STORAGE_KEY = "blog-theme";
✅ const MAX_POSTS_PER_PAGE = 10;

❌ const themeStorageKey = "blog-theme";
❌ const maxPostsPerPage = 10;
```

---

## Common Tasks

### Adding Articles

**1. Create MDX file**

Create new file in `src/posts/[locale]/`:

```bash
# Traditional Chinese article
src/posts/zh-TW/my-new-article.mdx

# English article
src/posts/en/my-new-article.mdx
```

**2. Write article content**

```mdx
export const metadata = {
  title: "My New Article",
  date: "2024-01-15",
  excerpt: "This is the article excerpt",
  tags: ["React", "Next.js"],
};

# Article Title

This is the article content...

## Subheading

More content...

```typescript
const example = "code example";
```
```

**3. Verify article**

- Start development server
- Visit `/articles`
- Confirm article appears in list
- Click article to confirm content displays correctly

---

### Adding Translations

**1. Add new keys in translation files**

```json
// messages/zh-TW.json
{
  "NewFeature": {
    "title": "新功能標題",
    "description": "新功能描述"
  }
}

// messages/en.json
{
  "NewFeature": {
    "title": "New Feature Title",
    "description": "New feature description"
  }
}
```

**2. Use in components**

```typescript
// Server Component
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('NewFeature');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

// Client Component
"use client";

import { useTranslations } from 'next-intl';

export function ClientComponent() {
  const t = useTranslations('NewFeature');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

---

### Adding Pages

**1. Create page file**

```bash
# Create new page under (site) group
src/app/[locale]/(site)/new-page/page.tsx
```

**2. Implement page component**

```typescript
import { getTranslations } from 'next-intl/server';

export default async function NewPage() {
  const t = await getTranslations('NewPage');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-secondary">{t('description')}</p>
    </div>
  );
}

// Metadata
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'NewPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}
```

**3. Add to navigation (if needed)**

```typescript
// src/config/site.ts
export const siteConfig = {
  navItems: [
    { href: "/", labelKey: "home" },
    { href: "/about", labelKey: "about" },
    { href: "/articles", labelKey: "articles" },
    { href: "/new-page", labelKey: "newPage" },    // New
  ],
} as const;
```

---

### Adding Components

**1. Create component file**

```bash
# Create in appropriate directory
src/components/my-component.tsx
```

**2. Implement component**

```typescript
// Add "use client" if interaction needed
"use client";

import { useState } from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Active" : "Inactive"}
      </button>
    </div>
  );
}
```

**3. Use in pages**

```typescript
import { MyComponent } from "@/components/my-component";

export default function Page() {
  return (
    <div>
      <MyComponent title="Hello" />
    </div>
  );
}
```

---

### Modifying Styles

**1. Global styles**

Edit `src/app/globals.css`:

```css
/* Add CSS variables */
:root {
  --my-color: #ff0000;
}

[data-theme="light"] {
  --my-color: #00ff00;
}

/* Add global styles */
.my-custom-class {
  color: var(--my-color);
}
```

**2. Tailwind configuration**

Edit `@theme` block in `src/app/globals.css`:

```css
@theme {
  /* Add custom breakpoint */
  --breakpoint-3xl: 120rem;

  /* Add custom container */
  --container-3xl: 100rem;
}
```

**3. Component styles**

Prefer Tailwind, use CSS variables when needed:

```tsx
<div className="p-4 bg-card-bg hover:bg-card-hover">
  <h2 className="text-2xl font-bold text-foreground">Title</h2>
  <p className="text-secondary">Description</p>
</div>
```

---

## Performance Optimization

### Development Optimization

**1. Use Fast Refresh**
- Auto-update when modifying components
- Preserve component state
- Avoid full page reload

**2. Reduce unnecessary re-renders**
```typescript
// ✅ Use React.memo (if needed)
export const MyComponent = React.memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});

// ✅ Use useCallback (if needed)
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```

**3. Optimize imports**
```typescript
// ❌ Import entire package
import _ from 'lodash';

// ✅ Import only needed functions
import { debounce } from 'lodash';

// ✅ Use dynamic import
const Component = dynamic(() => import('./Component'));
```

---

### Production Optimization

**1. Image optimization**
```typescript
// ✅ Use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority  // Above-the-fold images
/>
```

**2. Font optimization**
```typescript
// Use system fonts, no external font loading needed
font-family: var(--font-sans);
```

**3. Code splitting**
```typescript
// Dynamically load non-critical components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

---

### Performance Monitoring

**1. Use Chrome DevTools**
- Lighthouse — Overall performance score
- Performance — Runtime performance analysis
- Network — Network request analysis

**2. Next.js built-in analysis**
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ directory
```

**3. Key metrics**
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)

---

## Summary

### Development Checklist

**Before starting development:**
- ✅ Confirm Node.js version
- ✅ Install dependencies
- ✅ Start development server
- ✅ Verify environment is working

**During development:**
- ✅ Follow naming conventions
- ✅ Follow code style
- ✅ Write clear commit messages
- ✅ Run lint regularly

**Before committing:**
- ✅ Run `npm run lint`
- ✅ Run `npm run build`
- ✅ Test core features
- ✅ Check console for errors

---

### Documentation Help

**Documentation resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

**Project documentation:**
- [README](../README.md)
- [Architecture Guide](./STRUCTURE.md)
- [Dependencies Reference](./DEPENDENCIES.md)
