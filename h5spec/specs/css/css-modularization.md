# CSS Modularization

## Vue scoped

- 单文件组件中的 `<style scoped>` `MUST` 用于轻量按组件隔离样式；其生成的选择器属性（例如 data-v-xxxx）`MUST NOT` 作为业务逻辑或测试选择器依赖。
- 同一组件的主要样式隔离策略 `MUST` 二选一：CSS Modules 或 scoped；二者在同一组件中混用 `MUST NOT` 成为常态（仅可用于少量、明确的例外）。
- 父组件需要影响子组件内部结构时 `MUST` 使用 `:deep(...)`；无界限的后代选择（如 `.parent .child .grandchild`）`MUST NOT` 取代 `:deep`。
- 插槽内容样式 `SHOULD` 使用 `:slotted(...)` 进行定向作用；对未命名插槽进行全量覆盖 `SHOULD NOT` 采用宽泛的 `*` 选择器。
- 全局 Reset、主题变量与版式基线 `MUST` 存放于非 scoped 的全局样式或分层样式（如 `@layer base`）；在 scoped 块中实现 Reset `MUST NOT` 期望影响组件外部。
- 需要跨组件共享的动画与关键帧命名 `SHOULD` 统一前缀或置于全局层；在 scoped 中定义的关键帧是否被重写取决于构建配置，名称冲突 `MUST NOT` 发生。
- 深度选择器与全局出口 `MUST` 精确到必要范围；广义的 `:deep(_)` 或 `:global(_)` `MUST NOT` 使用。
- 为了主题与可维护性，颜色与间距 `SHOULD` 使用 CSS 自定义属性；覆盖主题时 `MUST` 通过变量或修饰符类完成，而非在 scoped 中复制粘贴整段规则。

## CSS Modules

(待补充)
