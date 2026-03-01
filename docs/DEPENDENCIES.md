# Dependencies Reference

**English** | [繁體中文](./DEPENDENCIES.zh-TW.md)

This document explains all npm packages used in the project, including their purpose, selection rationale, and alternatives.

---

## Table of Contents

- [Core Dependencies](#core-dependencies)
- [Content Processing](#content-processing)
- [Internationalization](#internationalization)
- [Development Tools](#development-tools)
- [Styling Tools](#styling-tools)
- [Dependency Graph](#dependency-graph)

---

## Core Dependencies

### Next.js

| Item | Content |
|------|---------|
| **Package** | `next` |
| **Version** | `16.1.6` |
| **Purpose** | React framework providing SSR, SSG, routing, etc. |
| **Why Chosen** | • Industry-standard React framework<br>• Excellent performance and SEO<br>• App Router provides better DX<br>• Built-in image optimization, font optimization, etc. |
| **Alternatives** | • Remix — More modern but smaller ecosystem<br>• Gatsby — Good for static sites but heavier<br>• Vite + React Router — Lighter but requires manual SSR setup |
| **Core Features** | • App Router routing system<br>• Server Components<br>• Static generation and server rendering<br>• Automatic code splitting |

---

### React

| Item | Content |
|------|---------|
| **Package** | `react`, `react-dom` |
| **Version** | `19.2.3` |
| **Purpose** | UI library for building user interfaces |
| **Why Chosen** | • Most mature UI library<br>• Vast ecosystem<br>• React 19 introduces Compiler for automatic optimization<br>• Server Components improve performance |
| **Alternatives** | • Vue — Simpler but smaller ecosystem<br>• Svelte — Lighter but smaller community<br>• Solid — Better performance but immature ecosystem |
| **Core Features** | • Component-based development<br>• Virtual DOM<br>• Hooks<br>• Server Components |

---

## Content Processing

### next-mdx-remote

| Item | Content |
|------|---------|
| **Package** | `next-mdx-remote` |
| **Version** | `^6.0.0` |
| **Purpose** | Render MDX content in Next.js |
| **Why Chosen** | • Supports Server Components<br>• Customizable MDX components<br>• Excellent performance (server-side compilation)<br>• Great Next.js integration |
| **Alternatives** | • @next/mdx — Requires next.config setup, less flexible<br>• mdx-bundler — Powerful but complex setup<br>• contentlayer — Feature-complete but heavyweight |
| **Use Cases** | • Blog article rendering<br>• Embedding React components in MDX<br>• Custom code block styling |

---

### remark-gfm

| Item | Content |
|------|---------|
| **Package** | `remark-gfm` |
| **Version** | `^4.0.1` |
| **Purpose** | Support GitHub Flavored Markdown |
| **Why Chosen** | • Supports tables, task lists, strikethrough, etc.<br>• GitHub standard syntax<br>• Lightweight and stable |
| **Alternatives** | • None, this is the standard GFM implementation |
| **Supported Features** | • Tables<br>• Task lists<br>• Strikethrough<br>• Autolinks |

---

### rehype-slug

| Item | Content |
|------|---------|
| **Package** | `rehype-slug` |
| **Version** | `^6.0.0` |
| **Purpose** | Automatically add IDs to headings |
| **Why Chosen** | • Supports anchor links<br>• Improves article navigation<br>• Lightweight with no side effects |
| **Alternatives** | • Manual ID addition — High maintenance cost |
| **Use Cases** | • Internal article links<br>• Table of contents navigation<br>• Sharing specific sections |

---

### rehype-autolink-headings

| Item | Content |
|------|---------|
| **Package** | `rehype-autolink-headings` |
| **Version** | `^7.1.0` |
| **Purpose** | Add clickable links to headings |
| **Why Chosen** | • Improves user experience<br>• Easy to share specific sections<br>• Customizable link styling |
| **Alternatives** | • Manual implementation — High maintenance cost |
| **Use Cases** | • Hover to show link icon<br>• Click to copy link<br>• Share specific article sections |

---

### highlight.js

| Item | Content |
|------|---------|
| **Package** | `highlight.js` |
| **Version** | `^11.11.1` |
| **Purpose** | Code syntax highlighting |
| **Why Chosen** | • Supports 200+ languages<br>• No runtime compilation needed<br>• Customizable themes<br>• Lightweight with good performance |
| **Alternatives** | • Prism.js — Similar features but requires manual language loading<br>• Shiki — More beautiful but larger bundle size<br>• react-syntax-highlighter — React wrapper for Prism/highlight.js |
| **Use Cases** | • Code blocks in articles<br>• Dark/light theme support<br>• Custom syntax highlighting colors |

---

## Internationalization

### next-intl

| Item | Content |
|------|---------|
| **Package** | `next-intl` |
| **Version** | `^4.8.3` |
| **Purpose** | Next.js internationalization solution |
| **Why Chosen** | • Designed specifically for App Router<br>• Supports Server Components<br>• Type-safe translation keys<br>• Clean API<br>• Excellent performance |
| **Alternatives** | • next-i18next — Designed for Pages Router, not suitable for App Router<br>• react-intl — Powerful but more complex<br>• i18next — General solution but requires more setup |
| **Core Features** | • Route-level language switching<br>• Server/Client Component support<br>• Date and number formatting<br>• Plural form handling |

---

## Development Tools

### TypeScript

| Item | Content |
|------|---------|
| **Package** | `typescript` |
| **Version** | `^5` |
| **Purpose** | Typed superset of JavaScript |
| **Why Chosen** | • Type safety<br>• Better DX (autocomplete, refactoring)<br>• Reduces runtime errors<br>• Industry standard |
| **Alternatives** | • JavaScript — No type checking<br>• Flow — Smaller community |
| **Key Settings** | • `strict: true` — Enable strict mode<br>• `paths` — Path aliases (`@/*`)<br>• `jsx: "react-jsx"` — New JSX transform |

---

### ESLint

| Item | Content |
|------|---------|
| **Package** | `eslint`, `eslint-config-next` |
| **Version** | `^9`, `16.1.6` |
| **Purpose** | JavaScript/TypeScript code linting |
| **Why Chosen** | • Unified code style<br>• Early detection of potential issues<br>• Next.js official config<br>• TypeScript support |
| **Alternatives** | • Biome — Faster but smaller ecosystem<br>• TSLint — Deprecated |
| **Key Settings** | • Use Next.js official config<br>• TypeScript support<br>• Custom ignore rules |

---

### babel-plugin-react-compiler

| Item | Content |
|------|---------|
| **Package** | `babel-plugin-react-compiler` |
| **Version** | `1.0.0` |
| **Purpose** | React 19 compiler for automatic component optimization |
| **Why Chosen** | • Automatic memoization<br>• Reduces unnecessary re-renders<br>• No manual optimization needed<br>• Official React tool |
| **Alternatives** | • Manual useMemo/useCallback — High maintenance cost<br>• Not using — Worse performance |
| **Performance Gains** | • Automatic component render optimization<br>• Reduced bundle size<br>• Improved runtime performance |

---

## Styling Tools

### Tailwind CSS

| Item | Content |
|------|---------|
| **Package** | `tailwindcss`, `@tailwindcss/postcss` |
| **Version** | `^4` |
| **Purpose** | Utility-first CSS framework |
| **Why Chosen** | • Rapid development<br>• Consistent design system<br>• Excellent tree-shaking<br>• v4 significantly improved performance<br>• CSS variable integration support |
| **Alternatives** | • CSS Modules — More traditional but slower development<br>• styled-components — Runtime overhead<br>• UnoCSS — Faster but smaller ecosystem |
| **v4 Features** | • `@theme` syntax<br>• Faster compilation<br>• Better CSS variable support<br>• Simplified configuration |

---

### PostCSS

| Item | Content |
|------|---------|
| **Package** | `@tailwindcss/postcss` |
| **Version** | `^4` |
| **Purpose** | CSS processing tool |
| **Why Chosen** | • Required for Tailwind CSS<br>• Supports CSS transformations<br>• Great Next.js integration |
| **Alternatives** | • None, required for Tailwind |
| **Features** | • Process Tailwind directives<br>• CSS optimization<br>• Browser compatibility handling |

---

## Type Definitions

### @types Packages

| Package | Purpose |
|---------|---------|
| `@types/node` | Node.js API type definitions |
| `@types/react` | React type definitions |
| `@types/react-dom` | React DOM type definitions |

**Why needed:**
- Provide TypeScript type support
- Improve development experience
- Type checking and autocomplete

---

## Dependency Graph

### Core Dependency Chain

```
Next.js
    ├─ React
    │   └─ react-dom
    ├─ next-intl (i18n)
    └─ next-mdx-remote (MDX)
        ├─ remark-gfm (Markdown extensions)
        ├─ rehype-slug (Heading IDs)
        └─ rehype-autolink-headings (Heading links)
```

### Development Toolchain

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

## Package Selection Principles

### 1. Prefer Official Solutions

**Principle:** Prioritize framework-recommended packages

**Examples:**
- ✅ next-intl (Next.js officially recommended)
- ✅ eslint-config-next (Next.js official config)

**Rationale:**
- Better integration
- More timely updates
- Better documentation support

---

### 2. Evaluate Maintenance Status

**Principle:** Choose actively maintained packages

**Evaluation metrics:**
- Recent update time
- Issue response speed
- Community activity
- Download count

**Examples:**
- ✅ highlight.js (actively maintained, monthly updates)
- ❌ Deprecated packages

---

### 3. Consider Bundle Size

**Principle:** When features are similar, choose lighter solutions

**Examples:**
- ✅ next-intl (lightweight, designed for Next.js)
- ❌ i18next (powerful but heavier)

**Tools:**
- [Bundlephobia](https://bundlephobia.com/) — Check package size
- Next.js Bundle Analyzer — Analyze bundle

---

### 4. Type Safety First

**Principle:** Prefer packages with TypeScript support

**Examples:**
- ✅ next-intl (complete TypeScript support)
- ✅ next-mdx-remote (complete type definitions)

**Benefits:**
- Better development experience
- Fewer runtime errors
- Easier refactoring

---

### 5. Avoid Over-dependency

**Principle:** Only introduce new packages when necessary

**Evaluation questions:**
1. Is this feature necessary?
2. Can it be implemented with existing packages?
3. Can we implement it ourselves (if cost is reasonable)?
4. What are the long-term maintenance costs?

**Examples:**
- ✅ highlight.js (syntax highlighting is complex, worth introducing)
- ❌ lodash (most features can be implemented with native JS)

---

## Package Update Strategy

### Version Management

**Semantic versioning:** `major.minor.patch`

```json
{
  "next": "16.1.6",             // Fixed version
  "react": "19.2.3",            // Fixed version
  "next-intl": "^4.8.3",        // Allow minor updates
  "highlight.js": "^11.11.1"    // Allow minor updates
}
```

**Strategy:**
- **Core frameworks** (Next.js, React) — Fixed version, manual updates
- **Tool packages** — Allow minor updates (`^`)
- **Dev tools** — Allow minor updates (`^`)

---

### Update Frequency

**Monthly check:**
- Security updates
- Important bug fixes

**Quarterly updates:**
- Minor version updates
- New feature evaluation

**Annual evaluation:**
- Major version updates
- Package replacement evaluation

---

### Update Process

1. **Check updates**
    ```bash
    npm outdated
    ```

2. **Read Changelog**
    - Understand changes
    - Evaluate impact scope

3. **Test update**
    ```bash
    npm update [package]
    npm run build
    npm run dev
    ```

4. **Verify functionality**
    - Manually test core features
    - Check console errors
    - Verify build success

5. **Commit changes**
    ```bash
    git commit -m "chore: update dependencies"
    ```

---

## Future Packages to Consider

### Testing Tools

| Package | Purpose | When to Introduce |
|---------|---------|-------------------|
| Vitest | Unit testing | When complex logic needs testing |
| Playwright | E2E testing | When user flows need testing |
| Testing Library | Component testing | When React components need testing |

---

### Performance Monitoring

| Package | Purpose | When to Introduce |
|---------|---------|-------------------|
| @vercel/analytics | Website analytics | When user behavior tracking is needed |
| @vercel/speed-insights | Performance monitoring | When website performance monitoring is needed |

---

### Content Management

| Package | Purpose | When to Introduce |
|---------|---------|-------------------|
| contentlayer | Content management | When content becomes complex |
| gray-matter | Frontmatter parsing | When more complex metadata is needed |

---

### SEO Optimization

| Package | Purpose | When to Introduce |
|---------|---------|-------------------|
| next-sitemap | Generate sitemap | When SEO optimization is needed |
| next-seo | SEO management | When more granular SEO control is needed |

---

## Package Removal Considerations

### When to Remove Packages

1. **No longer used**
    - Feature removed
    - Replaced by other packages

2. **Maintenance issues**
    - Long-term unmaintained
    - Security issues
    - Incompatible with new versions

3. **Performance concerns**
    - Bundle size too large
    - Lighter alternatives available

4. **Over-dependency**
    - Simple functionality, can implement ourselves
    - Only using a small portion of features

---

### Removal Process

1. **Evaluate impact**
    - Search all usage locations
    - Evaluate alternatives

2. **Implement alternative**
    - Implement functionality ourselves
    - Or introduce alternative package

3. **Test verification**
    - Ensure functionality works
    - Check build success

4. **Remove package**
    ```bash
    npm uninstall [package]
    ```

---

## Summary

### Dependency Management Principles

1. **Minimization Principle**
    - Only introduce necessary packages
    - Avoid packages with duplicate functionality

2. **Quality First**
    - Choose well-maintained packages
    - Prefer official solutions

3. **Performance Consideration**
    - Pay attention to bundle size
    - Evaluate runtime overhead

4. **Long-term Maintenance**
    - Consider update costs
    - Evaluate community activity

### Regular Review

- Monthly security update checks
- Quarterly package status evaluation
- Annual technology stack re-evaluation

### Documentation Maintenance

- Update this document when adding packages
- Record selection rationale
- Record alternatives
- Record use cases
