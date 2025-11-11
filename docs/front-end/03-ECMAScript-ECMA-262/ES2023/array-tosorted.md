# Array Copy Methods

> ECMAScript 2023 (ES14)

不修改原数组的排序/反转/替换方法。

```javascript
const arr = [3, 1, 4, 1, 5];

// toSorted - 排序(不改变原数组)
const sorted = arr.toSorted();
console.log(sorted);  // [1, 1, 3, 4, 5]
console.log(arr);     // [3, 1, 4, 1, 5] (不变)

// toReversed - 反转
const reversed = arr.toReversed();
console.log(reversed);  // [5, 1, 4, 1, 3]

// toSpliced - 替换
const spliced = arr.toSpliced(1, 2, 'a', 'b');
console.log(spliced);  // [3, 'a', 'b', 1, 5]

// with - 替换指定索引
const replaced = arr.with(2, 999);
console.log(replaced);  // [3, 1, 999, 1, 5]
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
