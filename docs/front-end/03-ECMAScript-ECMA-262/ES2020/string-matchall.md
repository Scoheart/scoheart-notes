# String.prototype.matchAll()

> ECMAScript 2020 (ES11)

返回所有匹配的迭代器。

```javascript
const str = 'test1test2test3';
const regex = /test(\d)/g;

// matchAll
for (const match of str.matchAll(regex)) {
  console.log(match[0], match[1]);
}
// test1 1
// test2 2
// test3 3

// 转为数组
const matches = [...str.matchAll(regex)];
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
