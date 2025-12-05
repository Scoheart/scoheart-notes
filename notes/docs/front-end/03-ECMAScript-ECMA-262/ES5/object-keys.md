# Object.keys() / Object.getOwnPropertyNames()

> ECMAScript 5 (2009)

## 概述

ES5 引入了新的方法来获取对象的属性名称。

## Object.keys()

返回对象自身的所有**可枚举**属性名组成的数组。

### 基本语法

```javascript
Object.keys(obj)
```

### 示例

```javascript
const person = {
  name: 'Alice',
  age: 25,
  city: 'New York'
};

console.log(Object.keys(person));
// ["name", "age", "city"]

// 遍历对象
Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});
// name: Alice
// age: 25
// city: New York
```

### 数组

```javascript
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ["0", "1", "2"]

const sparseArr = ['a', , 'c'];
console.log(Object.keys(sparseArr)); // ["0", "2"]
```

### 类数组对象

```javascript
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
console.log(Object.keys(arrayLike)); // ["0", "1", "2", "length"]
```

### 不可枚举属性

```javascript
const obj = {};

Object.defineProperty(obj, 'hidden', {
  value: 'secret',
  enumerable: false
});

Object.defineProperty(obj, 'visible', {
  value: 'public',
  enumerable: true
});

console.log(Object.keys(obj)); // ["visible"]
```

## Object.getOwnPropertyNames()

返回对象自身的**所有**属性名(包括不可枚举属性,但不包括 Symbol 属性)。

### 基本语法

```javascript
Object.getOwnPropertyNames(obj)
```

### 示例

```javascript
const obj = {
  visible: 'yes'
};

Object.defineProperty(obj, 'hidden', {
  value: 'no',
  enumerable: false
});

console.log(Object.keys(obj));
// ["visible"]

console.log(Object.getOwnPropertyNames(obj));
// ["visible", "hidden"]
```

### 内置对象

```javascript
console.log(Object.getOwnPropertyNames(Array.prototype));
// ["length", "constructor", "concat", "pop", "push", ...]

console.log(Object.keys(Array.prototype));
// [] (大部分方法不可枚举)
```

## 两者对比

```javascript
const obj = {
  enumerable1: 'a',
  enumerable2: 'b'
};

Object.defineProperty(obj, 'nonEnumerable', {
  value: 'c',
  enumerable: false
});

console.log(Object.keys(obj));
// ["enumerable1", "enumerable2"]

console.log(Object.getOwnPropertyNames(obj));
// ["enumerable1", "enumerable2", "nonEnumerable"]
```

## 实际应用

### 1. 对象转数组

```javascript
const scores = {
  math: 95,
  english: 87,
  physics: 92
};

const scoresArray = Object.keys(scores).map(key => ({
  subject: key,
  score: scores[key]
}));

console.log(scoresArray);
// [
//   { subject: 'math', score: 95 },
//   { subject: 'english', score: 87 },
//   { subject: 'physics', score: 92 }
// ]
```

### 2. 对象属性计数

```javascript
const data = { a: 1, b: 2, c: 3 };
const propertyCount = Object.keys(data).length;
console.log(propertyCount); // 3
```

### 3. 检查对象是否为空

```javascript
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty({}));        // true
console.log(isEmpty({ a: 1 }));  // false
```

### 4. 对象过滤

```javascript
const user = {
  name: 'Alice',
  age: 25,
  password: 'secret123',
  email: 'alice@example.com'
};

function omit(obj, keys) {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

const publicUser = omit(user, ['password']);
console.log(publicUser);
// { name: 'Alice', age: 25, email: 'alice@example.com' }
```

### 5. 对象合并(自定义逻辑)

```javascript
function merge(target, ...sources) {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      target[key] = source[key];
    });
  });
  return target;
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = merge({}, obj1, obj2);
console.log(result); // { a: 1, b: 3, c: 4 }
```

### 6. 获取所有属性(包括不可枚举)

```javascript
function getAllProperties(obj) {
  const props = new Set();

  while (obj) {
    Object.getOwnPropertyNames(obj).forEach(prop => props.add(prop));
    obj = Object.getPrototypeOf(obj);
  }

  return Array.from(props);
}

const arr = [1, 2, 3];
console.log(getAllProperties(arr));
// ["0", "1", "2", "length", "constructor", "concat", "pop", ...]
```

## 与其他方法对比

| 方法 | 自有属性 | 继承属性 | 可枚举 | 不可枚举 | Symbol |
|------|---------|---------|--------|---------|--------|
| `Object.keys()` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `Object.getOwnPropertyNames()` | ✅ | ❌ | ✅ | ✅ | ❌ |
| `Object.getOwnPropertySymbols()` | ✅ | ❌ | ✅ | ✅ | ✅ |
| `for...in` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `Reflect.ownKeys()` (ES6) | ✅ | ❌ | ✅ | ✅ | ✅ |

## 注意事项

1. 两个方法都只返回对象自有属性,不包括原型链上的属性
2. 返回的数组元素顺序不保证一致(尽管通常按添加顺序)
3. 对于非对象参数,ES5 会抛出错误,ES6+ 会强制转换

```javascript
// ES5
Object.keys('hello'); // TypeError

// ES6+
Object.keys('hello'); // ["0", "1", "2", "3", "4"]
```

## Polyfill

```javascript
if (!Object.keys) {
  Object.keys = function(obj) {
    if (obj !== Object(obj)) {
      throw new TypeError('Object.keys called on non-object');
    }

    const keys = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
}
```

## 参考资料

- [MDN - Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [MDN - Object.getOwnPropertyNames()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
