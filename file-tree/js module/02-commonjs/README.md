# CommonJS 模块化

## 📖 简介

CommonJS 是 Node.js 采用的模块规范，由 Mozilla 工程师 Kevin Dangoor 于 2009 年提出。它是服务器端 JavaScript 模块化的事实标准。

## ✨ 特点

- **优点**:
  - 简单易用，语法直观
  - 模块依赖关系清晰
  - 广泛应用于 Node.js 生态
  - 支持动态加载

- **缺点**:
  - 同步加载，不适合浏览器环境
  - 运行时加载，无法进行静态分析
  - 不支持 Tree-shaking

## 📁 文件说明

- `calculator.js` - 计算器模块
- `logger.js` - 日志模块
- `main.js` - 主入口文件
- `package.json` - 项目配置

## 🚀 运行方式

```bash
# 在 02-commonjs 目录下执行
node main.js
```

## 💡 关键概念

### 导出模块

```javascript
// 方式1: module.exports 导出整个对象
module.exports = {
  add: function(a, b) { return a + b; }
};

// 方式2: exports 添加属性（注意：不能重新赋值 exports）
exports.add = function(a, b) { return a + b; };

// 方式3: 导出单个值
module.exports = function add(a, b) {
  return a + b;
};
```

### 导入模块

```javascript
// 导入整个模块
const calculator = require('./calculator');

// 导入并解构
const { add, subtract } = require('./calculator');

// 导入核心模块
const fs = require('fs');

// 导入 npm 包
const express = require('express');
```

## 🔍 注意事项

1. `require` 是同步加载
2. 模块会被缓存，多次 require 只会执行一次
3. `exports` 是 `module.exports` 的引用
4. 不能直接给 `exports` 赋值，会切断引用关系
