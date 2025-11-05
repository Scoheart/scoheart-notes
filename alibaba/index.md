# H5 Projcet Specification

## Source Code Management

### Git

所有的源代码都 `MUST` 通过 Git 进行管理。

### Gitlab

所有的源代码仓库都 `MUST` 托管在企业私有部署的 Gitlab 上。

网约车 & 代驾 项目 Gitlab 私服地址：`https://gitlab.bailongma-inc.com/`

巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 项目 Gitlab 私服地址：`http://gitlab-qx.bailongma-inc.com/`

### Trunk-Based Development / Github Flow

- MR
- PR
- CR

### Repository Strategy

#### polyrepo

#### Monorepo

## JavaScript Engine & Runtime

### Development Environment 开发环境

本地开发时，项目 `MUST` 通过 `Node.js` 这个 JavaScript Runtime 执行项目的源代码。

且 `Node.js` 的版本 `MUST` 为下面表格中的版本：

| Version | N-API version | npm version | V8 version  |
| ------- | ------------- | ----------- | ----------- |
| 16.20.2 | v93           | v8.19.4     | v9.4.146.26 |

### Test Environment 测试环境

项目在测试环境的构建任务，`MUST` 在下面表格中的环境中执行。

- Host (Linux)

| Operating System             | Kernel                     | Architecture | CPU                                                  |
| ---------------------------- | -------------------------- | ------------ | ---------------------------------------------------- |
| CentOS Linux 7.6.1810 (Core) | 3.10.0-957.27.2.el7.x86_64 | x86_64       | Intel Xeon Platinum 8269CY @ 2.50GHz, 8 vCPU (1×4×2) |

- Node.js

| Version | N-API version | npm version | V8 version  |
| ------- | ------------- | ----------- | ----------- |
| 16.20.2 | v93           | v8.19.4     | v9.4.146.26 |

触发且启动项目在测试环境的构建任务，`MUST` 通过 Bone3 平台的发布任务来触发且启动。

### Production Environment 生产环境

生产环境中的静态资源，`MUST` 被部署在阿里云 OSS 对象存储，用户可以通过任何客户端访问到项目，经阿里云 CDN (Swift/Tengine) 缓存分发，最终到达用户客户端。

- Browserslist

生产环境中，项目 `MUST` 支持符合 Browserslist 中 `[production]` 部分的浏览器版本。

```
# .browserslistrc

[production]
# 同代下限：以 Android 5.0（2014-11）为锚点
# 桌面
chrome >= 38
firefox >= 32
safari >= 8
edge >= 12

# 移动
and_chr >= 38       # Chrome for Android（与 Lollipop 同时代）
ios_saf >= 8
samsung >= 2
opera >= 25
op_mob >= 25

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```

## ECMAScript

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript 2015（ES6）的标准。

## JavaScript Module System

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript Modules (ESM) 系统。

import 语句的使用方法如下所示：

```javascript
// default import
import module from "./module.js";

// named import
import { name } from "./module.js";

// all import
import * as module from "./module.js";

// import as
import { name as alias } from "./module.js";
```

export 语句的使用方法如下所示：

```javascript
// default export
export default function () {
  console.log("Hello, world!");
}

// named export
export function name() {
  console.log("Hello, world!");
}

// all export
export * from "./module.js";

// export as
export { name as alias } from "./module.js";
```

## JavaScript Flavours

### TypeScript

如果项目使用 TypeScript，则项目 root directory 下的 tsconfig.json，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true, // 只做检查，不生成输出
    "strict": true, // 更严格的规则
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "types": [], // 按需添加：项目里常用到的类型声明
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### JSDoc

如果项目没有使用 TypeScript，则需要利用 TypeScript 的 tsc + JSDoc 来实现 JavaScript 代码的类型检查。

- 项目级

项目 root directory 下的 tsconfig.json，`MUST` 遵循如下配置：

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true, // 只做检查，不生成输出
    "strict": true, // 更严格的规则
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "types": [], // 按需添加：项目里常用到的类型声明
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- 文件级

任何 JavaScript 文件或者相关代码，`MUST` 使用 @ts-check 注释，开启文件级类型检查。`MUST NOT` 使用 @ts-nocheck 注释。

## Package Manager

### corepack

包管理器，`MUST` 使用 corepack 来管理。且 corepack 需要使用与 Node.js 版本一致的版本。

### package.json

package.json 文件中，`MUST` 添加 packageManager 字段，且值为选择的包管理器的版本号，格式为：`<package-manager>@<version>+<checksum>`。

```json
// example
{
  "packageManager": "pnpm@9.4.0+sha512.f549b8a52c9d2b8536762f99c0722205efc5af913e77835dbccc3b0b0b2ca9e7dc8022b78062c17291c48e88749c70ce88eb5a74f1fa8c4bf5e18bb46c8bd83a"
}
```

### registry

拉取依赖的 registry，`MUST` 使用如下对应的 registry URL 地址：

| Project                                            | Registry URL                                                    |
| -------------------------------------------------- | --------------------------------------------------------------- |
| 网约车 & 代驾                                      | http://192.168.200.216/nexus/content/groups/npm-group/          |
| 巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 | http://npm-qx.bailongma-inc.com/nexus/content/groups/npm-group/ |

### config

无论使用什么包管理器， `MUST` 在项目 root directory 下创建一个 .npmrc 文件。

且 .npmrc 文件中 `MUST` 配置如下内容：

```ini
registry=<registry-url>
```

#### pnpm config

如果使用的是 pnpm，则 .npmrc 文件中 `MUST` 增加如下配置：

```ini
# Node-Modules Settings [https://pnpm.io/9.x/npmrc?#node-modules-settings]
node-linker=hoisted

# Peer Dependency Settings [https://pnpm.io/9.x/npmrc?#peer-dependency-settings]
auto-install-peers=true
dedupe-peer-dependents=true
strict-peer-dependencies=false
resolve-peers-from-workspace-root=false
```

## Build Toolchains

### Linters

项目代码，`MUST` 利用格式化工具来保证代码的格式化，且格式化工具 `SHOULD` 使用 Prettier。

Prettier 的配置文件，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

项目代码，`MUST` 利用质量检查工具来保证代码的质量，且质量检查工具 `SHOULD` 使用 ESLint。

ESLint 的配置文件，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"]
}
```

### Compiler/Transpiler

项目代码，`MUST` 利用编译/转译工具来保证代码的兼容性，且编译/转译工具 `SHOULD` 使用 Babel 或者 SWC。

Babel 的配置文件，`SHOULD` 遵循如下基本配置，`MAY` 根据项目实际情况进行调整。

```json
{
  "presets": ["@babel/preset-env"]
}
```

### Bundler

## Front-End Framework

### Vue

## Questions

Q1: 需要支持的最低的浏览器版本是多少？

A：暂时不确定，可以通过给 SLS 添加特定的打点，来确定用户的浏览器版本
