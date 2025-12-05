# String.prototype.replaceAll()

> ECMAScript 2021 (ES12)

替换所有匹配项。

```javascript
const str = 'hello world, hello universe';

// 旧方式
str.replace(/hello/g, 'hi');  // 'hi world, hi universe'

// 新方式
str.replaceAll('hello', 'hi');  // 'hi world, hi universe'

// 也支持正则
str.replaceAll(/hello/g, 'hi');
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
