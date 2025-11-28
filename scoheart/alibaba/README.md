# H5 开发规范文档

本目录包含完整的 H5 开发规范，按主题拆分为多个子目录。

## 📁 目录结构

### 1. [源代码管理](./source-code-management/)
- [Git](./source-code-management/git.md)
- [GitLab](./source-code-management/gitlab.md)
- [Trunk-Based Development](./source-code-management/trunk-based-development.md)
- [Repository Strategy](./source-code-management/repository-strategy.md)

### 2. [HTML](./html/)
(待补充)

### 3. [CSS](./css/)
- [CSS Coding Style](./css/css-coding-style.md)
- [CSS Modularization](./css/css-modularization.md)
- [CSS Framework](./css/css-framework.md)

### 4. [ECMAScript](./ecmascript/)
- [ECMAScript 标准](./ecmascript/README.md)

### 5. [JavaScript Engine & Runtime](./javascript-engine-runtime/)
- [Development Environment](./javascript-engine-runtime/development-environment.md)
- [Test Environment](./javascript-engine-runtime/test-environment.md)
- [Production Environment](./javascript-engine-runtime/production-environment.md)

### 6. [JavaScript Module System](./javascript-module-system/)
- [ESM 模块系统](./javascript-module-system/README.md)

### 7. [JavaScript Flavours](./javascript-flavours/)
- [TypeScript](./javascript-flavours/typescript.md)
- [JavaScript + JSDoc](./javascript-flavours/javascript-jsdoc.md)

### 8. [Package Manager](./package-manager/)
- [Corepack](./package-manager/corepack.md)
- [package.json](./package-manager/package-json.md)
- [Registry](./package-manager/registry.md)
- [Config](./package-manager/config.md)

### 9. [Build Toolchains](./build-toolchains/)
- [Overview](./build-toolchains/overview.md)
- [EditorConfig](./build-toolchains/editorconfig.md)
- [Formatters](./build-toolchains/formatters.md)
- [Linters](./build-toolchains/linters.md)
- [Compiler/Transpiler](./build-toolchains/compiler-transpiler.md)
- [Bundler](./build-toolchains/bundler.md)

### 10. [Front-End Framework](./front-end-framework/)
- [Vue 2](./front-end-framework/vue2.md)
- [Vue Style Guide](./front-end-framework/vue-style-guide.md)

### 11. [Router](./router/)
- [Vue Router](./router/README.md)

### 12. [State Management](./state-management/)
- [Pinia](./state-management/pinia.md)

### 13. [Ecosystem / Libraries / Utils](./ecosystem/)
- [生态库工具](./ecosystem/README.md)

### 14. [Questions](./questions/)
- [常见问题](./questions/README.md)

### 15. [Appendix](./appendix/)
- [ECMAScript Versions & Features](./appendix/ecmascript-versions.md)

## 📌 使用说明

每个子目录包含该主题的详细规范文档。文档中使用以下关键词表示强制程度：

- **MUST** / **MUST NOT**: 强制要求
- **SHOULD** / **SHOULD NOT**: 强烈建议
- **MAY**: 可选

## 🔄 文档维护

本规范文档拆分自 `H5-Specs.md`，便于：
- 分主题查阅和维护
- 团队协作编写
- AI 工具更好地理解和应用规范
