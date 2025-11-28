# config

无论使用何种包管理器，`MUST` 在项目根目录创建 `.npmrc` 并固定 registry：

```ini
registry=<registry-url>
```

## pnpm config

如果使用的是 pnpm，`.npmrc` `MUST` 增加如下配置：

```ini
# Node-Modules Settings [https://pnpm.io/9.x/npmrc?#node-modules-settings]
node-linker=hoisted

# Peer Dependency Settings [https://pnpm.io/9.x/npmrc?#peer-dependency-settings]
auto-install-peers=true
dedupe-peer-dependents=true
strict-peer-dependencies=false
resolve-peers-from-workspace-root=false
```
