# Optional catch Binding

> ECMAScript 2019 (ES10)

catch 子句可以省略参数。

```javascript
// ES2019 之前
try {
  JSON.parse(data);
} catch (error) {  // 必须有参数
  console.log('解析失败');
}

// ES2019
try {
  JSON.parse(data);
} catch {  // 可以省略参数
  console.log('解析失败');
}
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
