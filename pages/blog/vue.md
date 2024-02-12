# Vue3

## createApp

createApp 函数创建并且返回一个应用实例。调用其 mount 方法将实例挂载到 DOM 元素上。

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3.4.18/dist/vue.global.min.js"></script>
<script>
  const { createApp, h } = Vue;
  const app = createApp({
    render() {
      return 'app';
    },
  });
  app.mount('#app');

  const app2 = createApp({
    render() {
      return 'app2';
    },
  });
  app2.mount('#app2');
</script>
```
