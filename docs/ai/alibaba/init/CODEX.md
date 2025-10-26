# Repository Guidelines

## Project Structure & Module Organization
This Vue 2.7 SPA starts in `src/main.js`, mounts `src/App.vue`, and wires routing/state through `src/router` and `src/store`. Feature flows live inside `src/pages` and `src/views`, while reusable hooks, services, and constants sit in `src/composables`, `src/common`, `src/api`, and `dict.js`. Assets belong in `src/assets`, shared tokens in `src/styles`, and mock data in `src/mock`. Keep deployment switches in `src/config` so channel-specific bundles (`litong`, `daily`) override config, not components.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies with pnpm 8.15.9 (use Node 16.20.2 from `.nvmrc`).  
- `pnpm dev` / `pnpm dev:litong` — launch `vue-cli-service serve`; the `litong` variant injects `CHANNEL_ENV=litong`.  
- `pnpm build`, `pnpm build:litong`, `pnpm build:daily` — produce optimized bundles for each release lane.  
- `pnpm lint` — run ESLint + Vue Essential; required before commits and PRs.  
- `pnpm analyzer` — rebuild with `npm_config_report=true` to inspect webpack bundles.  
- `pnpm install:w` or `pnpm install:qx` — execute the `shell/` helpers that configure Alibaba or Bailongma mirrors.

## Coding Style & Naming Conventions
Linting follows ESLint Standard with Vue Essential, while formatting follows `.prettierrc` (two spaces, single quotes, no semicolons, no trailing commas). Keep Vue components and Vuex modules in PascalCase (`DriverScoreCard.vue`), composables and stores in camelCase (`useTrend.js`), and utilities in kebab-case. Import shared styles through `@/styles/index.less` so webpack aliasing remains intact. When expanding a feature, colocate routes, components, and assets within `src/pages/<feature>` to preserve lazy-loaded chunks and keep entry files lean.

## Testing Guidelines
Automated unit tests are not yet wired in, so every change should cover linting, targeted flows inside `pnpm dev`, and `vconsole` network snapshots. When adding coverage, favor Vue Test Utils with Jest, place specs under `src/__tests__` or `tests/unit`, and name files `<feature>.spec.js`. Stub HTTP calls via `src/mock` to keep score calculations reproducible. Until a `test:unit` script lands in `package.json`, log manual QA steps inside the PR checklist.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits such as `feat: loading效果添加`, `fix: 分数小数位展示修复`, or scoped forms like `refactor(designated-driver)!`. Use `pnpm commit` (alias of `robot run commit`) to invoke the Robot CLI, pick the approved scope, and satisfy husky hooks. PRs should summarize the user scenario, list the commands run (dev/build/lint), and attach screenshots or screen recordings for UI or animation changes. Reference internal issue IDs, note configuration changes (`src/config`, environment variables), and call `robot run ak` when the change impacts a monitored release or service-score metric.
