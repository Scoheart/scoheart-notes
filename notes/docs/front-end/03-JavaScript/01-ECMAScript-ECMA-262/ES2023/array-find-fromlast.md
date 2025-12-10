# Array findLast / findLastIndex

> ECMAScript 2023 (ES14)

从数组末尾开始查找元素。

```javascript
const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// findLast - 从后向前查找
const last = arr.findLast(x => x > 3);
console.log(last);  // 4

// findLastIndex - 返回索引
const lastIndex = arr.findLastIndex(x => x > 3);
console.log(lastIndex);  // 5

// 对比 find
console.log(arr.find(x => x > 3));  // 4 (第一个)
console.log(arr.findIndex(x => x > 3));  // 3
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
