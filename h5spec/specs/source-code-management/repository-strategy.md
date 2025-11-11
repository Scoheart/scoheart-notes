# Repository Strategy

## Polyrepo

Polyrepo 适用于边界清晰、低耦合的应用或库，仓库边界与发布方式 `MUST` 明确：

- 跨仓库依赖 `MUST` 通过包管理器进行版本化发布；直接嵌入子模块或路径依赖 `SHOULD NOT` 作为常态方案。
- 公共库 `MUST` 发布到内部包仓库（如企业 npm Registry）；应用 `MUST NOT` 直接引用未发布的私有源文件。
- 版本发布与变更日志 `MUST` 在各自仓库独立维护，确保可追溯性。

## Monorepo

Monorepo 仓库 `MUST` 使用 pnpm 管理依赖，并 `MUST` 使用 pnpm workspace 管理 packages。

Monorepo 仓库的文件目录结构 `MUST` 遵循如下结构：

```
.
├── apps
├── packages
├── pnpm-workspace.yaml
└── README.md
```

- `apps/` 目录 **MUST** 仅存放应用，每个应用 **MUST** 具有独立的 `package.json`，且 `name` **MUST** 唯一。
- `packages/` 目录 **MUST** 仅存放库，每个库 **MUST** 具有独立的 `package.json`，并 **SHOULD** 通过 `exports`/`types` 明确入口。
- `pnpm-workspace.yaml` **MUST** 定义工作空间范围；`README.md` **MUST** 说明仓库结构、开发/发布流程与约定。
