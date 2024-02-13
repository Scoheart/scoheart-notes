# JavaScript Compiler

## 什么是 Compiler

babel 的官方文档中说：Babel 是一个工具链，主要用于在当前和较旧的浏览器或环境中将 ECMAScript 2015+代码转换为向后兼容的 JavaScript 版本。

swc (Speedy Web Compiler) 的官方文档中说：当 swc 被用做编译工具的时候，它接受使用现代 JavaScript 特性的 JavaScript / TypeScript 文件，并输出所有主流浏览器支持的有效代码。

tsc (Typescript Compiler)：tsc 是 Typescript 的官方编译器，可将 typescript 文件转换/编译为 javascript。

因此，JavaScript Compiler 就是一类工具，他们的职责大致可以划分两类：

1. 就是将语法特性较新的 JavaScript（如 ES2015+）转换为语法特性版本比较低的 JavaScript（如 ES3、ES5）。
2. 将非纯 JavaScript（JSX、Typescript、Flow、CoffeeScript、Vue Template 等）转换为 Vanilla JavaScript（纯 JavaScript、香草 JavaScript）。

## 有哪些 Compiler

- babel
- swc
- tsc

流行度低或已老旧

- [buble](https://github.com/bublejs/buble)
- [traceur-compiler](https://github.com/google/traceur-compiler)

## 如何使用 Compiler

### Babel 的使用

Babel 的代码仓库是一个 monorepo，由许多的 npm 包构成。首先我们需要用到的两个包为：

- @babel/core： Babel 的核心模块，负责解析、转换和生成代码
- @babel/cli： Babel 的命令行工具，可以在终端中直接运行 Babel。

先初始化项目，并且给出一个代码文件。

```js
// index.js
const fn = () => {
  console.log("I'm a arrow function");
};
```

下载 babel 的 npm 包，进行编译工作。

```bash
# 下载npm包
npm install --save-dev @babel/core @babel/cli

# 使用babel的CLI工具进行编译
./node_modules/.bin/babel <source> --out-file <target>
# e.g.
./node_modules/.bin/babel index.js --out-file target.js
```

```js
// target.js
const fn = () => {
  console.log("I'm a arrow function");
};
```

但是，当你执行完成上面的编译命令后，你会发现，你的 JavaScript 中最新的语法特性（箭头函数）还是没有被降级。target.js 中的 JavaScript 代码，根本没有任何变化。

这是因为，默认情况下，Babel 不做任何事情，你需要给 Babel 提供「插件」或「预设」。Babel 是通过插件和预设来进行实际的编译工作的。

例如：我们需要将箭头函数这个 ES2015 的语法特性降级，那么我们就需要下载 @babel/plugin-transform-arrow-functions 这个插件，同时在使用的时候要告诉 Babel，我们要使用这个插件参与编译。

```bash
./node_modules/.bin/babel index.js --out-file target.js --plugins @babel/plugin-transform-arrow-functions
```

那么现在，我们的 target.js 中的 JavaScript 代码就没有箭头函数了，留下的只是一个普通的函数表达式。

```js
// target.js
const fn = function () {
  console.log("I'm a arrow function");
};
```

上面的操作都是对于「插件」而言的，那么「预设」又是什么呢？其实预设就是一组插件，一堆插件的集合。

例如我们还是想要进行箭头函数的语法降级，但同时，我们也想将类、解构赋值、展开运算符等语法特性也进行降级。那么，我们还是使用插件的话，就需要自己一个一个的寻找和下载插件，这就比较费时费力了，故 Babel 提供了预设，我们可以直接使用 Babel 的预设 —— 插件集，来代替自己寻找一个个的插件。

```js
// index.js
const fn = () => {
  console.log("I'm a arrow function");
};

let { name, age } = {
  name: 'scoheart',
  age: 18,
};

var a = ['a', 'b', 'c'];

var b = [...a, 'foo'];

class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log('Hello', this.name);
  }
}
```

```bash

npm install --save-dev @babel/preset-env

./node_modules/.bin/babel index.js --out-file target.js --presets @babel/preset-env
```

```js
// target.js
//下面只是部分代码，省略了一些函数……
var fn = function fn() {
  console.log("I'm a arrow function");
};
var _name$age = {
    name: 'scoheart',
    age: 18,
  },
  name = _name$age.name,
  age = _name$age.age;
var a = ['a', 'b', 'c'];
var b = [].concat(a, ['foo']);
var Test = /*#__PURE__*/ (function () {
  function Test(name) {
    _classCallCheck(this, Test);
    this.name = name;
  }
  _createClass(Test, [
    {
      key: 'logger',
      value: function logger() {
        console.log('Hello', this.name);
      },
    },
  ]);
  return Test;
})();
```

但是，一旦我们要联合额外的插件和预设一起使用，或者增加一些配置，那么在命令行里面去指定这些就略显繁琐，例如

```bash
./node_modules/.bin/babel <source> --out-dir <dir> --presets @babel/preset-env,@babel/preset-react --plugins @babel/plugin-transform-typescript,@babel/plugin-proposal-class-properties
```

因此 Babel 还提供了配置文件，通过配置文件，我们可以将所有的配置集中在一个地方，而不必每次都在命令行中手动添加所有的预设和插件。

```js
// babel.config.js
module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
    // 添加其他预设
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
    // 添加其他插件
  ]
}
```

这样能够使配置更加清晰、易于维护，并且提高了可重用性。在大型项目中，使用配置文件可以更方便地组织和管理 Babel 的配置。
