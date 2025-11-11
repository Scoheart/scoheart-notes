# ECMAScript Versions & Features

下表汇总 ECMAScript 各版本与主要特性；每个版本的特性以换行分隔，便于快速查阅与对照兼容策略。

| ECMAScript Version | Key Features                                                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ES5                | strict mode<br>JSON<br>Object.create<br>Array extras (map/filter/reduce)<br>Function.bind                                                                                         |
| ES5.1              | Editorial corrections and clarifications to ES5 (e.g., JSON)                                                                                                                      |
| ES2015 (ES6)       | let/const<br>arrow functions<br>classes<br>template literals<br>destructuring<br>default/rest/spread<br>modules (import/export)<br>Promises<br>Map/Set<br>Symbol<br>Proxy/Reflect |
| ES2016             | Array.prototype.includes<br>Exponentiation operator (`**`)                                                                                                                        |
| ES2017             | async/await<br>Object.values / Object.entries<br>Object.getOwnPropertyDescriptors<br>SharedArrayBuffer / Atomics                                                                  |
| ES2018             | Object rest/spread<br>async iterators (for await...of)<br>Promise.prototype.finally<br>RegExp: dotAll (`s`) / named groups / lookbehind / Unicode property escapes                |
| ES2019             | Array.prototype.flat / flatMap<br>Object.fromEntries<br>String.prototype.trimStart / trimEnd<br>Symbol.prototype.description                                                      |
| ES2020             | Optional chaining (`?.`)<br>Nullish coalescing (`??`)<br>BigInt<br>dynamic `import()`<br>globalThis<br>Promise.allSettled                                                         |
| ES2021             | Logical assignment (`&&=` / `\|\|=` / `??=`)<br>String.prototype.replaceAll<br>Promise.any<br>WeakRef / FinalizationRegistry                                                      |
| ES2022             | Class fields (public)<br>Private fields/methods/accessors (`#`)<br>Top-level await<br>RegExp match indices (`d`)                                                                  |
| ES2023             | Array by copy: `toSorted` / `toReversed` / `toSpliced` / `with`<br>`findLast` / `findLastIndex`<br>Hashbang grammar (`#!`)                                                        |
| ES2024             | `Object.groupBy` / `Map.groupBy`<br>Set methods: `union` / `intersection` / `difference` / `symmetricDifference`<br>`Promise.withResolvers`                                       |

注：Proxy/Reflect `MUST NOT` 期望通过 Polyfill 提供完整行为；如需兼容，`MUST` 通过降级策略与运行时能力检测（feature detection）处理。
