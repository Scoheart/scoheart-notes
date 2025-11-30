# corepack

- 包管理器 `MUST` 使用 Corepack 统一管理，并与项目约定的 Node LTS 版本对齐。
- 团队与 CI `MUST` 启用 Corepack 并通过 `package.json#packageManager` 精确钉住包管理器版本，避免版本漂移与锁文件差异。
- 单仓库 `MUST` 仅使用一种包管理器（pnpm 优先）；混用（npm/yarn/pnpm）`MUST NOT`。
- 锁文件（`pnpm-lock.yaml`/`package-lock.json`/`yarn.lock`）`MUST` 提交版本控制，`MUST NOT` 手工编辑。
