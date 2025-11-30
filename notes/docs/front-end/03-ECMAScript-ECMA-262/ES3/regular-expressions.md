# Regular Expressions (正则表达式)

> ECMAScript 3 (1999)

## 概述

ES3 引入了对正则表达式的原生支持,基于 Perl 5 的正则表达式语法。

## 基本语法

```javascript
// 字面量方式
const regex1 = /pattern/flags;

// 构造函数方式
const regex2 = new RegExp('pattern', 'flags');
```

## 常用标志(Flags)

- `g` - 全局匹配
- `i` - 不区分大小写
- `m` - 多行模式

## 示例

```javascript
// 匹配邮箱
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
console.log(emailRegex.test('example@email.com')); // true

// 替换文本
const text = 'Hello World';
const newText = text.replace(/World/, 'JavaScript');
console.log(newText); // "Hello JavaScript"

// 全局匹配
const str = 'cat, bat, sat, fat';
const matches = str.match(/at/g);
console.log(matches); // ["at", "at", "at", "at"]
```

## 常用方法

### String 方法
- `match()` - 匹配字符串
- `search()` - 搜索匹配位置
- `replace()` - 替换匹配内容
- `split()` - 分割字符串

### RegExp 方法
- `test()` - 测试是否匹配
- `exec()` - 执行匹配并返回详细信息

## 参考资料

- [MDN - Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
