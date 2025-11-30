# String Padding

> ECMAScript 2017 (ES8)

`padStart()` 和 `padEnd()` 用于填充字符串。

```javascript
// padStart
'5'.padStart(3, '0');      // '005'
'hello'.padStart(10, '*'); // '*****hello'

// padEnd
'5'.padEnd(3, '0');        // '500'
'hello'.padEnd(10, '*');   // 'hello*****'
```

[MDN - padStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
