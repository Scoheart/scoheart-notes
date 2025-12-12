#

## key

我们应该主要关注 Typescript 输出文件。

## module output format

- node16、nodenext：同时支持 ESM 和 CJS，加之互操作性和检测规则
- es2015、es2020、es2022、esnext
- preserve
- commonjs
- umd
- amd
- system

## module resolution

模块解析策略就是 Typescript 如何将 import/export/require 语句中的模块名字符串字面量解析为磁盘上的文件。并且同时还要与 Host 支持的模块解析策略相匹配。

### 通用的文件扩展名替换

- 通用规则
- 解析 relative path
- 解析 extensionless relative path，需要 moduleResolution 设置支持
- Directory modules (index file resolution)
- bare specifiers
  - paths
  - baseUrl
  - node_modules package lookups
  - package.json "exports"
  - package.json "typesVersions"
