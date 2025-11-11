# Strict Mode (严格模式)

> ECMAScript 5 (2009)

## 概述

严格模式是一种采用更严格 JavaScript 语法和错误处理的运行模式,可以帮助开发者编写更安全、更优化的代码。

## 启用严格模式

### 全局严格模式

```javascript
'use strict';

// 整个脚本都在严格模式下运行
function myFunction() {
  // ...
}
```

### 函数级严格模式

```javascript
function myFunction() {
  'use strict';
  // 只有此函数在严格模式下运行
}
```

## 主要变化

### 1. 禁止使用未声明的变量

```javascript
'use strict';

x = 10; // ReferenceError: x is not defined
```

### 2. 禁止删除不可删除的属性

```javascript
'use strict';

delete Object.prototype; // TypeError
```

### 3. 禁止对象字面量重复属性

```javascript
'use strict';

const obj = {
  prop: 1,
  prop: 2  // SyntaxError (ES5 严格模式)
};
```

### 4. 禁止函数参数重名

```javascript
'use strict';

function sum(a, a, c) { // SyntaxError
  return a + a + c;
}
```

### 5. 禁止八进制语法

```javascript
'use strict';

const num = 010; // SyntaxError
```

### 6. 禁止使用 with 语句

```javascript
'use strict';

with (Math) { // SyntaxError
  x = cos(2);
}
```

### 7. eval 有独立作用域

```javascript
'use strict';

eval('var x = 10');
console.log(x); // ReferenceError
```

### 8. this 不会自动装箱

```javascript
'use strict';

function test() {
  console.log(this); // undefined (非严格模式下是全局对象)
}

test();
```

### 9. 禁止使用保留字作为变量名

```javascript
'use strict';

const implements = 1;  // SyntaxError
const interface = 2;   // SyntaxError
const let = 3;         // SyntaxError
const package = 4;     // SyntaxError
const private = 5;     // SyntaxError
const protected = 6;   // SyntaxError
const public = 7;      // SyntaxError
const static = 8;      // SyntaxError
const yield = 9;       // SyntaxError
```

## 优势

1. **消除代码静默错误** - 将错误转换为显式抛出
2. **提高性能** - 某些优化只在严格模式下有效
3. **为未来版本铺路** - 禁用可能在未来版本中使用的语法
4. **更安全** - 禁止一些不安全的操作

## 最佳实践

```javascript
// 推荐:在模块或函数顶部使用
'use strict';

function processData(data) {
  // 严格模式下的代码
  if (!data) {
    throw new Error('数据不能为空');
  }

  return data.map(item => item.value);
}
```

## 注意事项

1. 严格模式不能在块级作用域中声明
2. ES6 模块和类默认采用严格模式
3. 不同脚本可以有不同的严格模式设置

## 参考资料

- [MDN - Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
