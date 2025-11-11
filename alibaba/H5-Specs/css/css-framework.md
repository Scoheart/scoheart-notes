# CSS Framework

## Less

项目中的 CSS 代码，`MUST` 使用 Less 预处理器。

Less 的版本 `MUST` 为下面表格中的版本：

| Version |
| ------- |
| v4.0.0  |

- 设计与主题相关的值 `MUST` 抽象为 Less 变量；变量命名 `SHOULD` 使用 `kebab-case` 与语义化前缀（例如 `@color-brand`、`@space-2`）。
- 「魔法值」`MUST NOT` 直接硬编码；如存在历史遗留，`MUST` 追加注释说明来源与影响面。
- 常用模式（圆角、阴影、断点容器等）`SHOULD` 封装为参数化 mixin；mixin `SHOULD NOT` 形成深层依赖链（> 2 层）。
- 需要运行时切换的主题/品牌色 `SHOULD` 以 CSS 自定义属性（变量）输出，Less 仅负责生成默认值或派生计算。
