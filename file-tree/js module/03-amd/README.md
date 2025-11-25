# AMD (Asynchronous Module Definition) 模块化

## 📖 简介

AMD 是由 RequireJS 推广的异步模块定义规范，专门为浏览器环境设计。它解决了浏览器端模块异步加载的问题。

## ✨ 特点

- **优点**:
  - 异步加载，不阻塞页面渲染
  - 依赖前置，明确声明依赖关系
  - 适合浏览器环境
  - 支持动态加载

- **缺点**:
  - 语法相对复杂
  - 需要引入 RequireJS 等加载器
  - 依赖前置可能导致不必要的模块加载

## 📁 文件说明

- `calculator.js` - 计算器模块
- `logger.js` - 日志模块
- `main.js` - 主入口文件
- `index.html` - 示例页面
- `require.js` - RequireJS 库（需要下载）

## 🚀 运行方式

1. 下载 RequireJS：
```bash
# 在 03-amd 目录下执行
curl -o require.js https://requirejs.org/docs/release/2.3.6/minified/require.js
```

2. 在浏览器中打开 `index.html` 文件

或者直接打开 index.html（已包含 CDN 方式加载 RequireJS）

## 💡 关键概念

### 定义模块

```javascript
// 无依赖模块
define(function() {
  return {
    method: function() {}
  };
});

// 有依赖模块
define(['dependency1', 'dependency2'], function(dep1, dep2) {
  return {
    method: function() {
      dep1.doSomething();
    }
  };
});
```

### 使用模块

```javascript
// 配置 RequireJS
requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery'
  }
});

// 加载模块
require(['module1', 'module2'], function(mod1, mod2) {
  mod1.doSomething();
});
```

## 🔍 特性说明

1. **依赖前置**: 所有依赖必须在回调函数执行前加载完成
2. **异步加载**: 不阻塞页面渲染
3. **模块化加载器**: 需要 RequireJS 等工具支持
