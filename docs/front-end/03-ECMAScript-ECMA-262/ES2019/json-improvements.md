# JSON Improvements

> ECMAScript 2019 (ES10)

JSON 超集和 JSON.stringify() 改进。

```javascript
// JSON.stringify 更好地处理 Unicode
const obj = { text: '\u2028\u2029' };
console.log(JSON.stringify(obj));

// JSON 现在是 ECMAScript 的超集
// 允许 U+2028 和 U+2029 出现在字符串字面量中
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
