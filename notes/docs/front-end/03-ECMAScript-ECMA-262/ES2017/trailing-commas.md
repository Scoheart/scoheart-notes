# Trailing Commas

> ECMAScript 2017 (ES8)

允许在函数参数列表和调用中使用尾随逗号。

```javascript
function test(
  a,
  b,
  c,  // 尾随逗号
) {
  return a + b + c;
}

test(1, 2, 3,);  // 6
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas)
