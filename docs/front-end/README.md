# 前端开发知识库

> 全面、系统、深入的前端开发学习资料库

## 📚 知识体系

本知识库按照前端开发的核心领域进行组织,涵盖从基础到高级的完整学习路径。

### 🎯 核心基础

#### [HTML](./HTML/)
- HTML 基础语法与语义化

#### [CSS](./CSS/)
- **CSS Coding Style**: 属性顺序、命名规范(BEM)、可维护性
- **CSS Modularization**: Vue Scoped、CSS Modules、CSS-in-JS(Emotion)
- **CSS Framework**: 预处理器(Less/Sass)、后处理器(PostCSS)

#### [ECMAScript](./ECMAScript/)
- **ES5**: Array、闭包、执行上下文、IIFE、内存管理、this
- **ES2015**: 箭头函数、解构、模板字符串、Promise 等
- **ES2016+**: async/await、可选链、空值合并等现代特性
- **Advanced**: Proxy、Reflect、Symbol 等高级特性

### ⚙️ JavaScript 深度

#### [JavaScript Engine & Runtime](./JavaScript-Engine-Runtime/)
- **Engines**: V8、JavaScriptCore、Hermes 引擎原理
- **Runtime**:
  - Browser: 浏览器环境、Event Loop
  - Node.js: CLI、Corepack、HTTP、Net 模块

#### [JavaScript Module System](./JavaScript-Module-System/)
- CommonJS、AMD、UMD、ES Module 模块系统对比与演进

#### [JavaScript Flavours](./JavaScript-Flavours/)
- **TypeScript**:
  - 类型系统(Mapped Types、Object Types、Utility Types)
  - 配置(tsconfig.json、编译选项)
  - 模块系统
  - 实战文章
- **Flow**: Facebook 的类型检查工具

### 📦 包管理与构建

#### [Package Manager](./Package-Manager/)
- **npm**: Nexus、全局包、可执行包、缓存管理
- **pnpm**: CLI、Workspace、性能优化
- **yarn**: 基础使用与配置

#### [Build Toolchains](./Build-Toolchains/)
- **Formatters**: Prettier
- **Linters**: ESLint、Husky、Commitlint、Lint-staged
- **Compiler/Transpiler**: Babel
- **Module Bundler**:
  - Vite: 现代化构建工具
  - Webpack: 配置、Loader、Plugin、HMR、性能优化
  - Rollup: 库打包、插件系统、实战示例

#### [Monorepo](./Monorepo/)
- pnpm Workspace
- Turborepo

### 🎨 框架与生态

#### [Front-End Framework](./Front-End-Framework/)
- **Vue**: Vue3、博客文章、历史版本对比
- **React**:
  - 源码分析
  - 合成事件系统
  - Hooks(useState等)
  - Mini React 实现
- **Other**: Marko 等框架

#### [Routers](./Routers/)
- React Router
- Vue Router
- TanStack Router

#### [State Management](./State-Management/)
- Vuex
- Zustand

#### [Rendering/Meta Frameworks](./Rendering-Meta-Frameworks/)
- SSR(服务端渲染)原理与实践

### 🧪 测试工具

#### [Test Tools](./Test-Tools/)
- Jest
- Vitest

### 🚀 全栈与跨端

#### [Back-End Frameworks](./Back-End-Frameworks/)
- NestJS: 企业级 Node.js 框架
- Koa: 中间件与洋葱模型

#### [Mobile Frameworks](./Mobile-Frameworks/)
- **React Native**:
  - 配置
  - 路由
  - 错误处理
  - 组件库
  - 实战示例(下拉列表)

### 🌐 Web 基础

#### [Web Fundamentals](./Web-Fundamentals/)
- **DOM**: DOM API、事件系统
- **HTTP**: AJAX 与网络请求
- **Browser**: 浏览器缓存、WebView
- **Cross-Platform**: 跨平台开发
- **Other**: AST、CLI、脚手架、可视化、序列化、ECharts 等

### 🛠️ 工具库

#### [Libraries](./Libraries/)
- **Vue**: @vue/compiler-sfc
- **CLI Tools**: cac
- **Config**: config、dotenv
- **Visualization**: Uplot

### ✍️ 博客文章

#### [Blog](./Blog/)
- ES Parser 原理
- npm run 机制
- 模块互操作性
- 包安装原理
- Node.js DIY
- TypeScript 实践

## 📊 统计信息

- **文档数量**: 131+ 篇 Markdown 文档
- **知识领域**: 19 个主要分类
- **代码示例**: 多个完整项目示例(Rollup + Vue 等)
- **覆盖范围**: HTML → CSS → JavaScript → 构建工具 → 框架 → 全栈

## 🗂️ 目录结构

```
front-end/
├── HTML/                          # HTML 基础
├── CSS/                           # CSS 完整体系
├── ECMAScript/                    # ECMAScript 各版本特性
├── JavaScript-Engine-Runtime/     # JS 引擎与运行时
├── JavaScript-Module-System/      # 模块系统
├── JavaScript-Flavours/           # TypeScript、Flow 等
├── Package-Manager/               # npm、pnpm、yarn
├── Build-Toolchains/              # 构建工具链
├── Monorepo/                      # Monorepo 管理
├── Front-End-Framework/           # Vue、React 等框架
├── Routers/                       # 路由库
├── State-Management/              # 状态管理
├── Rendering-Meta-Frameworks/     # 渲染框架
├── Test-Tools/                    # 测试工具
├── Back-End-Frameworks/           # 后端框架
├── Mobile-Frameworks/             # 移动端框架
├── Web-Fundamentals/              # Web 基础知识
├── Libraries/                     # 工具库
└── Blog/                          # 博客文章
```

## 🎯 学习路径建议

### 初学者路径
1. HTML 基础
2. CSS 基础 → CSS 命名规范 → CSS 模块化
3. ECMAScript ES5 → ES2015 基础特性
4. 浏览器环境 → DOM API → 事件系统
5. 选择一个框架开始(Vue 或 React)

### 进阶路径
1. JavaScript 引擎原理
2. 模块系统深入
3. TypeScript 类型系统
4. 构建工具原理(Webpack/Vite/Rollup)
5. 框架源码分析
6. 状态管理与路由
7. SSR 与 Meta Frameworks

### 工程化路径
1. 包管理器(npm/pnpm)
2. 代码规范(ESLint/Prettier)
3. Git Hooks(Husky/Commitlint)
4. Monorepo 管理
5. 构建优化
6. 测试工具

## 📝 迁移说明

本知识库由原 scoheart 目录迁移而来,按照 tree.md 定义的目录结构重新组织。所有文档已按照主题分类,方便查找和学习。

详细迁移计划见: [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)

## 🤝 贡献指南

本知识库持续更新中,欢迎补充和完善内容。

---

**Last Updated**: 2025-01-10
**Total Documents**: 131+
**Author**: scoheart
