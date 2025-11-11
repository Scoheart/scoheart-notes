# Top-level await

> ECMAScript 2022 (ES13)

在模块顶层使用 await。

```javascript
// module.js
const data = await fetch('/api/data');
const json = await data.json();

export { json };

// 无需包裹在 async 函数中
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)
