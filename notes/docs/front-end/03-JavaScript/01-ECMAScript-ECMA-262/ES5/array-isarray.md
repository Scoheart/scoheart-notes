# Array.isArray()

> ECMAScript 5 (2009)

## 概述

`Array.isArray()` 方法用于确定传递的值是否是一个 Array,是检测数组类型的可靠方法。

## 基本语法

```javascript
Array.isArray(value)
```

## 示例

### 基本用法

```javascript
// 数组
console.log(Array.isArray([1, 2, 3]));        // true
console.log(Array.isArray([]));                // true
console.log(Array.isArray(new Array()));       // true
console.log(Array.isArray(new Array(5)));      // true

// 非数组
console.log(Array.isArray('array'));           // false
console.log(Array.isArray(123));               // false
console.log(Array.isArray(true));              // false
console.log(Array.isArray(null));              // false
console.log(Array.isArray(undefined));         // false
console.log(Array.isArray({ length: 0 }));     // false
console.log(Array.isArray(arguments));         // false
```

### 类数组对象

```javascript
// NodeList
const divs = document.querySelectorAll('div');
console.log(Array.isArray(divs)); // false

// Arguments
function test() {
  console.log(Array.isArray(arguments)); // false
}
test();

// String
console.log(Array.isArray('hello')); // false
```

## 为什么需要 Array.isArray()

### 1. typeof 的局限性

```javascript
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
// 无法区分数组和对象
```

### 2. instanceof 的问题

```javascript
// 在同一个全局环境下工作正常
console.log([] instanceof Array); // true

// 跨 iframe 问题
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const iframeArray = window.frames[0].Array;

const arr = new iframeArray(1, 2, 3);
console.log(arr instanceof Array);        // false (不同的 Array 构造函数)
console.log(Array.isArray(arr));          // true (可靠)
```

### 3. constructor 的不可靠性

```javascript
const arr = [1, 2, 3];
console.log(arr.constructor === Array); // true

// 但 constructor 可以被修改
arr.constructor = Object;
console.log(arr.constructor === Array); // false
console.log(Array.isArray(arr));        // true (仍然可靠)
```

### 4. Object.prototype.toString

```javascript
// 在 Array.isArray 之前的传统方法
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

console.log(isArray([1, 2, 3])); // true
console.log(isArray({}));         // false

// Array.isArray 是更简洁的替代方案
console.log(Array.isArray([1, 2, 3])); // true
```

## 实际应用

### 1. 参数验证

```javascript
function processItems(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('Expected an array');
  }

  return items.map(item => item * 2);
}

try {
  processItems([1, 2, 3]);   // [2, 4, 6]
  processItems('not array'); // TypeError
} catch (e) {
  console.error(e.message);
}
```

### 2. 类型标准化

```javascript
function ensureArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

console.log(ensureArray([1, 2, 3])); // [1, 2, 3]
console.log(ensureArray('hello'));   // ['hello']
console.log(ensureArray(42));        // [42]
```

### 3. 深拷贝

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const data = {
  name: 'Alice',
  scores: [85, 90, 78],
  address: {
    city: 'New York',
    tags: ['home', 'work']
  }
};

const cloned = deepClone(data);
console.log(cloned);
```

### 4. 递归扁平化

```javascript
function flatten(arr) {
  const result = [];

  arr.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

const nested = [1, [2, [3, [4, 5]]]];
console.log(flatten(nested)); // [1, 2, 3, 4, 5]
```

### 5. 数据序列化

```javascript
function serialize(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  if (Array.isArray(value)) {
    const items = value.map(serialize).join(',');
    return `[${items}]`;
  }

  if (typeof value === 'object') {
    const pairs = Object.keys(value).map(key => {
      return `${key}:${serialize(value[key])}`;
    });
    return `{${pairs.join(',')}}`;
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return String(value);
}

console.log(serialize({ name: 'Alice', tags: ['dev', 'design'] }));
// {name:"Alice",tags:["dev","design"]}
```

### 6. 类型守卫(TypeScript)

```typescript
function processValue(value: unknown) {
  if (Array.isArray(value)) {
    // TypeScript 知道这里 value 是数组
    return value.map(item => item * 2);
  }

  if (typeof value === 'number') {
    return value * 2;
  }

  throw new Error('Invalid type');
}
```

### 7. 条件渲染

```javascript
function renderItems(data) {
  if (!Array.isArray(data)) {
    return '<div>No data</div>';
  }

  return data.map(item => `<div>${item}</div>`).join('');
}

console.log(renderItems([1, 2, 3]));
// <div>1</div><div>2</div><div>3</div>

console.log(renderItems(null));
// <div>No data</div>
```

## Polyfill

```javascript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

## 性能

`Array.isArray()` 通常比其他方法更快:

```javascript
// 性能测试
const arr = [1, 2, 3];
const iterations = 1000000;

// Array.isArray (最快)
console.time('Array.isArray');
for (let i = 0; i < iterations; i++) {
  Array.isArray(arr);
}
console.timeEnd('Array.isArray');

// instanceof
console.time('instanceof');
for (let i = 0; i < iterations; i++) {
  arr instanceof Array;
}
console.timeEnd('instanceof');

// Object.prototype.toString
console.time('toString');
for (let i = 0; i < iterations; i++) {
  Object.prototype.toString.call(arr) === '[object Array]';
}
console.timeEnd('toString');
```

## 最佳实践

1. **优先使用 Array.isArray()** - 它是最可靠和标准的方法
2. **避免使用 instanceof** - 在跨 iframe 场景下不可靠
3. **不要依赖 constructor** - 可以被修改
4. **类型转换前先检查** - 避免运行时错误

```javascript
// 好的实践
function safeJoin(arr, separator = ',') {
  if (!Array.isArray(arr)) {
    console.warn('Expected array, got', typeof arr);
    return '';
  }
  return arr.join(separator);
}

// 不好的实践
function unsafeJoin(arr, separator = ',') {
  return arr.join(separator); // 如果 arr 不是数组会报错
}
```

## 参考资料

- [MDN - Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
