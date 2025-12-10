# Object.groupBy() / Map.groupBy()

> ECMAScript 2024 (ES15)

对数组元素进行分组。

```javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

// Object.groupBy
const byAge = Object.groupBy(people, person => person.age);
console.log(byAge);
// {
//   '25': [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   '30': [{ name: 'Bob', ... }]
// }

// Map.groupBy (返回 Map 对象)
const mapByAge = Map.groupBy(people, person => person.age);
console.log(mapByAge.get(25));  // [{ name: 'Alice', ... }, ...]
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
