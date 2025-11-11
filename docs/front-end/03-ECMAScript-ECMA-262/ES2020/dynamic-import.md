# Dynamic import()

> ECMAScript 2020 (ES11)

动态导入模块。

```javascript
// 条件导入
if (condition) {
  const module = await import('./module.js');
  module.doSomething();
}

// 按需加载
button.addEventListener('click', async () => {
  const { heavyFunction } = await import('./heavy-module.js');
  heavyFunction();
});
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
