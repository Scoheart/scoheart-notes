# UMD (Universal Module Definition) 模块化

## 📖 简介

UMD 是一种通用模块定义规范，它是 AMD 和 CommonJS 的融合。UMD 的核心思想是通过判断当前环境来决定使用哪种模块化方案，使得模块可以在多种环境下运行。

## ✨ 特点

- **优点**:
  - 跨平台兼容（浏览器、Node.js）
  - 同时支持 AMD、CommonJS 和全局变量
  - 一次编写，到处运行
  - 适合编写第三方库

- **缺点**:
  - 代码相对冗长
  - 需要额外的包装代码
  - 不如 ES Modules 优雅

## 📁 文件说明

- `calculator.js` - 计算器模块（UMD 规范）
- `logger.js` - 日志模块（UMD 规范）
- `test-browser.html` - 浏览器环境测试（全局变量方式）
- `test-amd.html` - AMD 环境测试（RequireJS）
- `test-commonjs.js` - CommonJS 环境测试（Node.js）

## 🚀 运行方式

### 1. Node.js (CommonJS) 环境
```bash
node test-commonjs.js
```

### 2. 浏览器（全局变量）环境
直接打开 `test-browser.html`

### 3. AMD (RequireJS) 环境
直接打开 `test-amd.html`

## 💡 UMD 模式原理

UMD 通过以下步骤判断环境：

```javascript
(function (root, factory) {
  // 1. 检测是否支持 AMD (RequireJS)
  if (typeof define === 'function' && define.amd) {
    define(['dependency'], factory);
  }
  // 2. 检测是否支持 CommonJS (Node.js)
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('dependency'));
  }
  // 3. 浏览器全局变量
  else {
    root.MyModule = factory(root.Dependency);
  }
}(typeof self !== 'undefined' ? self : this, function (dependency) {
  // 模块代码
  return {
    method: function() {}
  };
}));
```

## 🔍 环境判断逻辑

| 环境 | 判断条件 | 使用方式 |
|------|---------|---------|
| AMD | `typeof define === 'function' && define.amd` | RequireJS |
| CommonJS | `typeof module === 'object' && module.exports` | Node.js |
| 全局变量 | 其他情况 | window.MyModule |

## 📚 适用场景

- 开发跨平台的 JavaScript 库
- 需要同时支持多种模块化规范
- 发布到 npm 但也要在浏览器中使用
- 向后兼容老项目

## 🌟 流行的 UMD 库示例

- jQuery
- Lodash
- Moment.js
- Axios (早期版本)
