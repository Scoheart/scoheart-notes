# JSON Support (JSON 支持)

> ECMAScript 5 (2009)

## 概述

ES5 引入了原生的 JSON 对象,提供了 `JSON.parse()` 和 `JSON.stringify()` 方法来解析和序列化 JSON 数据。

## JSON.parse()

将 JSON 字符串解析为 JavaScript 对象。

### 基本语法

```javascript
JSON.parse(text[, reviver])
```

### 示例

```javascript
// 基本用法
const jsonString = '{"name":"Alice","age":25}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // "Alice"
console.log(obj.age);  // 25

// 解析数组
const arrString = '[1, 2, 3, 4, 5]';
const arr = JSON.parse(arrString);
console.log(arr); // [1, 2, 3, 4, 5]

// 使用 reviver 函数
const dateString = '{"date":"2024-01-01T00:00:00.000Z"}';
const parsed = JSON.parse(dateString, (key, value) => {
  if (key === 'date') {
    return new Date(value);
  }
  return value;
});
console.log(parsed.date instanceof Date); // true
```

## JSON.stringify()

将 JavaScript 值转换为 JSON 字符串。

### 基本语法

```javascript
JSON.stringify(value[, replacer[, space]])
```

### 示例

```javascript
// 基本用法
const obj = { name: 'Alice', age: 25 };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // '{"name":"Alice","age":25}'

// 格式化输出
const formatted = JSON.stringify(obj, null, 2);
console.log(formatted);
// {
//   "name": "Alice",
//   "age": 25
// }

// 使用 replacer 函数
const user = {
  name: 'Bob',
  password: 'secret123',
  age: 30
};

const safeJson = JSON.stringify(user, (key, value) => {
  if (key === 'password') {
    return undefined; // 排除 password 字段
  }
  return value;
});
console.log(safeJson); // '{"name":"Bob","age":30}'

// 使用 replacer 数组
const filtered = JSON.stringify(user, ['name', 'age']);
console.log(filtered); // '{"name":"Bob","age":30}'
```

## toJSON() 方法

对象可以定义 `toJSON()` 方法来自定义序列化行为。

```javascript
const user = {
  name: 'Charlie',
  birthDate: new Date('1990-01-01'),
  toJSON() {
    return {
      name: this.name,
      age: new Date().getFullYear() - this.birthDate.getFullYear()
    };
  }
};

console.log(JSON.stringify(user));
// '{"name":"Charlie","age":35}'
```

## 不可序列化的值

以下值在序列化时会被特殊处理:

```javascript
const obj = {
  func: function() {},      // 函数会被忽略
  undef: undefined,          // undefined 会被忽略
  symbol: Symbol('test'),    // Symbol 会被忽略
  date: new Date(),          // 转换为 ISO 字符串
  regex: /test/,             // 转换为空对象 {}
  nan: NaN,                  // 转换为 null
  infinity: Infinity         // 转换为 null
};

console.log(JSON.stringify(obj));
// '{"date":"2024-01-01T00:00:00.000Z","regex":{},"nan":null,"infinity":null}'
```

## 循环引用

JSON.stringify() 不能处理循环引用:

```javascript
const obj = {};
obj.self = obj;

try {
  JSON.stringify(obj);
} catch (error) {
  console.error(error); // TypeError: Converting circular structure to JSON
}
```

## 实用技巧

### 深拷贝对象

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = JSON.parse(JSON.stringify(original));

copy.b.c = 3;
console.log(original.b.c); // 2 (原对象未被修改)
```

### 比较对象

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 2, a: 1 };

console.log(
  JSON.stringify(obj1) === JSON.stringify(obj2)
); // false (键顺序不同)
```

### 本地存储

```javascript
// 保存到 localStorage
const data = { theme: 'dark', language: 'zh-CN' };
localStorage.setItem('settings', JSON.stringify(data));

// 从 localStorage 读取
const settings = JSON.parse(localStorage.getItem('settings'));
console.log(settings.theme); // "dark"
```

## 注意事项

1. JSON 字符串必须使用双引号
2. 不支持注释
3. 不支持 trailing comma
4. 键名必须是字符串
5. 只能序列化可枚举的自有属性

## 参考资料

- [MDN - JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [MDN - JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [MDN - JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
