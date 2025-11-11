# Logical Assignment Operators

> ECMAScript 2021 (ES12)

逻辑赋值运算符。

```javascript
// ||= (逻辑或赋值)
let a = null;
a ||= 'default';  // a = 'default'

// &&= (逻辑与赋值)
let b = 'value';
b &&= 'new';  // b = 'new'

// ??= (空值合并赋值)
let c = null;
c ??= 'default';  // c = 'default'

let d = 0;
d ??= 10;  // d = 0 (不是 null/undefined)
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)
