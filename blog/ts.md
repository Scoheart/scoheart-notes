#

# typescript 如何区分 script(non-module) 和 module

在 typescript/javascript 中，一个 .ts/.js 文件，要么是 module，要么是 script。

## script(non-module)

一个 .ts/.js 文件，如果符合以下任意一个条件，则被当作 script(non-module) 来处理：

1. 没有 import/export 语法
2. 没有 top-level await

这也就意味着，如果我们开始新建一个 typescript 项目，如果目录如下：

```ts
// 项目目录
src;
index.ts;
index2.ts;

// index.ts
const a = 1;

// index2.ts
const a = 2;
```

那么这里，index.ts 和 index2.ts 都是 script(non-module)，因为它们都没有 import/export 语法，也没有 top-level await。而当我们使用 tsc 编译时，会发现编译器会报错：

```ts
// src/index.ts 的 Error 信息
Cannot redeclare block-scoped variable 'a'.ts(2451)
index2.ts(1, 7): 'a' was also declared here.

// src/index2.ts 的 Error 信息
Cannot redeclare block-scoped variable 'a'.ts(2451)
index.ts(1, 7): 'a' was also declared here.
```

这里的错误，就是因为 typescript 在编译时，发现 index.ts 和 index2.ts 都是 script(non-module)，而 script 文件里声明的变量、函数、类等是共享全局作用域的，所以这里就不能重复声明`a` 变量。

为什么说 script 类型的文件里声明的变量、函数、类等是共享全局作用域的呢？因为这里针对 script 类型的 .ts 文件编译后产生的 .js 文件的使用，有两种使用场景的假设：

1. 第一种情况是假设你开启了 typescript 的编译器的配置项 `--outFile`，那么 typescript 会将所有的 script 类型的 .ts 文件编译并且打包为独一个 .js 文件，在这个 .js 文件里，所有声明的变量、函数、类等，也都是共享全局作用域的。
2. 第二种情况是假设你将会在一个 HTML 文件里，通过`<script src="path/to/index.js"></script>`的方式来使用全部的编译后 .js 文件，那么此场景下，引入的所有 .js 文件中，所有声明的变量、函数、类等，也都是共享全局作用域的。

> - https://www.typescriptlang.org/docs/handbook/2/modules.html#non-modules

## module

一个 .ts/.js 文件，如果符合以下任意一个条件，则被当作 module 来处理：

1. 有 import/export 语法
2. 有 top-level await

### module syntax

那么，在 typescript 中，共有哪些相关的 module syntax 呢？首先，我们需要知道 typescript compiler（tsc） 能识别两种 module syntax：

1. standard ECMAScript module syntax （在项目中的 .ts/.js 文件中都能识别）
2. CommonJS syntax（只能在项目中的 .js 文件中识别）

所以，如果我们在 .ts 文件中写了如下的代码：

```ts
// xxx.ts
const path = require('path');

/**
 * 那么，当我们使用 tsc 编译时，会出现下面的这个错误信息。因为在 .ts 文件中，typescript compiler 无法识别 CommonJS 的 require 语法。
 *
 * xxx.ts:1:14 - error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
 */
```

其次，除了上述两种 module syntax 之外，typescript 还有一些 TypeScript-specific syntax

综上，在 typescript 中，module syntax 可以划分为：

1. standard ECMAScript module syntax
2. CommonJS syntax
3. TypeScript-specific syntax

#### standard ECMAScript module syntax

略

#### CommonJS syntax

略

#### TypeScript-specific syntax

1. Importing and exporting TypeScript-specific declarations

Type aliases、Interfaces、Namespaces、Enums 都可以通过 import/export 语法导入和导出。

2. Type-only imports and exports

3. import() types

4. export = and import = require()

5. Ambient modules

> 本小节 reference：
>
> - https://www.typescriptlang.org/docs/handbook/2/modules.html#modules-in-typescript
> - [commonjs-modules-are-supported](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#commonjs-modules-are-supported)
> - [module-syntax](https://www.typescriptlang.org/docs/handbook/modules/reference.html#module-syntax)
