# Git

所有的源代码 `MUST` 通过 Git 进行管理，并遵循如下约定：

- 仓库默认分支 `MUST` 为 `main`；如需不同命名，`MUST` 在仓库 `README.md` 中说明理由与迁移策略。
- `main` 与发布分支 `MUST` 启用保护（禁止直接推送、禁止强制推送）；合入 `MUST` 通过受控流程完成。
- 提交历史 `SHOULD` 保持线性；合入策略 `SHOULD` 采用 "Squash" 或 "Rebase + Merge"。
- 提交信息 `SHOULD` 结构化且清晰（建议遵循 Conventional Commits）；至少 `MUST` 说明变更目的与影响范围。
- 大型二进制文件 `MUST` 使用 Git LFS 或制品库管理；源码仓库 `MUST NOT` 存放未经管理的二进制制品。
