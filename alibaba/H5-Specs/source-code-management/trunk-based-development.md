# Trunk-Based Development / GitHub Flow

团队 `MAY` 选择 Trunk-Based Development 或 GitHub Flow；无论采用何种流程，变更集成 `MUST` 遵循：

- 变更 `MUST` 在短生命周期功能分支进行；分支命名 `SHOULD` 使用前缀（例如 `feature/*`、`bugfix/*`、`hotfix/*`）。
- 合入 `MUST` 通过 Pull/Merge Request 完成，且至少 1 名 Reviewer `MUST` 审核通过。
- 所有 Request `MUST` 通过 CI；流水线失败的变更 `MUST NOT` 合入主干。
- 直接推送至 `main`/受保护分支 `MUST NOT` 发生；紧急情况 `MAY` 由维护者在受控流程下执行并记录。
- Hotfix 分支 `MUST` 从最新主干或发布分支切出，合入后 `MUST` 回合并（cherry-pick 或同步）到相关分支。

可用的变更通道：GitHub Pull Request / GitLab Merge Request / Google Change Request (AOSP)。
