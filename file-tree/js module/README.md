# JavaScript 模块化发展历史 - 代码示例

本项目展示了 JavaScript 模块化规范的发展历程，每个文件夹包含一个完整的可运行示例。

## 📚 模块化规范时间线

### 1. IIFE (立即执行函数表达式) - 2000年代初期
- **时期**: 最早期的模块化方案
- **特点**: 利用函数作用域隔离变量，避免全局污染
- **位置**: `./01-iife/`

### 2. CommonJS - 2009年
- **时期**: Node.js 采用的模块规范
- **特点**: 同步加载，服务器端优先
- **关键字**: `require`, `module.exports`, `exports`
- **位置**: `./02-commonjs/`

### 3. AMD (Asynchronous Module Definition) - 2011年
- **时期**: 浏览器端异步加载方案
- **特点**: 异步加载，依赖前置
- **代表**: RequireJS
- **位置**: `./03-amd/`

### 4. CMD (Common Module Definition) - 2011年
- **时期**: 国内玉伯提出的规范
- **特点**: 异步加载，依赖就近
- **代表**: Sea.js
- **位置**: `./04-cmd/`

### 5. UMD (Universal Module Definition) - 2013年
- **时期**: 统一多种模块规范
- **特点**: 兼容 AMD、CommonJS 和全局变量
- **位置**: `./05-umd/`

### 6. ES Modules (ESM) - 2015年 (ES6)
- **时期**: JavaScript 官方标准模块方案
- **特点**: 静态分析，Tree-shaking，现代浏览器和 Node.js 都支持
- **关键字**: `import`, `export`
- **位置**: `./06-es-modules/`

## 🚀 如何运行示例

每个文件夹都包含独立的 README.md，说明如何运行该示例。

## 📖 学习路径

建议按照以下顺序学习：
1. IIFE - 理解作用域隔离的基础概念
2. CommonJS - 理解模块化的基本思想
3. AMD/CMD - 理解异步加载的必要性
4. UMD - 理解跨平台兼容性
5. ES Modules - 掌握现代标准规范
