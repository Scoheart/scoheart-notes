# globalThis

> ECMAScript 2020 (ES11)

统一的全局对象访问方式。

```javascript
// 在不同环境中都能访问全局对象
console.log(globalThis);

// 浏览器: window
// Node.js: global
// Web Worker: self
// 现在都可以用 globalThis
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
