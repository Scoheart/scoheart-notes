# CSS Coding Style

## Property Order

- CSS 属性的顺序，`SHOULD` 遵循 **RECESS / Bootstrap** 的属性顺序（以 `stylelint-config-recess-order` 为准）。

1. **Positioning**：`position` / `top|right|bottom|left` / `z-index`
2. **Display & Flow**：`display` / `float` / `clear` / `visibility` / `overflow*`
3. **Flex & Grid**：`flex*` / `grid*` / `place-*` / `justify-*` / `align-*`
4. **Box Model**：`box-sizing` / `width|height|min|max-*` / `margin` / `padding` / `border*` / `border-radius`
5. **Background & Effects**：`background*` / `box-shadow` / `opacity` / `filter`
6. **Typography**：`font*` / `line-height` / `text-*` / `white-space` / `letter-spacing` / `word-*`
7. **Interaction & Motion**：`cursor` / `transition*` / `animation*` / `transform*` / `will-change`
8. **Misc**：`content` / 自定义属性（`--var`）等

**示例（正确排序）**：

```css
.card {
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;

  box-sizing: border-box;
  width: 320px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  font-size: 14px;
  line-height: 1.6;
  color: #111827;

  transition: box-shadow 0.2s ease;
}
```

## Naming Convention

CSS 代码的命名，`MUST` 使用 BEM 规范，语法：`<block>__<element>--<modifier>`。

kebab-case（小写短横线）；允许 a-z、0-9、-；不使用中文、空格与下划线作分隔。

元素（Element）不能脱离其 Block；修饰（Modifier）并列为独立类，不做连缀拼接。

禁止使用 ID 选择器与标签耦合提升特指度（如 button.btn、#app .card）。

HTML 代码示例：

```html
<button class="btn btn--primary">
  <span class="btn__icon" aria-hidden="true"></span>
  <span class="btn__label">Submit</span>
</button>
```

CSS 代码示例（正确命名）：

```css
.btn {
  /* Block */
}
.btn__icon {
  /* Element */
}
.btn__label {
  /* Element */
}
.btn--primary {
  /* Modifier */
}
/* 并列多个修饰符（推荐写法：多个类并列） */
.btn.btn--primary.btn--large {
}
```

CSS 代码示例（非法命名）：

```css
/* 驼峰命名（不允许） */
.productCard__title {
}

/* 元素嵌套元素（避免深层结构） */
.card__header__title {
}

/* 修饰符连缀（不允许） */
.btn--primary--large {
}
```

## Maintainability

- 选择器特指度 `MUST` 保持低；层级 `MUST NOT` 超过 **2**；
- 选择器 `MUST NOT` 与标签或 ID 耦合提升特指度（例如 `ul.menu__item`、`#app .card`）。
- 预处理器嵌套（SCSS/Less） `MUST NOT` 超过 **3** 层；如因第三方覆盖需要超限，`MUST` 在 PR 说明并添加注释。
- `!important` `MUST NOT` 作为常规覆盖手段；若使用，`MUST` 在代码注释或 PR 中说明原因与替代方案不可行性。
- 对会重置子属性的简写（如 `background`、`font`） `SHOULD NOT` 使用；确需使用时 `MUST` 确认无意外覆盖；`margin`/`padding`； `MAY` 使用简写以提升可读性。
