## ECMAScript Features (ES2016–ES2024)

本文件梳理 ES2016 至今的新增特性与语法，并配套示例用法。术语采用 RFC 2119 要求动词表述规范性建议。

### ES2016

- Array.prototype.includes
- Exponentiation operator (\*\*)

```js
// Array.prototype.includes
const list = [0, 1, 2];
list.includes(1); // true
list.includes(3); // false

// Exponentiation operator
2 ** 3; // 8
Math.pow(2, 3); // 8 (equivalent)
```

### ES2017

- async/await
- Object.values, Object.entries
- Object.getOwnPropertyDescriptors
- SharedArrayBuffer, Atomics

```js
// async/await
async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

// Object.values / Object.entries
const obj = { a: 1, b: 2 };
Object.values(obj); // [1, 2]
Object.entries(obj); // [["a", 1], ["b", 2]]

// Object.getOwnPropertyDescriptors
const descs = Object.getOwnPropertyDescriptors({ x: 1 });
// { x: { value: 1, writable: true, enumerable: true, configurable: true } }

// SharedArrayBuffer / Atomics (multi-threaded coordination)
const sab = new SharedArrayBuffer(4);
const i32 = new Int32Array(sab);
Atomics.store(i32, 0, 42);
Atomics.load(i32, 0); // 42
```

### ES2018

- Object rest/spread
- Async iterators (`for await...of`)
- Promise.prototype.finally
- RegExp: dotAll (`s`), named capture groups, lookbehind, Unicode property escapes

```js
// Object rest/spread
const user = { id: 1, name: "Ann", role: "admin" };
const { role, ...profile } = user; // profile -> { id, name }
const next = { ...profile, active: true };

// Async iterators
async function* stream() {
  yield 1;
  yield 2;
  yield 3;
}
(async () => {
  for await (const n of stream()) {
    console.log(n);
  }
})();

// Promise.prototype.finally
fetch("/api")
  .then(handle)
  .catch(log)
  .finally(() => spinner.hide());

// RegExp features
"foo\nbar".match(/foo.bar/s); // dotAll
const m = "2024-11-05".match(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/);
m.groups.m; // "11" (named groups)
"abc".match(/(?<=a)b/); // lookbehind
"π".match(/\p{Letter}/u); // Unicode property escapes
```

### ES2019

- Array.prototype.flat, Array.prototype.flatMap
- Object.fromEntries
- String.prototype.trimStart, String.prototype.trimEnd
- Symbol.prototype.description
- Optional catch binding

```js
// flat / flatMap
[1, [2, [3]]].flat(2); // [1, 2, 3]
[1, 2, 3].flatMap((x) => [x, x]); // [1, 1, 2, 2, 3, 3]

// Object.fromEntries
const pairs = [
  ["a", 1],
  ["b", 2],
];
Object.fromEntries(pairs); // { a: 1, b: 2 }

// trimStart / trimEnd
"  hi  ".trimStart(); // "hi  "
"  hi  ".trimEnd(); // "  hi"

// Symbol.description
const s = Symbol("token");
s.description; // "token"

// Optional catch binding
try {
  JSON.parse("not json");
} catch {
  // handle without err variable
}
```

### ES2020

- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- BigInt
- Dynamic `import()`
- `globalThis`
- Promise.allSettled
- `import.meta`

```js
// Optional chaining / Nullish coalescing
const city = user?.profile?.address?.city ?? "Unknown";

// BigInt
const big = 10n ** 20n; // 100000000000000000000n
// Mixing BigInt with Number throws:
// 1n + 1 === TypeError

// Dynamic import
const { parse } = await import("./parser.js");

// globalThis
globalThis.appVersion = "1.2.3";

// Promise.allSettled
const results = await Promise.allSettled([fetch("/a"), fetch("/b")]);

// import.meta
console.log(import.meta.url);
```

### ES2021

- Logical assignment operators (`&&=`, `||=`, `??=`)
- String.prototype.replaceAll
- Promise.any
- WeakRef, FinalizationRegistry
- Numeric separators (`1_000_000`)

```js
// Logical assignment
let a = null;
a ??= "default"; // "default"
let b = 0;
b ||= 42; // 42
let c = true;
c &&= false; // false

// replaceAll
"a-b-a".replaceAll("-", ":"); // "a:b:a"

// Promise.any
const fastest = await Promise.any([fetch("/mirror1"), fetch("/mirror2")]);

// Numeric separators
const n = 1_000_000; // 1000000

// WeakRef / FinalizationRegistry
class Cache {
  #registry = new FinalizationRegistry((key) => this.store.delete(key));
  store = new Map();
  set(key, obj) {
    this.store.set(key, new WeakRef(obj));
    this.#registry.register(obj, key);
  }
}
```

### ES2022

- Class fields (public)
- Private fields/methods/accessors (`#`)
- Top-level await (in ESM)
- RegExp match indices (`/d` flag)
- Error cause (`new Error(msg, { cause })`)
- Object.hasOwn

```js
// Class fields & private members
class Counter {
  #count = 0; // private field
  step = 1; // public field
  inc() {
    this.#count += this.step;
  }
  get value() {
    return this.#count;
  }
}

// Top-level await (ESM only)
const data = await fetch("/config.json").then((r) => r.json());

// RegExp match indices
const re = /(a)(b)/d;
const match = "ab".match(re);
match.indices; // [[0,2],[0,1],[1,2]]

// Error cause
try {
  await doTask();
} catch (e) {
  throw new Error("Task failed", { cause: e });
}

// Object.hasOwn
Object.hasOwn({ x: 1 }, "x"); // true
```

### ES2023

- Array-by-copy methods: `toSorted`, `toReversed`, `toSpliced`, `with`
- `findLast`, `findLastIndex`
- Hashbang grammar (`#!/usr/bin/env node`)

```js
// Array-by-copy
const arr = [3, 1, 2];
arr.toSorted();            // [1, 2, 3] (does not mutate)
arr.toReversed();          // [2, 1, 3] (copy reversed)
arr.toSpliced(1, 1, 9);    // [3, 9, 2] (copy with splice semantics)
arr.with(0, 10);           // [10, 1, 2]

// findLast / findLastIndex
[1, 3, 2, 4].findLast(x => x % 2 === 0);      // 4
[1, 3, 2, 4].findLastIndex(x => x % 2 === 0); // 3

// Hashbang (in scripts)
#!/usr/bin/env node
console.log("Hello");
```

### ES2024

- `Object.groupBy`, `Map.groupBy`
- Set methods: `union`, `intersection`, `difference`, `symmetricDifference`
- `Promise.withResolvers`

```js
// Object.groupBy / Map.groupBy
const list = ["aa", "b", "ccc"];
const byLength = Object.groupBy(list, (s) => String(s.length));
// { "1": ["b"], "2": ["aa"], "3": ["ccc"] }

const groups = new Map([
  ["odd", [1, 3]],
  ["even", [2, 4]],
]);
const m = Map.groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even"));
// Map { "odd" => [1, 3], "even" => [2, 4] }

// Set operations
const aSet = new Set([1, 2, 3]);
const bSet = new Set([3, 4]);
aSet.union(bSet); // Set {1, 2, 3, 4}
aSet.intersection(bSet); // Set {3}
aSet.difference(bSet); // Set {1, 2}
aSet.symmetricDifference(bSet); // Set {1, 2, 4}

// Promise.withResolvers
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve("done"), 100);
await promise; // "done"
```

### Usage Guidance

- Optional chaining and nullish coalescing SHOULD be preferred over long guard chains to improve readability.
- BigInt MUST NOT be mixed directly with Number in arithmetic; conversions MUST be explicit.
- Top-level await MUST be used only in ESM contexts; CommonJS MUST NOT use top-level await.
- WeakRef/FinalizationRegistry SHOULD be used sparingly; resource management MUST primarily rely on explicit lifecycles.
- New Array-by-copy methods SHOULD be preferred when immutability is desired over mutating counterparts.
