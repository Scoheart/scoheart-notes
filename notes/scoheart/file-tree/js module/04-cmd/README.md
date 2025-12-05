# CMD (Common Module Definition) 模块化

## 📖 简介

CMD 是由国内开发者玉伯（阿里巴巴）提出的模块定义规范，主要通过 Sea.js 实现。它是专门为浏览器端设计的模块化方案，与 AMD 类似但有所不同。

## ✨ 特点

- **优点**:
  - 异步加载，不阻塞页面
  - 依赖就近（按需加载）
  - 延迟执行，性能更好
  - 语法接近 CommonJS，更易理解

- **缺点**:
  - 生态不如 AMD/CommonJS
  - Sea.js 维护不够活跃
  - 使用范围主要在国内

## 📁 文件说明

- `calculator.js` - 计算器模块
- `logger.js` - 日志模块
- `main.js` - 主入口文件
- `index.html` - 示例页面
- `sea.js` - Sea.js 库（需要下载或使用 CDN）

## 🚀 运行方式

直接在浏览器中打开 `index.html` 文件（已包含 CDN 方式加载 Sea.js）

## 💡 关键概念

### 定义模块

```javascript
// CMD 规范定义模块
define(function(require, exports, module) {
  // 依赖就近：需要时才 require
  var dep1 = require('./dependency1');

  // 导出方式1: 使用 exports
  exports.method = function() {};

  // 导出方式2: 使用 module.exports
  module.exports = {
    method: function() {}
  };
});
```

### 使用模块

```javascript
// 配置 Sea.js
seajs.config({
  base: './',
  alias: {
    'jquery': 'lib/jquery.js'
  }
});

// 使用模块
seajs.use(['module1', 'module2'], function(mod1, mod2) {
  mod1.doSomething();
});
```

## 🔍 CMD vs AMD

| 特性 | AMD | CMD |
|------|-----|-----|
| 依赖声明 | 依赖前置 | 依赖就近 |
| 执行时机 | 提前执行 | 延迟执行 |
| 语法风格 | RequireJS | 类似 CommonJS |
| 性能 | 可能加载不必要的模块 | 按需加载，性能更好 |

### 示例对比

```javascript
// AMD - 依赖前置
define(['a', 'b'], function(a, b) {
  // 依赖必须一开始就声明
  a.doSomething();
  if (false) {
    b.doSomething(); // b 也会被加载，即使不会执行
  }
});

// CMD - 依赖就近
define(function(require, exports) {
  var a = require('a');
  a.doSomething();
  if (false) {
    var b = require('b'); // 不会执行，b 不会被加载
  }
});
```
