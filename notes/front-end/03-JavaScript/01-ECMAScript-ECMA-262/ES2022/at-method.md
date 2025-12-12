# .at() Method

> ECMAScript 2022 (ES13)

通过索引访问元素,支持负索引。

```javascript
const arr = ['a', 'b', 'c', 'd'];

// 正索引
console.log(arr.at(0));   // 'a'
console.log(arr.at(2));   // 'c'

// 负索引
console.log(arr.at(-1));  // 'd' (最后一个)
console.log(arr.at(-2));  // 'c' (倒数第二个)

// 字符串也支持
'hello'.at(-1);  // 'o'
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
