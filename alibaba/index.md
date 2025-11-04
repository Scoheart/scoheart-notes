# Projcet Achitecture

## Source Code Management

### Git

所有的源代码都通过 Git 进行管理。

### Gitlab

所有的源代码仓库都托管在企业私有部署的 Gitlab 上。

网约车 & 代驾 项目 Gitlab 私服地址：`https://gitlab.bailongma-inc.com/`

巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 项目 Gitlab 私服地址：`http://gitlab-qx.bailongma-inc.com/`

### Trunk-Based Development / Github Flow

- MR
- PR
- CR

### Repository Strategy

#### polyrepo

#### Monorepo

## Environment

### JavaScript Runtime & JavaScript Engine

开发环境，项目通过 Node.js 16.20.2(V8 9.4.146.26-node.26) 这个 JavaScript Runtime 执行 JavaScript 代码。

生产环境，项目被部署在 CDN 中，用户可以通过任何的浏览器访问到项目。

### ECMAScript

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript 2015（ES6）的标准。

## Front-End Framework

### Vue
