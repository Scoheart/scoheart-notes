- 熟悉 HTML5/CSS3/JavaScript/ES6+，掌握 TypeScript/Flow 类型系统，熟练使用 Vue/React/Svelte 等主流框架
- 深入理解 CSR/SSR/SSG/ISR、Streaming SSR 等渲染方式，熟悉 Next.js、Nuxt.js 等渲染框架及 Islands 架构原理
- 丰富的工程化经验，掌握 Babel/tsc/swc 等转译器，Webpack/Vite/Rollup 等打包器，Monorepo 单仓多库，pnpm 包管理
- 熟悉 Nodejs CLI，具备 CLI 开发经验，能从 0 到 1 配置项目工程化，熟悉 Node Addon，掌握 V8/NAN/N-API 扩展开发
- 熟悉 Nodejs BFF，掌握运用 Express/Koa/Fastify/Nestjs 等后端框架，可构建 BFF 中间层，掌握 Restful 接口开发
- 熟悉 Browser/Nodejs，了解其他 JS Runtime：Deno/Bun，了解编译及 Embedding JS Engine，如 Hermes/V8/QuickJS
- 熟悉 C++ 构建体系，熟悉 Clang/GCC/MSVC 等编译器，熟练运用 GN/Ninja/GYP/node-gyp/Make/CMake 等构建工具
- 基本的 iOS 移动端开发经验，有个人独立 iOS 作品，掌握 Swift/SwiftUI/CocoaPods/Foundation/Core Data/SQLite 等
- 了解 Android 移动端开发知识，能利用 Kotlin/Gradle/Jetpack Compose 进行 Android 开发，完成小型项目架构与界面落地
- 了解跨平台应用开发：如 Electron/Tauri 桌面应用，React Native 移动应用，并可融合 C++/Rust 编写高性能共享模块
- 具备 Java 服务端背景，掌握运用 MySQL/Redis，了解 Spring 全家桶及微服务治理，熟悉 Docker+Jenkins 的 CI/CD 链路
- 紧跟 AI 赋能趋势，集成 Cursor/ChatGPT/Claude 进行 AI 辅助开发，持续研究 Prompt Engineering/LLM/MCP 等方向

- 从 0 -> 1 搭建企业级项目脚手架，主导转译、打包、CI/CD 等工程化体系落地
- 设计并实施 pnpm workspace + Turborepo 的 Monorepo 仓库解决方案
- 基于 TypeScript 构建全链路类型校验规则，提升代码健壮性与开发体验

1. Codify Boilerplate - VSCode 插件 - 项目脚手架
- 升级并重构网盘 FE 项目脚手架模板及配置（Webpack/Vite/TypeScript/ESLint/Husky/CI/CD 等），打造 Boilerplate 生成器；采用分层架构，彻底解耦模板生成引擎与 UI 交互，支持 Terminal CLI 与 VSCode Webview 双入口，提供可视化、可交互的模板生成工作流
- 参考 VSCode UX 设计指南，遵循设计规范，深度掌握 VSCode 界面容器以及视图布局（Activity Bar/SideBar/StatusBar等）；基于 VSCode Extension API 构建模板生成工作流 Webview 配置页，并以 PostMessage/vscode-jsonrpc 实现 Webview <-> VSCode Plugin 消息传递，实现插件的高效、安全双向通信
- 基于 vsce 自动打包生成 .vsix 安装包，配套 Shell/PowerShell 脚本完成私有化分发与静默安装，接入公司内部电脑软件管理工具“度管家”，支持“度管家”可视化一键静默安装 VSCode 插件

2. Codify D2C - Figma 插件 - 设计稿解析
- 广泛调研业界 Design To Code 方案（Builder.io/imgcook/Locofy/Semi Design等），深入探索 AI 领域技术（Machine Learning/Deep Learning/LLM） 对 D2C 的辅助研发，如设计稿组件目标提取、ClassName 语义化、智能 FlexBox 布局策略等
- ​深度解构 Figma 设计规范核心机制​（Auto Layout 布局模型／Constraints 约束规则／Design Tokens 原子样式），融合设计师工作流与设计系统理念，主导制定 ​版本化设计稿 → 可交付代码的自动化验收标准​（样式还原度 ≥ 95%，Design Tokens分层等），通过自动化检查机制推动设计-研发高效协同节点落地
- 深入研究 Figma 插件底层架构的演进（WASM/Realm/QuickJS/Iframe），剖析 ​Main Thread Sandbox 安全模型与 ​UI Iframe 渲染层解耦设计，基于 ​PostMessage/json-rpc 实现高效消息传递策略，驱动​高性能插件的开发与功能的深度定制
- ​解析 Figma 设计稿原始结构，构建设计稿结构化解析策略，​通过 API 提取 Figma Node 的几何属性​（坐标、尺寸）、样式属性（RGBA 色值、多重阴影叠加、描边权重与对齐、圆角弧度）及​布局属性​（Auto Layout布局、Constraints约束规则）
- 设计跨平台样式转换中间层，调研并结合 CSS／SwiftUI／Compose 各平台语义特性抽象通用的 ​Transform 中间数据结构 D2C Schema，优化 Schema 结构体积，探索打标方案，优化容器/组件生成，统一设计稿至多终端代码的映射规则与转换方案

3. Codify D2C Platform（Client/Server） - D2C 编排平台 - 组件/项目生成
- 独立实现 DSL Style -> CSS 的编译链路，将 Design Tokens 转换为层级化 CSS 变量，动态映射 Auto Layout 至 Flexbox，探索 Layout 布局优化算法，针对渐变、阴影等特效实施智能降级策略，实现 DSL Style → CSS 的像素级还原，辅助实现 DSL Style -> SwiftUI/Compose 的样式层转换
- 辅助实现 DSL -> Vue 组件的转换，拼装单文件组件（SFC）三段式结构，注入响应式模板、作用域样式及轻量级事件脚本
- 基于 RBAC 权限模型，以 NestJS + MongoDB + Redis + GraphQL 构建高性能 Server，支撑组件与项目生成服务


1. 网盘 bpnode 渲染服务（CSR/SSR/SSG）维护
- 深入理解 EggJS 的 Framework & Plugin机制，熟悉网盘现存 15+ Plugins（routes配置路由/renderer渲染核心/Swig模版引擎等），熟悉基于 Vue 的 CSR/SSR/SSG，个人开发机复现网盘统一视图渲染服务，方便日常调试、产品走查、测试回归等场景

2. 网盘&文库 Quill-based 编辑器研发
- 深入理解 Quill 及其底层依赖 Parchment 的 Delta-Blot 渲染链路，基于源码改装自研 Quill 内核，定制网盘特定 Blot，兼容网盘&文库历史 Blot，新增公式、音视频、图片、网盘附件等 10+ 自定义场景化 Blot
- 旧版编辑器年久失修（5Y），主导编辑器的项目工程化全链路重构，统一 ESLint/Prettier/Husky 工程规范，升级 @vue/cli 为 Vite 体系，聚合编辑器散列子包为 Vite + TypeScript + Monorepo 架构，优化 CI/CD 构建流程

3. 云一朵/一刻相册 H5 页面开发
- 深入理解网盘 H5 Hybrid 核心机制（JSBridge/URI Schemes、离线包）及完整开发链路，累积参与研发 H5 页面 10+

4. 网盘四端合一 PC/Mac 桌面端维护
- 深入理解 Electron 进程模型（主进程/渲染进程）以及上下文隔离机制（页面脚本/预加载脚本），熟悉进程间通信 IPC（ipcMain/ipcRenderer），熟悉 Node-Addon 与 Electron的结合，以及 FFI（koffi、ffi-napi等），进行日常项目代码维护