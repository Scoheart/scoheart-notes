# 打包工具

## 什么是打包工具

打包工具，顾名思义就是将代码进行打包，将代码进行合并的操作。

打包的对象有哪些？

- 自己编写的 js 模块化代码
- 第三方库的 js 模块化代码
- 图片等静动资源

### rollup

rollup 是一个 ES Module 模块的打包器，可以将 ES Module 打包为 CommonJS 或者 AMD 模块等。

- 默认只能打包 ES Module
- 默认只支持自己编写的 js 模块化代码
- 默认不支持图片等静态资源（不确定）

三种解决方案

- 如果不仅需要打包 ES Module，还需要打包 CommonJS 或者 AMD 模块，可以使用 @rollup/plugin-commonjs
- 如果需要打包第三方库的 js 模块化代码，可以使用 @rollup/plugin-node-resolve
- 图片等静态资源，可以使用 @rollup

### webpack
