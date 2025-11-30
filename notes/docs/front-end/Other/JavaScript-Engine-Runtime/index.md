# ECMAscript、JavaScript、JS Engine、JS Runtime

## JavaScript vs. ECMAscript

ECMAScript 是一个标准，JavaScript 是 ECMAScript 的实现。

### ECMAScript

- ECMAScript 是一种脚本语言的规范，由 Ecma International 标准化组织定义。该规范定义了语言的核心特性和行为，包括语法、类型、语句、关键字等。
- ECMAScript 并不直接实现具体的功能，而是提供了一种标准，以便不同的平台和环境可以根据该标准实现自己的 JavaScript 引擎。
- ECMAScript 规定了 JavaScript 中的基本语法和功能，但没有规定与环境交互的具体方式，比如 DOM (Document Object Model)、BOM (Browser Object Model)。

### JavaScript

- JavaScript 是一种基于 ECMAScript 规范的实现。它是一种高级、解释性的脚本语言，通常用于在 Web 页面上实现动态交互效果。
- JavaScript 包含了 ECMAScript 规范定义的核心特性，同时也具有与 Web 浏览器相关的附加功能，如操作 DOM、处理事件、与服务器通信等。
- JavaScript 还可以用于非浏览器环境，例如服务器端的 Node.js 环境。

## JavaScript 语言的执行方式

从语言的执行方式划分，我们可以将 JavaScript 划分为解释型语言，同时我们可以知道，解释型语言的执行需要解释器。通常解释器解释一行代码，执行一行代码。而 JavaScript 引擎，就是用来解析 JavaScript 代码的。

## JavaScript/ECMAScript Engine

https://en.wikipedia.org/wiki/JavaScript_engine

https://en.wikipedia.org/wiki/List_of_ECMAScript_engines

ECMAScript 引擎是一个执行用 ECMAScript 语言标准版本(例如 JavaScript)编写的源代码的程序

### Just-in-time compilation engines

下面的这些 ECMAScript 引擎实现了即时编译技术。JIT 编译器在运行时将 JavaScript 代码转换为本地机器代码，而不是每次都解释执行。通过在运行时动态地分析代码，找到热点（被频繁执行的部分），并将这些部分编译成机器代码，提高 JavaScript 程序的整体性能。

| JavaScript Engine   | Company or Developer |
| :-----------------: | :------------------: |
|         V8          |        Google        |
|    SpiderMonkey     |       Mozilla        |
|   JavaScriptCore    |        Apple         |
|   Chakra(JScript)   |      Microsoft       |
|       Chakra        |      Microsoft       |
|       Hermes        |       Facebook       |
|       Carakan       |        Opera         |

### Runtime interpreter engines

以下引擎使用运行时解释器，它们不会编译为本机机器代码，并且通常运行速度较慢。

| JavaScript Engine   |       Company or Developer       |
| :-----------------: | :------------------------------: |
|       QuickJS       | Fabrice Bellard & Charlie Gordon |
|         KJS         |               KDE                |
|       Duktape       |           Sami Vaarala           |

## JavaScirpt Runtime

大多数情况下，JavaScript 语言不仅仅是在独立的环境中执行，而是需要与一些外部的环境交互，以至于执行有用的程序。

JavaScript Runtime 就是 JavaScript 代码执行的地方。但是 JavaScript Runtime 本身不会执行 JavaScript 代码（执行 JavaScript 代码的任务由其中的 JavaScript Engine 完成）。JavaScript Runtime 只是提供一些 API，让 JavaScript 代码可以与外部环境交互。

例如，最常见的 JavaScript Runtime 是浏览器，对于浏览器而言，它给 JavaScript 提供了访问 Window 对象，操作 DOM 对象、发送 Ajax 请求等 Web APIs。

或者，Nodejs 给其中的 JavaScript 提供了访问文件系统、创建 TCP/UDP 服务器、发送 HTTP 请求等 Node APIs。

举例：

浏览器(以 Chrome 为例)这个 JavaScript Runtime 就可以划分为：

- V8 —— JavaScript 引擎
- Window、DOM、XMLHttpRequest —— Web APIs

Nodejs 这个 JavaScript Runtime 就可以划分为：

- V8 —— JavaScript 引擎
- fs、http、path —— Node APIs

Bun 这个 JavaScript Runtime 就可以划分为：

- JavaScriptCore —— JavaScript 引擎
- Bun.serve、Bun.build、Bun.file —— Bun APIs

| JavaScript Runtime |                       JavaScript Engine                        |                APIs                 |
| :----------------: | :------------------------------------------------------------: | :---------------------------------: |
|      Browser       | Chrome:V8 <br> Safari:JavaScriptCore <br> Firefox:SpiderMonkey |    Window、DOM、XMLHttpRequest……    |
|       Nodejs       |                               V8                               |          fs、http、path……           |
|        Deno        |                               V8                               |     File System、I/O、Network……     |
|        Bun         |                         JavaScriptCore                         | File I/O、HTTP Server、WebSockets…… |
|        LLRT        |                            QuickJS                             |      path、fetch、net:server……      |

### 使用 JavaScript Runtime

#### 启动交互式解释器 REPL

> Browsers

1. 右键鼠标，进入审查 inspect
2. F12

```javascript
>> console.log("hello world");
undefined
```

> Nodejs

```shell
node
```

```javascript
>> console.log("hello world");
undefined
```

> Deno

```shell
deno
```

```javascript
>> console.log("hello world");
undefined
```

> Bun

需要下载交互式命令解释器

```shell
# install
bun repl

# start up
bun
```

```javascript
>> console.log("hello world");
undefined
```

#### 执行单个 js 代码文件

> Browser

通过 HTML 的一个标签 script 去引入 js 文件

```html
<script src="index.js"></script>
```

> Nodejs

```shell
node index.js
```

> Deno

```shell
deno run index.js
```

> Bun

```shell
bun run index.js
```

### Browsers

浏览器中，最重要的就是浏览器引擎（Browser Engine）或者又被称为 Layout Engine 、Rendering Engine，它是浏览器的核心组件。浏览器引擎的主要工作是将网页上的 HTML 文档和其他资源转换为用户设备上的交互式可视化表示。

#### Browser Engine | Layout Engine | Rendering Engine

https://en.wikipedia.org/wiki/Comparison_of_web_browsers

https://en.wikipedia.org/wiki/Comparison_of_browser_engines

https://en.wikipedia.org/wiki/Browser_engine

|  Browser Engine   |    Web Browser    | Company or Developer |
| :---------------: | :---------------: | :------------------: |
|      WebKit       |      Safari       |        Apple         |
|       Blink       |  Chromium\Chrome  |        Google        |
|       Gecko       |      Firefox      |       Mozilla        |
|      Trident      | Internet Explorer |      Microsoft       |
|     EdgeHTML      |       Edge        |      Microsoft       |
|       KHTML       |     Konqueror     |         KDE          |
|      Presto       |       Opera       |        Opera         |
|       Flow        |       Flow        |        Ekioh         |
|       Servo       |      Firefox      |   Linux Foundation   |
|      Shadow       |                   |      CanadaHonk      |

```mermaid
graph LR
   KHTML --> WebKit --> Blink
```

## 参考文章

- [What is NodeJS? The JavaScript Engine and Runtime Explained for Beginners](https://www.freecodecamp.org/news/what-is-node-js-explained)
- [JavaScript_engine](https://en.wikipedia.org/wiki/JavaScript_engine)
- [List_of_ECMAScript_engines](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines)
- [The Future of JavaScript Runtime: Revolutionizing Serverless with LLRT](https://javascript.plainenglish.io/the-future-of-javascript-runtime-revolutionizing-serverless-with-llrt-30f46e39f037)
- [Browser_engine](https://en.wikipedia.org/wiki/Browser_engine)
- [Comparison_of_web_browsers](https://en.wikipedia.org/wiki/Comparison_of_web_browsers)
- [Comparison_of_browser_engines](https://en.wikipedia.org/wiki/Comparison_of_browser_engines)
