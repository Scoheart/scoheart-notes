# ES Modules (ESM) - ECMAScript 模块

## 📖 简介

ES Modules (ESM) 是 ECMAScript 6 (ES2015) 引入的官方标准模块系统，是 JavaScript 语言层面的模块化解决方案。现代浏览器和 Node.js 都原生支持 ES Modules。

## ✨ 特点

- **优点**:
  - JavaScript 官方标准，语言原生支持
  - 静态分析，编译时确定依赖关系
  - 支持 Tree-shaking（摇树优化）
  - 异步加载，不阻塞
  - 语法简洁优雅
  - 现代工具链全面支持
  - 浏览器和 Node.js 原生支持

- **缺点**:
  - 旧版浏览器不支持（IE 全系列）
  - Node.js 需要 .mjs 扩展名或 package.json 中 type: "module"

## 📁 文件说明

- `calculator.js` - 计算器模块
- `logger.js` - 日志模块
- `utils.js` - 工具函数模块（演示多种导出方式）
- `main.js` - 主入口文件
- `index.html` - 浏览器环境测试
- `package.json` - Node.js 配置

## 🚀 运行方式

### 1. 浏览器环境
直接打开 `index.html`（需要使用现代浏览器）

### 2. Node.js 环境
```bash
# 在 06-es-modules 目录下执行
node main.js
```

## 💡 关键概念

### 导出模块

```javascript
// 命名导出 (Named Exports)
export const name = 'value';
export function func() {}
export class MyClass {}

// 默认导出 (Default Export)
export default function() {}
export default class MyClass {}

// 混合导出
export const a = 1;
export default function() {}

// 重新导出
export { func } from './module.js';
export * from './module.js';
```

### 导入模块

```javascript
// 导入命名导出
import { name, func } from './module.js';

// 导入默认导出
import MyModule from './module.js';

// 导入所有（命名空间导入）
import * as MyModule from './module.js';

// 混合导入
import MyModule, { name, func } from './module.js';

// 重命名导入
import { name as myName } from './module.js';

// 仅执行模块（副作用导入）
import './module.js';

// 动态导入（异步）
const module = await import('./module.js');
```

## 🔍 ES Modules vs CommonJS

| 特性 | ES Modules | CommonJS |
|------|-----------|----------|
| 语法 | import/export | require/module.exports |
| 加载时机 | 编译时（静态） | 运行时（动态） |
| 输出 | 值的引用 | 值的拷贝 |
| 环境 | 浏览器 + Node.js | 主要是 Node.js |
| Tree-shaking | ✅ 支持 | ❌ 不支持 |
| 异步加载 | ✅ 原生支持 | ❌ 同步加载 |
| 循环依赖 | 更好的处理 | 可能有问题 |

## 🌟 现代最佳实践

ES Modules 是当前和未来的推荐方案：

1. **新项目优先使用 ESM**
2. **浏览器中使用 `<script type="module">`**
3. **Node.js 中使用 `.mjs` 或配置 `type: "module"`**
4. **利用 Tree-shaking 优化打包体积**
5. **使用现代构建工具（Vite、Webpack 5+、Rollup）**
