# Error Cause

> ECMAScript 2022 (ES13)

Error 对象可以包含 cause 属性。

```javascript
try {
  await fetch('/api');
} catch (error) {
  throw new Error('Failed to fetch data', {
    cause: error
  });
}

// 访问原始错误
try {
  // ...
} catch (error) {
  console.log(error.message);  // 'Failed to fetch data'
  console.log(error.cause);    // 原始错误对象
}
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
