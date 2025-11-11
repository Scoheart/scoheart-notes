# RegExp Match Indices

> ECMAScript 2022 (ES13)

正则匹配返回索引位置。

```javascript
const str = 'test123test456';
const regex = /test(\d+)/dg;  // d 标志

for (const match of str.matchAll(regex)) {
  console.log(match[0]);        // 匹配的文本
  console.log(match.indices);   // 索引位置
  // [0, 7] 和 [[0, 7], [4, 7]]
}
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices)
