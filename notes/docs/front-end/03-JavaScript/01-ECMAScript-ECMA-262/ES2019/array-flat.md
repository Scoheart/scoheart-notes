# Array.prototype.flat() / flatMap()

> ECMAScript 2019 (ES10)

扁平化嵌套数组。

```javascript
// flat
const arr = [1, [2, 3], [4, [5, 6]]];
console.log(arr.flat());     // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(2));    // [1, 2, 3, 4, 5, 6]
console.log(arr.flat(Infinity));  // 完全扁平化

// flatMap
const arr2 = [1, 2, 3];
console.log(arr2.flatMap(x => [x, x * 2]));  // [1, 2, 2, 4, 3, 6]
```

[MDN - flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
