# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ducci is a Next.js 15 e-commerce website built with React 19, TypeScript, and Tailwind CSS. It's a Spanish-language site for a bakery/food business featuring products, branches, contact forms, and newsletter functionality.

## Development Commands

**Development server:**
```bash
npm run dev
# Uses Next.js 15 with Turbopack for faster builds
# Opens at http://localhost:3000
```

**Build:**
```bash
npm run build
# Production build using Turbopack
```

**Start production server:**
```bash
npm start
```

**Linting:**
```bash
npm run lint
# Uses Biome (not ESLint) - checks code quality and formatting
```

**Formatting:**
```bash
npm run format
# Uses Biome to format code with 2-space indentation
```

## Architecture

### Project Structure

The codebase follows a feature-based architecture:

- **`app/`** - Next.js App Router pages and layouts
  - `app/(pages)/` - Route group containing all main pages (nosotros, productos, sucursales, contacto, pedidos)
  - `app/(pages)/layout.tsx` - Shared layout with Header and Footer for all pages
  - `app/layout.tsx` - Root layout with font configuration, Lenis smooth scrolling, and toast notifications

- **`feature/`** - Feature modules, each containing page-level components and logic
  - Each feature exports an `index.tsx` as the main component
  - Features: `home`, `about`, `products`, `branches`, `contact`, `orders`
  - Home feature contains section components: `hero`, `about`, `products`, `branches`, `newsletter`, `carousel-products`

- **`components/`** - Reusable UI components
  - `header/` - Navigation with overlay menu
  - `footer/` - Footer with nav, social, address
  - `content-block/` - Compound component pattern with context (see below)
  - `ui/` - shadcn/ui components (button, input, select, label, textarea)
  - `products/`, `small-banner/`, `section-header/`, etc.

- **`constants/`** - Static data (navigation, products, branches)
- **`types/`** - TypeScript type definitions
- **`lib/`** - Utilities and validations
- **`services/`** - API services (e.g., contact form submission)
- **`hooks/`** - Custom React hooks
- **`public/images/`** - Static assets

### Key Patterns

**Compound Component Pattern:**
The `content-block` component uses a compound component pattern with React Context:
```tsx
<Block>
  <Block.Title>Title</Block.Title>
  <Block.Subtitle>Subtitle</Block.Subtitle>
  <Block.Content>Content</Block.Content>
  <Block.Body>Body</Block.Body>
  <Block.Footer>Footer</Block.Footer>
</Block>
```
Components must be used within the parent `<Block>` component or an error will be thrown.

**Component Variants:**
Components often have a "Default" variant exported separately (e.g., `HeaderDefault`, `FooterDefault`) which are composed versions ready to use.

**File Organization:**
- Each feature has its own `style/` directory with CSS files
- Components are either single files or directories with an `index.tsx`
- TypeScript types use `.type.ts` suffix
- Services use `.service.ts` suffix
- Validations use `.validation.ts` suffix

### Styling

- **Tailwind CSS 4** with PostCSS
- **Custom CSS files** for complex styling (CSS modules pattern with `.module.css` for some components)
- Uses `cn()` utility from `lib/utils.ts` for conditional class merging (clsx + tailwind-merge)
- CSS custom properties for theme colors (e.g., `--font-poppins`, `--font-dm-sans`)

### Animations

- **GSAP** for advanced animations (ScrollTrigger, ScrollSmoother)
- **Lenis** for smooth scrolling (configured in root layout)
- Custom animation hooks in feature directories (e.g., `feature/home/components/hero/hooks/useHeroAnimation.ts`)

### Forms

- **react-hook-form** with **Zod** validation via `@hookform/resolvers`
- Form schemas in `lib/validations/`
- **react-hot-toast** for notifications (configured globally in root layout with custom styling)

### Path Aliases

Uses `@/*` for root-level imports (configured in `tsconfig.json`)

### Configuration Notes

- **Biome** is the linter/formatter (not ESLint/Prettier) - 2-space indentation, organized imports enabled
- **Turbopack** enabled for dev and build
- Image domains configured for `html.designingmedia.com` in `next.config.ts`
- Language is Spanish (`lang="es"` in root layout)
- Uses Google Fonts (Poppins and DM Sans) via `next/font`

### Git Workflow

The main branch is `main`. Current development includes:
- New carousel products component
- Hero animation improvements
- Product cards and styling updates
- Newsletter and branches sections
