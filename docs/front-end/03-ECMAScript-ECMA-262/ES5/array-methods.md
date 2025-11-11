# Array Methods (数组方法)

> ECMAScript 5 (2009)

## 概述

ES5 为数组添加了多个强大的迭代和操作方法。

## 迭代方法

### forEach()

遍历数组的每个元素。

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index, array) => {
  console.log(`Index ${index}: ${num}`);
});
// Index 0: 1
// Index 1: 2
// ...
```

### map()

创建一个新数组,包含对每个元素调用函数的结果。

```javascript
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(num => num ** 2);

console.log(squared); // [1, 4, 9, 16, 25]
console.log(numbers); // [1, 2, 3, 4, 5] (原数组不变)
```

### filter()

创建一个新数组,包含通过测试的所有元素。

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(num => num % 2 === 0);

console.log(evens); // [2, 4, 6, 8, 10]
```

### reduce()

对数组的每个元素执行 reducer 函数,将结果汇总为单个值。

```javascript
const numbers = [1, 2, 3, 4, 5];

// 求和
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// 求积
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

// 统计
const votes = ['yes', 'no', 'yes', 'yes', 'no'];
const tally = votes.reduce((acc, vote) => {
  acc[vote] = (acc[vote] || 0) + 1;
  return acc;
}, {});
console.log(tally); // { yes: 3, no: 2 }
```

### reduceRight()

从右到左执行 reduce 操作。

```javascript
const numbers = [1, 2, 3, 4, 5];

const result = numbers.reduceRight((acc, num) => {
  console.log(`acc: ${acc}, num: ${num}`);
  return acc - num;
}, 0);

// acc: 0, num: 5
// acc: -5, num: 4
// acc: -9, num: 3
// acc: -12, num: 2
// acc: -14, num: 1
console.log(result); // -15
```

### some()

测试数组中是否至少有一个元素通过测试。

```javascript
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.some(num => num > 3)); // true
console.log(numbers.some(num => num > 10)); // false

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];

console.log(users.some(user => user.age < 18)); // true
```

### every()

测试数组中的所有元素是否都通过测试。

```javascript
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.every(num => num > 0)); // true
console.log(numbers.every(num => num > 3)); // false

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 22 }
];

console.log(users.every(user => user.age >= 18)); // true
```

## 查找方法

### indexOf()

返回元素在数组中首次出现的索引,如果不存在返回 -1。

```javascript
const fruits = ['apple', 'banana', 'orange', 'banana'];

console.log(fruits.indexOf('banana')); // 1
console.log(fruits.indexOf('grape')); // -1
console.log(fruits.indexOf('banana', 2)); // 3 (从索引 2 开始查找)
```

### lastIndexOf()

从右向左查找元素,返回最后一次出现的索引。

```javascript
const numbers = [1, 2, 3, 2, 1];

console.log(numbers.lastIndexOf(2)); // 3
console.log(numbers.lastIndexOf(1)); // 4
console.log(numbers.lastIndexOf(5)); // -1
```

## 实际应用

### 1. 数据转换

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

// 提取特定字段
const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']

// 创建查找表
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
console.log(userMap);
// { 1: { id: 1, ... }, 2: { id: 2, ... }, 3: { id: 3, ... } }
```

### 2. 数据过滤

```javascript
const products = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: true },
  { name: 'Keyboard', price: 75, inStock: false },
  { name: 'Monitor', price: 300, inStock: true }
];

// 过滤库存商品
const available = products.filter(p => p.inStock);

// 过滤价格范围
const affordable = products.filter(p => p.price < 100);

// 链式调用
const result = products
  .filter(p => p.inStock)
  .filter(p => p.price < 500)
  .map(p => p.name);

console.log(result); // ['Mouse', 'Monitor']
```

### 3. 数据验证

```javascript
const form = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
};

const requiredFields = ['name', 'email', 'age'];

// 检查所有必填字段是否填写
const isValid = requiredFields.every(field => {
  return form[field] !== undefined && form[field] !== '';
});

console.log(isValid); // true
```

### 4. 统计分析

```javascript
const scores = [85, 90, 78, 92, 88, 95];

// 平均分
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

// 最高分
const max = scores.reduce((max, score) => Math.max(max, score), -Infinity);

// 最低分
const min = scores.reduce((min, score) => Math.min(min, score), Infinity);

// 及格人数
const passCount = scores.filter(score => score >= 60).length;

console.log({ average, max, min, passCount });
// { average: 88, max: 95, min: 78, passCount: 6 }
```

### 5. 数组去重

```javascript
const numbers = [1, 2, 3, 2, 4, 1, 5, 3];

const unique = numbers.filter((num, index, array) => {
  return array.indexOf(num) === index;
});

console.log(unique); // [1, 2, 3, 4, 5]
```

### 6. 分组

```javascript
const people = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'London' },
  { name: 'Charlie', age: 25, city: 'New York' },
  { name: 'David', age: 30, city: 'London' }
];

const byCity = people.reduce((acc, person) => {
  const city = person.city;
  if (!acc[city]) {
    acc[city] = [];
  }
  acc[city].push(person);
  return acc;
}, {});

console.log(byCity);
// {
//   'New York': [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   'London': [{ name: 'Bob', ... }, { name: 'David', ... }]
// }
```

### 7. 扁平化数组

```javascript
const nested = [[1, 2], [3, 4], [5, 6]];

const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

### 8. 管道(Pipeline)模式

```javascript
const pipeline = [
  nums => nums.filter(n => n > 0),
  nums => nums.map(n => n * 2),
  nums => nums.reduce((sum, n) => sum + n, 0)
];

const numbers = [-1, 2, -3, 4, 5];

const result = pipeline.reduce((data, fn) => fn(data), numbers);
console.log(result); // 22 (2*2 + 4*2 + 5*2)
```

## 方法链

```javascript
const data = [
  { product: 'Laptop', price: 1000, quantity: 2 },
  { product: 'Mouse', price: 25, quantity: 5 },
  { product: 'Keyboard', price: 75, quantity: 3 }
];

const total = data
  .filter(item => item.quantity > 0)
  .map(item => ({ ...item, total: item.price * item.quantity }))
  .reduce((sum, item) => sum + item.total, 0);

console.log(total); // 2350
```

## 注意事项

1. 这些方法不会修改原数组(除了 forEach)
2. 回调函数接收三个参数:(currentValue, index, array)
3. 可以传入 thisArg 作为回调函数的 this
4. 稀疏数组的空位会被跳过

```javascript
const sparse = [1, , 3, , 5];

// 空位被跳过
sparse.forEach(num => console.log(num)); // 1, 3, 5

// map 保留空位
const mapped = sparse.map(num => num * 2);
console.log(mapped); // [2, empty, 6, empty, 10]
```

## 性能考虑

```javascript
// 不好:多次遍历
const result1 = arr
  .filter(condition1)
  .filter(condition2)
  .map(transform);

// 更好:单次遍历
const result2 = arr.reduce((acc, item) => {
  if (condition1(item) && condition2(item)) {
    acc.push(transform(item));
  }
  return acc;
}, []);
```

## 参考资料

- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
