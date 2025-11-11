# RegExp Improvements

> ECMAScript 2018 (ES9)

正则表达式增强:命名捕获组、后行断言、s 标志、Unicode 属性转义。

```javascript
// 命名捕获组
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2024-01-15');
console.log(match.groups.year);   // '2024'
console.log(match.groups.month);  // '01'

// s (dotAll) 标志
/foo.bar/s.test('foo\nbar');  // true

// 后行断言
/(?<=\$)\d+/.exec('$100');  // ['100']
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
