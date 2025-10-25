# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is **scoheart-notes**, a personal knowledge base and blog repository containing:
- Technical documentation and notes (in `docs/`)
- A Next.js-based blog built with Nextra (in `scoheart/project/`)
- LeetCode solutions and computer science study materials (in `docs/408/`)
- Backup projects and archived code (in `scoheart/backup/`)

## Architecture

### Nextra Blog (scoheart/project/)

The main blog application is a **Next.js 13 + Nextra** static site generator:

- **Framework**: Next.js 13 with Nextra theme (nextra-theme-docs)
- **Configuration**: `theme.config.tsx` contains the entire site configuration including:
  - Navigation, sidebar, search, banner, and footer settings
  - Custom logo component in `components/logo/logo.tsx`
  - Primary color hues (dark: 180, light: 280)
- **Content Structure**: Content lives in `pages/` directory, organized by topic:
  - `blog/` - Blog posts
  - `computer-science-basics/` - CS fundamentals (databases, etc.)
  - `development/` - Development topics
  - `programming-languages/` - Language-specific content
  - `interview/` - Interview preparation
  - `daily/` - Daily notes
- **Routing**: Nextra uses file-based routing; `.mdx` and `.md` files become pages
- **Meta files**: `_meta.zh.json` files control sidebar ordering and titles
- **Styling**: Uses CSS modules (`theme.module.css`) and Sass

### Documentation Structure (docs/)

Organized by topic area:
- `docs/408/` - Computer science coursework (408 exam prep):
  - `dsa/` - Data structures, algorithms, and LeetCode solutions (TypeScript)
  - `network/` - Networking concepts (HTTP, etc.)
  - `os/` - Operating systems
- `docs/ai/` - AI and development tools documentation
- `docs/dev/` - Development notes (JS, React Native, NestJS, Electron, iOS, C++)
- `docs/lilin/` - Personal notes

### Other Directories

- `scoheart/backup/` - Archived projects (Vue demos, old blog content, interview prep)
- `scoheart/resume/` - Resume materials
- `scoheart/blog/`, `scoheart/pl/`, etc. - Miscellaneous notes and code snippets
- `assets/` - Static assets

## Common Commands

### Nextra Blog Development

All blog-related commands should be run from the `scoheart/project/` directory:

```bash
cd scoheart/project
pnpm i              # Install dependencies
pnpm dev            # Start dev server on localhost:3000
pnpm build          # Build for production
pnpm start          # Start production server
pnpm push           # Git add, commit with "feat: add new posts", and push
```

**Package Manager**: This project uses **pnpm@9.4.0** (specified in packageManager field).

### Root Level

Node.js version requirement: **>=22.0.0** (see `.nvmrc` and package.json engines)

TypeScript is available at the root level with `@types/node` dependency.

## Development Workflow

### Adding Blog Content

1. Create `.md` or `.mdx` files in the appropriate `scoheart/project/pages/` subdirectory
2. Update corresponding `_meta.zh.json` if you want to customize the sidebar ordering or title
3. Run `pnpm dev` from `scoheart/project/` to preview changes
4. Use `pnpm push` for a quick commit and push (though Claude Code typically handles git operations more precisely)

### LeetCode Solutions

LeetCode solutions are in `docs/408/dsa/leetcode/` and `docs/408/dsa/leetcode_cn/`:
- Each problem has its own directory named `[problem-number]. [problem-title]/`
- Solutions are typically named `a.ts`, `b.ts`, etc. (different approaches)
- These are standalone TypeScript files (not part of a build system)

### Working with TypeScript

- Blog uses TypeScript with `strict: false` (see `scoheart/project/tsconfig.json`)
- Target is ES5 with JSX preserve mode for Next.js
- Root level TypeScript is configured for Node.js with ES modules (`"type": "module"` in package.json)

## Important Notes

- **Working Directory**: When working on the blog, always ensure commands are run from `scoheart/project/`, not the repository root
- **Content vs Code**: Most content is documentation (`.md` files); the actual code project is `scoheart/project/`
- **Chinese Content**: Some content and meta files use Chinese (`zh.json`, `index.zh.mdx`)
- **Backup Directory**: `scoheart/backup/` contains old/archived code; avoid modifying unless specifically requested
