# IIFE (立即执行函数表达式) 模块化

## 📖 简介

IIFE (Immediately Invoked Function Expression) 是 JavaScript 最早期的模块化方案，通过函数作用域来隔离变量，避免全局命名空间污染。

## ✨ 特点

- **优点**:
  - 利用函数作用域隔离变量
  - 避免全局命名空间污染
  - 简单易懂，无需额外工具

- **缺点**:
  - 模块之间的依赖关系不明确
  - 需要手动管理加载顺序
  - 难以复用和维护

## 📁 文件说明

- `calculator.js` - 计算器模块
- `logger.js` - 日志模块
- `index.html` - 示例页面

## 🚀 运行方式

直接在浏览器中打开 `index.html` 文件，查看控制台输出。

## 💡 关键概念

```javascript
// 基本 IIFE 模式
(function() {
  // 私有变量和函数
  var privateVar = 'private';

  // 暴露公共 API
  window.MyModule = {
    publicMethod: function() {}
  };
})();
```
