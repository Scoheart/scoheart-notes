# package.json

- 根 `package.json` `MUST` 添加 `packageManager` 字段，格式为：`<manager>@<version>+<checksum>`；子包 `SHOULD` 省略该字段，继承根设置。
- 应用 `SHOULD` 设置 `private: true` 避免误发布；库 `MAY` 配置 `publishConfig`（如 `access`, `registry`）。
- 运行环境 `SHOULD` 通过 `engines` 限定（Node、pnpm 等），并在 CI 强制：pnpm 使用 `--frozen-lockfile`，npm 使用 `npm ci`，yarn 使用 `--immutable`。

## 示例

```json
{
  "packageManager": "pnpm@9.4.0+sha512.f549b8a52c9d2b8536762f99c0722205efc5af913e77835dbccc3b0b0b2ca9e7dc8022b78062c17291c48e88749c70ce88eb5a74f1fa8c4bf5e18bb46c8bd83a"
}
```
