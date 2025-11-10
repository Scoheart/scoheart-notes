# H5 Specification

## Source Code Management

### Git

所有的源代码 `MUST` 通过 Git 进行管理，并遵循如下约定：

- 仓库默认分支 `MUST` 为 `main`；如需不同命名，`MUST` 在仓库 `README.md` 中说明理由与迁移策略。
- `main` 与发布分支 `MUST` 启用保护（禁止直接推送、禁止强制推送）；合入 `MUST` 通过受控流程完成。
- 提交历史 `SHOULD` 保持线性；合入策略 `SHOULD` 采用 “Squash” 或 “Rebase + Merge”。
- 提交信息 `SHOULD` 结构化且清晰（建议遵循 Conventional Commits）；至少 `MUST` 说明变更目的与影响范围。
- 大型二进制文件 `MUST` 使用 Git LFS 或制品库管理；源码仓库 `MUST NOT` 存放未经管理的二进制制品。

### GitLab

所有的源代码仓库 `MUST` 托管在企业私有部署的 GitLab 上，且项目可见性 `MUST` 为私有；访问控制 `MUST` 使用最小权限原则。

| Project                                            | GitLab 私服地址                     |
| -------------------------------------------------- | ----------------------------------- |
| 网约车 & 代驾                                      | https://gitlab.bailongma-inc.com/   |
| 巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 | http://gitlab-qx.bailongma-inc.com/ |

### Trunk-Based Development / GitHub Flow

团队 `MAY` 选择 Trunk-Based Development 或 GitHub Flow；无论采用何种流程，变更集成 `MUST` 遵循：

- 变更 `MUST` 在短生命周期功能分支进行；分支命名 `SHOULD` 使用前缀（例如 `feature/*`、`bugfix/*`、`hotfix/*`）。
- 合入 `MUST` 通过 Pull/Merge Request 完成，且至少 1 名 Reviewer `MUST` 审核通过。
- 所有 Request `MUST` 通过 CI；流水线失败的变更 `MUST NOT` 合入主干。
- 直接推送至 `main`/受保护分支 `MUST NOT` 发生；紧急情况 `MAY` 由维护者在受控流程下执行并记录。
- Hotfix 分支 `MUST` 从最新主干或发布分支切出，合入后 `MUST` 回合并（cherry-pick 或同步）到相关分支。

可用的变更通道：GitHub Pull Request / GitLab Merge Request / Google Change Request (AOSP)。

### Repository Strategy

#### Polyrepo

Polyrepo 适用于边界清晰、低耦合的应用或库，仓库边界与发布方式 `MUST` 明确：

- 跨仓库依赖 `MUST` 通过包管理器进行版本化发布；直接嵌入子模块或路径依赖 `SHOULD NOT` 作为常态方案。
- 公共库 `MUST` 发布到内部包仓库（如企业 npm Registry）；应用 `MUST NOT` 直接引用未发布的私有源文件。
- 版本发布与变更日志 `MUST` 在各自仓库独立维护，确保可追溯性。

#### Monorepo

Monorepo 仓库 `MUST` 使用 pnpm 管理依赖，并 `MUST` 使用 pnpm workspace 管理 packages。

Monorepo 仓库的文件目录结构 `MUST` 遵循如下结构：

```
.
├── apps
├── packages
├── pnpm-workspace.yaml
└── README.md
```

- `apps/` 目录 **MUST** 仅存放应用，每个应用 **MUST** 具有独立的 `package.json`，且 `name` **MUST** 唯一。
- `packages/` 目录 **MUST** 仅存放库，每个库 **MUST** 具有独立的 `package.json`，并 **SHOULD** 通过 `exports`/`types` 明确入口。
- `pnpm-workspace.yaml` **MUST** 定义工作空间范围；`README.md` **MUST** 说明仓库结构、开发/发布流程与约定。

---

## HTML

---

## CSS

### CSS Coding Style

#### Property Order

- CSS 属性的顺序，`SHOULD` 遵循 **RECESS / Bootstrap** 的属性顺序（以 `stylelint-config-recess-order` 为准）。

1. **Positioning**：`position` / `top|right|bottom|left` / `z-index`
2. **Display & Flow**：`display` / `float` / `clear` / `visibility` / `overflow*`
3. **Flex & Grid**：`flex*` / `grid*` / `place-*` / `justify-*` / `align-*`
4. **Box Model**：`box-sizing` / `width|height|min|max-*` / `margin` / `padding` / `border*` / `border-radius`
5. **Background & Effects**：`background*` / `box-shadow` / `opacity` / `filter`
6. **Typography**：`font*` / `line-height` / `text-*` / `white-space` / `letter-spacing` / `word-*`
7. **Interaction & Motion**：`cursor` / `transition*` / `animation*` / `transform*` / `will-change`
8. **Misc**：`content` / 自定义属性（`--var`）等

**示例（正确排序）**：

```css
.card {
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;

  box-sizing: border-box;
  width: 320px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  font-size: 14px;
  line-height: 1.6;
  color: #111827;

  transition: box-shadow 0.2s ease;
}
```

#### Naming Convention

CSS 代码的命名，`MUST` 使用 BEM 规范，语法：`<block>__<element>--<modifier>`。

kebab-case（小写短横线）；允许 a-z、0-9、-；不使用中文、空格与下划线作分隔。

元素（Element）不能脱离其 Block；修饰（Modifier）并列为独立类，不做连缀拼接。

禁止使用 ID 选择器与标签耦合提升特指度（如 button.btn、#app .card）。

HTML 代码示例：

```html
<button class="btn btn--primary">
  <span class="btn__icon" aria-hidden="true"></span>
  <span class="btn__label">Submit</span>
</button>
```

CSS 代码示例（正确命名）：

```css
.btn {
  /* Block */
}
.btn__icon {
  /* Element */
}
.btn__label {
  /* Element */
}
.btn--primary {
  /* Modifier */
}
/* 并列多个修饰符（推荐写法：多个类并列） */
.btn.btn--primary.btn--large {
}
```

CSS 代码示例（非法命名）：

```css
/* 驼峰命名（不允许） */
.productCard__title {
}

/* 元素嵌套元素（避免深层结构） */
.card__header__title {
}

/* 修饰符连缀（不允许） */
.btn--primary--large {
}
```

#### Maintainability

- 选择器特指度 `MUST` 保持低；层级 `MUST NOT` 超过 **2**；
- 选择器 `MUST NOT` 与标签或 ID 耦合提升特指度（例如 `ul.menu__item`、`#app .card`）。
- 预处理器嵌套（SCSS/Less） `MUST NOT` 超过 **3** 层；如因第三方覆盖需要超限，`MUST` 在 PR 说明并添加注释。
- `!important` `MUST NOT` 作为常规覆盖手段；若使用，`MUST` 在代码注释或 PR 中说明原因与替代方案不可行性。
- 对会重置子属性的简写（如 `background`、`font`） `SHOULD NOT` 使用；确需使用时 `MUST` 确认无意外覆盖；`margin`/`padding`； `MAY` 使用简写以提升可读性。

### CSS Modularization

#### Vue scoped

- 单文件组件中的 `<style scoped>` `MUST` 用于轻量按组件隔离样式；其生成的选择器属性（例如 data-v-xxxx）`MUST NOT` 作为业务逻辑或测试选择器依赖。
- 同一组件的主要样式隔离策略 `MUST` 二选一：CSS Modules 或 scoped；二者在同一组件中混用 `MUST NOT` 成为常态（仅可用于少量、明确的例外）。
- 父组件需要影响子组件内部结构时 `MUST` 使用 `:deep(...)`；无界限的后代选择（如 `.parent .child .grandchild`）`MUST NOT` 取代 `:deep`。
- 插槽内容样式 `SHOULD` 使用 `:slotted(...)` 进行定向作用；对未命名插槽进行全量覆盖 `SHOULD NOT` 采用宽泛的 `*` 选择器。
- 全局 Reset、主题变量与版式基线 `MUST` 存放于非 scoped 的全局样式或分层样式（如 `@layer base`）；在 scoped 块中实现 Reset `MUST NOT` 期望影响组件外部。
- 需要跨组件共享的动画与关键帧命名 `SHOULD` 统一前缀或置于全局层；在 scoped 中定义的关键帧是否被重写取决于构建配置，名称冲突 `MUST NOT` 发生。
- 深度选择器与全局出口 `MUST` 精确到必要范围；广义的 `:deep(_)` 或 `:global(_)` `MUST NOT` 使用。
- 为了主题与可维护性，颜色与间距 `SHOULD` 使用 CSS 自定义属性；覆盖主题时 `MUST` 通过变量或修饰符类完成，而非在 scoped 中复制粘贴整段规则。

#### CSS Moduels

### CSS Framework

#### Less

项目中的 CSS 代码，`MUST` 使用 Less 预处理器。

Less 的版本 `MUST` 为下面表格中的版本：

| Version |
| ------- |
| v4.0.0  |

- 设计与主题相关的值 `MUST` 抽象为 Less 变量；变量命名 `SHOULD` 使用 `kebab-case` 与语义化前缀（例如 `@color-brand`、`@space-2`）。
- 「魔法值」`MUST NOT` 直接硬编码；如存在历史遗留，`MUST` 追加注释说明来源与影响面。
- 常用模式（圆角、阴影、断点容器等）`SHOULD` 封装为参数化 mixin；mixin `SHOULD NOT` 形成深层依赖链（> 2 层）。
- 需要运行时切换的主题/品牌色 `SHOULD` 以 CSS 自定义属性（变量）输出，Less 仅负责生成默认值或派生计算。

---

## ECMAScript

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript 2015（ES6）的标准。

---

## JavaScript Engine & Runtime

### Development Environment 开发环境

本地开发时，项目 `MUST` 通过 `Node.js` 这个 JavaScript Runtime 执行项目的源代码。

且 `Node.js` 的版本 `MUST` 为下面表格中的版本：

| Version | N-API version | npm version | V8 version  |
| ------- | ------------- | ----------- | ----------- |
| 16.20.2 | v93           | v8.19.4     | v9.4.146.26 |

### Test Environment 测试环境

项目在测试环境的构建任务，`MUST` 在下面表格中的环境中执行。

- Host (Linux)

| Operating System             | Kernel                     | Architecture | CPU                                                  |
| ---------------------------- | -------------------------- | ------------ | ---------------------------------------------------- |
| CentOS Linux 7.6.1810 (Core) | 3.10.0-957.27.2.el7.x86_64 | x86_64       | Intel Xeon Platinum 8269CY @ 2.50GHz, 8 vCPU (1×4×2) |

- Node.js

| Version | N-API version | npm version | V8 version  |
| ------- | ------------- | ----------- | ----------- |
| 16.20.2 | v93           | v8.19.4     | v9.4.146.26 |

触发且启动项目在测试环境的构建任务，`MUST` 通过 Bone3 平台的发布任务来触发且启动。

### Production Environment 生产环境

生产环境中的静态资源，`MUST` 被部署在阿里云 OSS 对象存储，用户可以通过任何客户端访问到项目，经阿里云 CDN (Swift/Tengine) 缓存分发，最终到达用户客户端。

- Browserslist

生产环境中，项目 `MUST` 支持符合 Browserslist 中 `[production]` 部分的浏览器版本。

```
# .browserslistrc

[production]
# 同代下限：以 Android 5.0（2014-11）为锚点
# 桌面
chrome >= 38
firefox >= 32
safari >= 8
edge >= 12

# 移动
and_chr >= 38       # Chrome for Android（与 Lollipop 同时代）
ios_saf >= 8
samsung >= 2
opera >= 25
op_mob >= 25

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```

## JavaScript Module System

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript Modules (ESM) 系统。

import 语句的使用方法如下所示：

```javascript
// default import
import module from "./module.js";

// named import
import { name } from "./module.js";

// all import
import * as module from "./module.js";

// import as
import { name as alias } from "./module.js";
```

export 语句的使用方法如下所示：

```javascript
// default export
export default function () {
  console.log("Hello, world!");
}

// named export
export function name() {
  console.log("Hello, world!");
}

// all export
export * from "./module.js";

// export as
export { name as alias } from "./module.js";
```

## JavaScript Flavours

本节定义项目采用的语言风格与类型检查策略：优先 TypeScript；在不使用 TS 的场景下，使用 JSDoc + tsc 提供等价的静态检查。所有变体 `MUST` 与 ESM 模块系统保持一致。

### TypeScript

- `MUST` 使用严格类型检查（`strict: true`）
- `MUST` 开启强制文件名大小写一致性（`forceConsistentCasingInFileNames: true`）。
- 应用项目 `MUST` 仅类型检查（`noEmit: true`），构建与打包交由工具链完成。
- 库项目 `MUST` 产出 `.d.ts` 类型声明，并明确输出目录与模块格式。
- 运行时 `MUST` 对齐最低能力：`target: "ES2020"`；浏览器项目 `MUST` 包含 `DOM` 库。
- 模块解析 `SHOULD` 使用 `NodeNext` 以支持 `exports`/`imports` 字段。

#### tsconfig.json - 应用项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "types": []
    // "baseUrl": ".",
    // "paths": { "@/*": ["src/*"] }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### tsconfig.json - 库项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist/types",
    "composite": true,
    "incremental": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### tsconfig.json - 结构化配置

- `SHOULD` 拆分配置：`tsconfig.base.json`（通用）+ `tsconfig.app.json`（应用）+ `tsconfig.test.json`（测试）。
- 测试环境 `SHOULD` 对齐测试工具：例如 Vitest/Jest 的 `types` 与路径别名；Vue 项目使用 `vue-tsc` 做 SFC 类型检查。

### JavaScript + JSDoc + tsc + `@/types/*.d.ts`

未使用 TypeScript 的项目 `MUST` 通过 JSDoc + `tsc` 实现项目级类型检查；公共类型 `MUST` 手工维护于 `@/types/*.d.ts` 并作为单一可信源。

#### 文件级类型检查

文件级类型检查 `MUST` 使用 `@ts-check`；`MUST NOT` 使用 `@ts-nocheck`（除非有记录的豁免与到期日）。

#### 项目级类型检查

项目级类型检查 `MUST` 使用 `tsconfig.json` 配置文件。

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "skipLibCheck": true,
    "types": [],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["types/*"]
    }
  },
  "include": ["src/**/*", "types/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### 类型模型目录（`@/types/*.d.ts`）

- 所有公共类型 `MUST` 集中在 `types/`（例如 `types/index.d.ts`、`types/env.d.ts`、`types/components.d.ts`）。
- 文件 `MUST` 为模块化声明（使用 `export`/`import`），避免全局污染；如需扩展全局，`MUST` 使用 `declare global` 并以 `export {}` 结尾。
- 大型项目 `SHOULD` 按业务域拆分类型文件，并通过 `types/index.d.ts` 统一导出聚合。

```ts
// types/index.d.ts
export interface User {
  id: string;
  active?: boolean;
}
export type Result<T> = { ok: true; data: T } | { ok: false; error: Error };

declare global {
  interface Window {
    APP_VERSION: string;
  }
}
export {};
```

```ts
// types/env.d.ts
export interface BuildMeta {
  commit: string;
  date: string;
}
```

#### JSDoc 用法

```javascript
// @ts-check

/** @typedef {import('@/types').User} User */

/**
 * 根据用户激活状态生成标签
 * @param {User} user
 * @returns {string}
 */
export function label(user) {
  return user.active === true ? `active:${user.id}` : `inactive:${user.id}`;
}

/**
 * 列表计数（泛型）
 * @template T
 * @param {T[]} list
 * @returns {number}
 */
export const count = (list) => list.length;
```

## Package Manager

### corepack

- 包管理器 `MUST` 使用 Corepack 统一管理，并与项目约定的 Node LTS 版本对齐。
- 团队与 CI `MUST` 启用 Corepack 并通过 `package.json#packageManager` 精确钉住包管理器版本，避免版本漂移与锁文件差异。
- 单仓库 `MUST` 仅使用一种包管理器（pnpm 优先）；混用（npm/yarn/pnpm）`MUST NOT`。
- 锁文件（`pnpm-lock.yaml`/`package-lock.json`/`yarn.lock`）`MUST` 提交版本控制，`MUST NOT` 手工编辑。

### package.json

- 根 `package.json` `MUST` 添加 `packageManager` 字段，格式为：`<manager>@<version>+<checksum>`；子包 `SHOULD` 省略该字段，继承根设置。
- 应用 `SHOULD` 设置 `private: true` 避免误发布；库 `MAY` 配置 `publishConfig`（如 `access`, `registry`）。
- 运行环境 `SHOULD` 通过 `engines` 限定（Node、pnpm 等），并在 CI 强制：pnpm 使用 `--frozen-lockfile`，npm 使用 `npm ci`，yarn 使用 `--immutable`。

```json
// example
{
  "packageManager": "pnpm@9.4.0+sha512.f549b8a52c9d2b8536762f99c0722205efc5af913e77835dbccc3b0b0b2ca9e7dc8022b78062c17291c48e88749c70ce88eb5a74f1fa8c4bf5e18bb46c8bd83a"
}
```

### registry

- 依赖拉取 `MUST` 使用以下对应的内部 registry；`MUST NOT` 擅自切换至公共 registry（除非依赖审计允许并记录）。
- 多项目协作 `SHOULD` 按团队/产品线统一 registry，并在 `.npmrc` 固化，减少环境差异。

| Project                                            | Registry URL                                                    |
| -------------------------------------------------- | --------------------------------------------------------------- |
| 网约车 & 代驾                                      | http://192.168.200.216/nexus/content/groups/npm-group/          |
| 巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 | http://npm-qx.bailongma-inc.com/nexus/content/groups/npm-group/ |

### config

无论使用何种包管理器，`MUST` 在项目根目录创建 `.npmrc` 并固定 registry：

```ini
registry=<registry-url>
```

#### pnpm config

如果使用的是 pnpm，`.npmrc` `MUST` 增加如下配置：

```ini
# Node-Modules Settings [https://pnpm.io/9.x/npmrc?#node-modules-settings]
node-linker=hoisted

# Peer Dependency Settings [https://pnpm.io/9.x/npmrc?#peer-dependency-settings]
auto-install-peers=true
dedupe-peer-dependents=true
strict-peer-dependencies=false
resolve-peers-from-workspace-root=false
```

## Build Toolchains

### Overview

构建工具链 `MUST` 至少包含以下组件：Formatter、Linter、Compiler/Transpiler、Bundler 与 CI 强制策略。各组件 `MUST` 与项目的浏览器兼容策略（见 `.browserslistrc`）与语言/框架选择（Vue 2、Less）保持一致。

### Formatters

- 代码格式化 `MUST` 使用 Prettier，并在 CI 中 `MUST` 以只读模式校验（`prettier --check .`）。
- 基线配置 `SHOULD` 如下；项目可根据需要 `MAY` 细化，但 `MUST NOT` 引入不一致的风格于同一仓库。

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Linters

- JavaScript/TypeScript 代码质量检查 `MUST` 使用 ESLint，并与 Prettier `MUST` 集成以消除风格冲突。
- Vue 2 项目 `MUST` 启用 `eslint-plugin-vue` 的推荐规则集；环境与解析器选项 `MUST` 明确。
- CI 中 `MUST` 执行 `eslint .` 并且不得有错误；警告 `SHOULD` 控制在团队约定阈值之内。

示例基线（可按项目 `MAY` 调整）：

```json
{
  "env": { "browser": true, "es6": true, "node": true },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": { "ecmaVersion": 2020, "sourceType": "module" },
  "rules": {}
}
```

- 样式代码检查 `SHOULD` 使用 Stylelint，并 `SHOULD` 采用 `stylelint-config-standard` 与 `stylelint-config-recess-order`；与 CSS 章节的属性顺序规范保持一致。

### Compiler/Transpiler

- 代码兼容性 `MUST` 通过编译/转译实现；工具 `MAY` 在 Babel 与 SWC 中选用其一，但同一项目 `MUST` 统一。
- 目标环境 `MUST` 以 `.browserslistrc` 的 `[production]` 为准；polyfill 策略 `SHOULD` 采用“按需注入”。

Babel 基线示例：

```json
{
  "presets": [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]]
}
```

SWC 基线示例：

```json
{
  "jsc": { "target": "es2019" },
  "env": { "targets": "defaults" }
}
```

### Bundler

#### Vite

- 新项目 `MUST` 使用 Vite；现有项目 `SHOULD` 迁移至 Vite 于合适窗口。
- Vite 版本 `MUST` 固定为：

| Version |
| ------- |
| v4.5.3  |

- 配置 `SHOULD` 至少包含 Vue 插件与与兼容性相关的 Legacy 插件；Less 预处理 `MUST` 正确接入。

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // 与 .browserslistrc 保持一致
      targets: ["chrome >= 38", "firefox >= 32", "safari >= 8", "edge >= 12"],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true },
    },
  },
});
```

#### Webpack

- 既有项目 `MAY` 保留 Webpack；新项目 `SHOULD NOT` 引入 Webpack，除非有明确技术约束并记录。
- Vue 2 与 Less 的最小可用配置 `SHOULD` 如下（版本与 loader `MUST` 与依赖匹配）：

```js
module.exports = {
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.[jt]sx?$/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```

## Front-End Framework

### Vue 2

- 框架选择 `MUST` 为 Vue 2；版本 `MUST` 固定为：

| Version |
| ------- |
| v2.7.16 |

- 入口文件 `MUST` 最小化且显式启用生产提示关闭；运行时构建与模板编译的选择 `MUST` 与构建工具一致（Vite/webpack）。

示例入口：

```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

- 单文件组件 `MUST` 使用 `<script>`（或 `<script lang=ts>` 在 TS 项目中）；样式隔离策略 `MUST` 与 CSS 章节保持一致（scoped 或 CSS Modules 二选一）。
- 插件注册与全局资源（组件/指令/过滤器） `SHOULD` 在独立模块集中管理；避免在多处重复注册导致行为不一致。
- 构建产物 `MUST` 遵循浏览器兼容策略；必要时 `SHOULD` 使用 `@vitejs/plugin-legacy` 或 Babel 以满足低版本需求。

### Vue Style Guide

#### `MUST` Use multi-word component names

User component names should always be multi-word, except for root App components. This prevents conflicts with existing and future HTML elements, since all HTML elements are a single word.

Bad Case:

```vue
<!-- in pre-compiled templates -->
<Item />

<!-- in in-DOM templates -->
<item></item>
```

Good Case:

```vue
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

#### `MUST` Use detailed prop definitions

####

## Router

项目路由 `MUST` 使用 Vue Router 3；版本 `MUST` 固定为：

| Version |
| ------- |
| v3.6.5  |

- 路由模式选择（`hash` / `history`）`MUST` 明确；`history` 模式 `MUST` 配合服务端重写规则。
- 路由文件组织 `SHOULD` 模块化（基础路由 + 业务模块路由聚合）；动态加载 `SHOULD` 使用懒加载以优化首屏。

示例：

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{ path: "/", component: () => import("./pages/Home.vue") }];

export default new VueRouter({
  mode: "hash",
  routes,
});
```

## State Management

- 状态管理 `MUST` 使用 Pinia；版本 `MUST` 固定为：

| Version |
| ------- |
| v2.0.26 |

- Pinia `MUST` 在应用创建时初始化并注入；Store `SHOULD` 按领域拆分、避免跨域耦合。

示例初始化：

```js
import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);

const pinia = createPinia();
export default pinia;
```

示例 Store：

```js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ name: "" }),
  actions: {
    setName(n) {
      this.name = n;
    },
  },
});
```

## Ecosystem / Libraries / Utils

### blm-ui

### Lodash

### Network

#### HTTP Request

#### HTTP Response

### Log Monitor

### DevTools

### Date

### JS Bridge

###

## Questions

Q1: 需要支持的最低的浏览器版本是多少？

A：暂时不确定，可以通过给 SLS 添加特定的打点，来确定用户的浏览器版本

## Appendix

### ECMAScript Versions & Features

下表汇总 ECMAScript 各版本与主要特性；每个版本的特性以换行分隔，便于快速查阅与对照兼容策略。

| ECMAScript Version | Key Features                                                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ES5                | strict mode<br>JSON<br>Object.create<br>Array extras (map/filter/reduce)<br>Function.bind                                                                                         |
| ES5.1              | Editorial corrections and clarifications to ES5 (e.g., JSON)                                                                                                                      |
| ES2015 (ES6)       | let/const<br>arrow functions<br>classes<br>template literals<br>destructuring<br>default/rest/spread<br>modules (import/export)<br>Promises<br>Map/Set<br>Symbol<br>Proxy/Reflect |
| ES2016             | Array.prototype.includes<br>Exponentiation operator (`**`)                                                                                                                        |
| ES2017             | async/await<br>Object.values / Object.entries<br>Object.getOwnPropertyDescriptors<br>SharedArrayBuffer / Atomics                                                                  |
| ES2018             | Object rest/spread<br>async iterators (for await...of)<br>Promise.prototype.finally<br>RegExp: dotAll (`s`) / named groups / lookbehind / Unicode property escapes                |
| ES2019             | Array.prototype.flat / flatMap<br>Object.fromEntries<br>String.prototype.trimStart / trimEnd<br>Symbol.prototype.description                                                      |
| ES2020             | Optional chaining (`?.`)<br>Nullish coalescing (`??`)<br>BigInt<br>dynamic `import()`<br>globalThis<br>Promise.allSettled                                                         |
| ES2021             | Logical assignment (`&&=` / `\|\|=` / `??=`)<br>String.prototype.replaceAll<br>Promise.any<br>WeakRef / FinalizationRegistry                                                      |
| ES2022             | Class fields (public)<br>Private fields/methods/accessors (`#`)<br>Top-level await<br>RegExp match indices (`d`)                                                                  |
| ES2023             | Array by copy: `toSorted` / `toReversed` / `toSpliced` / `with`<br>`findLast` / `findLastIndex`<br>Hashbang grammar (`#!`)                                                        |
| ES2024             | `Object.groupBy` / `Map.groupBy`<br>Set methods: `union` / `intersection` / `difference` / `symmetricDifference`<br>`Promise.withResolvers`                                       |

注：Proxy/Reflect `MUST NOT` 期望通过 Polyfill 提供完整行为；如需兼容，`MUST` 通过降级策略与运行时能力检测（feature detection）处理。
