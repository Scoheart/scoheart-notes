# Rest/Spread Properties

> ECMAScript 2018 (ES9)

对象的 rest/spread 操作符。

```javascript
// Spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// Rest
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(a);     // 1
console.log(rest);  // { b: 2, c: 3 }
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
