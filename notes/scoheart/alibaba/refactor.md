## View Template

Below is the base **View Template**.

For any new page, you **MUST** use this as the starting point and **preserve its structure**.

```vue
<!-- View Template Start: follow this structure and naming strictly -->
<template>
  <div class="view-wrapper">
    <template v-if="loading">
      <blm-common-exception type="empty"></blm-common-exception>
    </template>
    <template v-else-if="error">
      <blm-common-exception
        type="abnormal"
        @refresh="run"
      ></blm-common-exception>
    </template>
    <template v-else>
      <!-- Your page content goes here -->
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRequest } from "@/composables/useRequest";

const { data, loading, error, run } = useRequest(() => {}, {
  defaultValue: null,
  immediate: false,
});

onMounted(() => {
  run();
});
</script>

<style scoped lang="less">
.view-wrapper {
  height: 100%;
}
</style>
<!-- View Template End -->
```

## CSS

### Naming Conventions

1. Use `kebab-case` for CSS classes.
2. Use BEM (Block Element Modifier) naming convention.
3. Use `less` for CSS.

### Property Order

use Recess CSS property order(stylelint-config-recess-order)

At a high level, here’s our breakdown:

- position
- display and box model
- font, leading, color, text
- background and border
- CSS3 properties like border-radius and box-shadow
- and a handful of other purely visual properties
