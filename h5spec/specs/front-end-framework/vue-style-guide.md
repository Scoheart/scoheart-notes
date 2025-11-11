# Vue Style Guide

## `MUST` Use multi-word component names

User component names should always be multi-word, except for root App components. This prevents conflicts with existing and future HTML elements, since all HTML elements are a single word.

Bad Case:

```vue
<!-- in pre-compiled templates -->
<Item />

<!-- in in-DOM templates -->
<item></item>
```

Good Case:

```vue
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

## `MUST` Use detailed prop definitions

(待补充)
