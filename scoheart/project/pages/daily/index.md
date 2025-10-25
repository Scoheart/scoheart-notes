# export as namespace xxx

https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html


1. 模块化
	- esm
	- commonjs
	- umd
2. ts专属的模块化语法
	- commonjs 变种 export = / import = require()
	- type-only
	- import()
	- ambient module


# declaration
- 



# 模块几个点
1. host 谁在消费模块


2. module配置 生产的javascript文件是什么模块的

https://www.typescriptlang.org/docs/handbook/modules/reference.html#module-format-detection

3. 模块解析规则



# modlule output format 
- module config option
- file extenstion
- package.json "type" field.


module resolution：
1. lookup .ts
2. lookup .d.ts



static typing vs. dynamic typing
指代一个变量的类型不可变化













paths
1. 网络导入： https://
2. 别名路径

注意：
1. paths定义的路径在打包后是不会改变的，所以在运行的时候极大可能是会 crash at runtime

2. 不要把 monorepo 的包 和 node_modules的包设置到paths，会出现不可预知的错误

3. baseUrl
4. wildcard 通配符替换
5. fallbacks 多路径查找


367
751
124
671
772











