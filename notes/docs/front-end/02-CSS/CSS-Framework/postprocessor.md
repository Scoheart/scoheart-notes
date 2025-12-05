# postcss

## 整体架构

代码库中重要的代码文件：

```
|-- lib
   |-- tokenize.js
   |-- parse.js
   |-- parser.js
   |-- processor.js
   |-- stringify.js
   |-- stringifier.js
```

整个运转流程：

- 接收 CSS 输入：PostCSS 首先接收 CSS 输入，这可以是任何有效的 CSS 代码。
- 标记化（Tokenization）：通过 Tokenizer（标记生成器），PostCSS 将 CSS 字符串转换为一系列标记（Tokens）。
- 解析（Parsing）：使用 Parser（解析器），PostCSS 将标记（Tokens）转换为抽象语法树（AST）。
- 插件处理（Processing）：Processor（处理器）初始化插件并对 AST 进行处理，处理器通过遍历 AST 并应用插件来实现这些变换。插件可以执行各种转换和修改，例如自动查找错误或插入供应商前缀。
- 字符串生成（Stringification）：使用 Stringifier（字符串生成器），PostCSS 将修改后的 AST 转换为纯 CSS 字符串。Stringifier 从提供的 Node 开始遍历 AST，并调用相应的方法生成 AST 的原始字符串表示形式。
- 输出 CSS：PostCSS 生成的 CSS 字符串可以被保存到文件中、注入到 HTML 中，或者通过其他方式进行使用。
