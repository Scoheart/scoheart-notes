# monorepo

## 什么是 monorepo

monorepo 就是在单个代码仓库中管理多个项目，或者多个库。

与之相对的概念就是 multi-repo 或 polyrepo，即多个代码仓库管理多个项目。

## 包管理器 Package Manager

Package Manager，现在前端流行使用的有如下这些：

- npm
- yarn（yarn1，yarn>=2 ）
- pnpm
- bun

Package Manager 的作用有如下两点：

- managing workspaces 管理工作空间
- installing packages 下载依赖包

## 工作空间 Workspaces

Workspace 就可以理解为是一个 Application，or Library，or Package，一个 Workspace 就是一个项目，或者说一个库，一个包，一个应用程序。它有自己的 package.json 文件。

### Root Workspace

根工作空间就是我们包含 package.json 文件的最外层目录。

### 声明 Workspaces

上面说到，Workspaces 是通过 Package Manager 来进行管理的，那么我们就得通过声明 Workspaces 在文件系统中的位置，来告诉 Package Manager 有哪些 Workspaces，以及他们分别在哪里。

同时要注意，每一个 Workspace 都需要有自己的 package.json 文件，并且 package.json 文件中的 name 字段必须唯一。因为 Package Manager 下载依赖包的时候，是根据 package.json 中的 name 字段来进行匹配的。而不是根据文件系统中 Workspace 项目的目录文件名。

#### npm 声明 Workspaces

在 root workspace 的 package.json 添加 workspaces 字段来声明所有的 workspaces 的位置

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "workspaces": ["docs", "apps/*", "packages/*"]
}
```

#### yarn 声明 Workspaces

在 root workspace 的 package.json 添加 workspaces 字段来声明所有的 workspaces 的位置

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "workspaces": ["docs", "apps/*", "packages/*"]
}
```

#### pnpm 声明 Workspaces

在 root workspace 添加一个 pnpm-workspace.yaml 文件来声明所有的 workspaces 的位置

```yaml
packages:
  - 'docs'
  - 'apps/*'
  - 'packages/*'
```

## 包下载 Package Installation

Package Installation 是 Package Manager 的另一个作用，它负责下载依赖包。

### 下载依赖包

Package Manager 会根据 package.json 文件中的 dependencies 字段来下载依赖包。

```bash
npm install

yarn install

pnpm install
```

### 在 Workspace 中下载依赖包

```bash
npm install <package> --workspace=<workspace>

yarn workspace <workspace> add <package>

pnpm add <package> --filter <workspace>
```

举例：

```bash
npm install react --workspace=app1

yarn workspace app1 add react

pnpm add react --filter app1
```

## 参考文档

更多关于 Monorepo 的内容，可以参考：

- [Turbo - Monorepo Handbook](https://turbo.build/repo/docs/handbook)
