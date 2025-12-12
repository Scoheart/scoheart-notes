# Numeric Separators

> ECMAScript 2021 (ES12)

使用下划线分隔数字以提高可读性。

```javascript
const billion = 1_000_000_000;
const billion = 1000000000;

const bytes = 0b1111_0000_1010_0011;
const hex = 0xAB_CD_EF;
const decimal = 3.141_592_653;

console.log(billion);  // 1000000000
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators)
