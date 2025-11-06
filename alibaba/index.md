# H5 Projcet Specification

## Source Code Management

### Git

所有的源代码都 `MUST` 通过 Git 进行管理。

### Gitlab

所有的源代码仓库都 `MUST` 托管在企业私有部署的 Gitlab 上。

网约车 & 代驾 项目 Gitlab 私服地址：`https://gitlab.bailongma-inc.com/`

巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 项目 Gitlab 私服地址：`http://gitlab-qx.bailongma-inc.com/`

### Trunk-Based Development / Github Flow

- MR
- PR
- CR

### Repository Strategy

#### polyrepo

#### Monorepo

Monorepo 仓库，使用 pnpm 来进行依赖包的管理，使用 pnpm workspace 来管理 packages。

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

#### CSS Moduels

#### Vue scoped

- 单文件组件中的 `<style scoped>` `MUST` 用于轻量按组件隔离样式；其生成的选择器属性（例如 data-v-xxxx）`MUST NOT` 作为业务逻辑或测试选择器依赖。
- 同一组件的主要样式隔离策略 `MUST` 二选一：CSS Modules 或 scoped；二者在同一组件中混用 `MUST NOT` 成为常态（仅可用于少量、明确的例外）。
- 父组件需要影响子组件内部结构时 `MUST` 使用 `:deep(...)`；无界限的后代选择（如 `.parent .child .grandchild`）`MUST NOT` 取代 `:deep`。
- 插槽内容样式 `SHOULD` 使用 `:slotted(...)` 进行定向作用；对未命名插槽进行全量覆盖 `SHOULD NOT` 采用宽泛的 `*` 选择器。
- 全局 Reset、主题变量与版式基线 `MUST` 存放于非 scoped 的全局样式或分层样式（如 `@layer base`）；在 scoped 块中实现 Reset `MUST NOT` 期望影响组件外部。
- 需要跨组件共享的动画与关键帧命名 `SHOULD` 统一前缀或置于全局层；在 scoped 中定义的关键帧是否被重写取决于构建配置，名称冲突 `MUST NOT` 发生。
- 深度选择器与全局出口 `MUST` 精确到必要范围；广义的 `:deep(_)` 或 `:global(_)` `MUST NOT` 使用。
- 为了主题与可维护性，颜色与间距 `SHOULD` 使用 CSS 自定义属性；覆盖主题时 `MUST` 通过变量或修饰符类完成，而非在 scoped 中复制粘贴整段规则。

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

## ECMAScript

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript 2015（ES6）的标准。

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

### TypeScript

如果项目使用 TypeScript，则项目 root directory 下的 tsconfig.json，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true, // 只做检查，不生成输出
    "strict": true, // 更严格的规则
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "types": [], // 按需添加：项目里常用到的类型声明
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### JSDoc

如果项目没有使用 TypeScript，则需要利用 TypeScript 的 tsc + JSDoc 来实现 JavaScript 代码的类型检查。

- 项目级

项目 root directory 下的 tsconfig.json，`MUST` 遵循如下配置：

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true, // 只做检查，不生成输出
    "strict": true, // 更严格的规则
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "types": [], // 按需添加：项目里常用到的类型声明
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- 文件级

任何 JavaScript 文件或者相关代码，`MUST` 使用 @ts-check 注释，开启文件级类型检查。`MUST NOT` 使用 @ts-nocheck 注释。

## Package Manager

### corepack

包管理器，`MUST` 使用 corepack 来管理。且 corepack 需要使用与 Node.js 版本一致的版本。

### package.json

package.json 文件中，`MUST` 添加 packageManager 字段，且值为选择的包管理器的版本号，格式为：`<package-manager>@<version>+<checksum>`。

```json
// example
{
  "packageManager": "pnpm@9.4.0+sha512.f549b8a52c9d2b8536762f99c0722205efc5af913e77835dbccc3b0b0b2ca9e7dc8022b78062c17291c48e88749c70ce88eb5a74f1fa8c4bf5e18bb46c8bd83a"
}
```

### registry

拉取依赖的 registry，`MUST` 使用如下对应的 registry URL 地址：

| Project                                            | Registry URL                                                    |
| -------------------------------------------------- | --------------------------------------------------------------- |
| 网约车 & 代驾                                      | http://192.168.200.216/nexus/content/groups/npm-group/          |
| 巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 | http://npm-qx.bailongma-inc.com/nexus/content/groups/npm-group/ |

### config

无论使用什么包管理器， `MUST` 在项目 root directory 下创建一个 .npmrc 文件。

且 .npmrc 文件中 `MUST` 配置如下内容：

```ini
registry=<registry-url>
```

#### pnpm config

如果使用的是 pnpm，则 .npmrc 文件中 `MUST` 增加如下配置：

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

### Linters

项目代码，`MUST` 利用格式化工具来保证代码的格式化，且格式化工具 `SHOULD` 使用 Prettier。

Prettier 的配置文件，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

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

项目代码，`MUST` 利用质量检查工具来保证代码的质量，且质量检查工具 `SHOULD` 使用 ESLint。

ESLint 的配置文件，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"]
}
```

### Compiler/Transpiler

项目代码，`MUST` 利用编译/转译工具来保证代码的兼容性，且编译/转译工具 `SHOULD` 使用 Babel 或者 SWC。

Babel 的配置文件，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "presets": ["@babel/preset-env"]
}
```

### Bundler

#### Vite

项目的构建工具，`SHOULD` 使用 Vite。并且新项目 `MUST` 使用 Vite。

- vite 版本

vite 的版本 `MUST` 为下面表格中的版本：

| Version |
| ------- |
| v4.5.3  |

- vite config

vite 的配置文件 `SHOULD` 添加如下所示的基本配置，`MAY` 根据项目实际情况进行调整。

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

#### Webpack

## Front-End Framework

### Vue

项目中的 Vue 框架，`MUST` 使用 Vue 2。

Vue 2 的版本 `MUST` 为下面表格中的版本：

| Version |
| ------- |
| v2.7.16 |

Vue 2 的配置文件 `SHOULD` 添加如下所示的基本配置，`MAY` 根据项目实际情况进行调整。

```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

## Router

项目中的路由管理工具，`MUST` 使用 Vue Router。

Vue Router 的版本 `MUST` 为下面表格中的版本：

| Version |
| ------- |
| v3.6.5  |

Vue Router 的配置文件 `SHOULD` 添加如下所示的基本配置，`MAY` 根据项目实际情况进行调整。

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [],
});
```

## State Management

项目中的状态管理工具，`MUST` 使用 Pinia。

Pinia 的版本 `MUST` 为下面表格中的版本：

| Version |
| ------- |
| v2.0.26 |

Pinia 的配置文件 `SHOULD` 添加如下所示的基本配置，`MAY` 根据项目实际情况进行调整。

```js
import { createPinia } from "pinia";

export default createPinia();
```

## Ecosystem / Libraries / Utils

### Vant

### Lodash

### Network Request

### Date

###

## Questions

Q1: 需要支持的最低的浏览器版本是多少？

A：暂时不确定，可以通过给 SLS 添加特定的打点，来确定用户的浏览器版本

## Appendix

1. Proxy/Rflect 无法 Polyfill
2.
