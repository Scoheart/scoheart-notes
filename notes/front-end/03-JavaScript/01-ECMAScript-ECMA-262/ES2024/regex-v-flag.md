# RegExp v Flag

> ECMAScript 2024 (ES15)

正则表达式 v 标志,支持集合运算。

```javascript
// v 标志支持集合运算和属性
const regex1 = /[\p{Script=Greek}&&\p{Letter}]/v;
const regex2 = /[\p{White_Space}--\t]/v;

// 字符串属性
const regex3 = /^\p{RGI_Emoji}$/v;

console.log(regex3.test('👍'));  // true
console.log(regex3.test('a'));   // false
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)
