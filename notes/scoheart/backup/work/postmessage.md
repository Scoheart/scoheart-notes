# postmessage API

## send message

发送消息到其他窗口

``` js
targetWindow.postMessage(message, targetOrigin)
```

## receive message

监听 message 事件, 处理其他窗口发来的消息

``` js
window.addEventListener('message', function(event) {
    console.log(event.data);
});
```

## 标识 iframe

每次创建 iframe 时, 都会生成一个唯一的标识符, 用于标识 iframe 的来源

```  vue
<template>
  <div class="ai-tools-iframe__page">
    <iframe
      :id="iframeId"
      ref="iframeWindowRef"
      class="ai-tools-iframe__page"
      allowFullScreen="true"
      :src="iframeSrc"
      allow="microphone"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const iframeWindowRef = ref<HTMLIFrameElement | null>(null);

const props = defineProps({
  iframeSrc: {
    type: String,
    default: 'https://pan.baidu.com/webfileselector',
  },
});

// 生成唯一标识
const iframeId = `iframe-${new Date().getTime()}`;

const emit = defineEmits<{
  (e: 'iframe-loaded', iframe: HTMLIFrameElement, id: string): void;
}>();

onMounted(() => {
  const iframe = iframeWindowRef.value;
  if (iframe) {
    iframe.onload = () => {
      emit('iframe-loaded', iframe, iframeId); // 将 iframe 和生成的 id 传递给父组件
    };
  }
});
</script>

```

方法 1：通过 URL 参数传递 iframeId，适合简单场景。

方法 2：通过 postMessage 初始化通信，适合需要动态传递数据的场景。

方法 3：通过 window.name 传递 iframeId，适合需要跨页面保持数据的场景。

