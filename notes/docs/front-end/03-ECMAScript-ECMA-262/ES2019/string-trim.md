# String.prototype.trimStart() / trimEnd()

> ECMAScript 2019 (ES10)

去除字符串开头或结尾的空格。

```javascript
const str = '   hello world   ';

console.log(str.trimStart());  // 'hello world   '
console.log(str.trimEnd());    // '   hello world'
console.log(str.trim());       // 'hello world'

// 别名
console.log(str.trimLeft());   // 同 trimStart
console.log(str.trimRight());  // 同 trimEnd
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)
