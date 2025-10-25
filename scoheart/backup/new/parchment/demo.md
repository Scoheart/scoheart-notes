#

## Demo

```js
import { ScrollBlot, Registry } from 'parchment';
import { BlockBlot, InlineBlot, TextBlot } from 'parchment';

BlockBlot.defaultChild = TextBlot;
const registry = new Registry();
registry.register(BlockBlot, InlineBlot, TextBlot);

const editor = document.querySelector('#app');
const scroll = new ScrollBlot(registry, editor);

const block = scroll.create('block');

scroll.insertBefore(block);
scroll.insertAt(3, 'block', true);
// scroll.insertAt(3, 'World');
```

```mermaid
sequenceDiagram
    participant H5 as H5 App
    participant Hybrid as Hybrid SDK
    participant Window as Window
    participant Native as Native App

    Note over H5,Native: H5 调用 Native

    %% invoke
    H5->>Hybrid: invoke(name, params) —— hybrid调用方法
    activate Hybrid

    %% extendApi
    H5->>Hybrid: extendApi(sub, handleName, params) —— 自定义hybrid
    Hybrid->>Hybrid: invokeSchema(message, responseCallback)
    Hybrid->>Hybrid: 注册 responseCallback
    Hybrid->>Hybrid: 获取 uri
    Hybrid->>Native: iframe 调用 URL Scheme
    deactivate Hybrid

    %% invokeURI
    H5->>Hybrid: invokeURI(uri) —— hybrid协议直接调用
    activate Hybrid
    Hybrid->>Native: iframe 直接调用 URL Scheme
    deactivate Hybrid

    Note over H5,Native: Native 调用 H5

    %% register
    H5->>Hybrid: register(name, responseCallback)
    activate Hybrid
    Hybrid->>Window: registerCallback(name, responseCallback)
    deactivate Hybrid
    activate Window
    Window->>Window: window.responseCallbacks 新增回调
    deactivate Window

    %% _handleMessageFromNative
    Native-->>Window: window.JSBridge._handleMessageFromNative(messageJSON)
    activate Window
    Window->>Window: 解析messageJSON，根据name或者id查询responseCallback
    Window->>H5: 执行注册的 responseCallback
    deactivate Window
```

###

```js
import Hybrid from '@baidu/hybrid';

const button = document.createElement('button');
button.addEventListener('click', () => {
  Hybrid.extendApi('test', 'demo', () => {
    console.log('test');
  });
  console.log(window.responseCallbacks);
});
button.innerHTML = 'extendApi';

const button2 = document.createElement('button');
button2.innerHTML = 'register';
button2.addEventListener('click', () => {
  Hybrid.register('func1', (responseData) => {
    console.log('func1 callback', responseData);
  });
  console.log(window.responseCallbacks);
});

const button3 = document.createElement('button');
button3.innerHTML = 'handleCallback';

const callback = {
  responseName: 'func1',
  responseData: 'demo',
};

const json = JSON.stringify(callback);

button3.addEventListener('click', () => {
  console.log('json', json);
  window.JSBridge._handleMessageFromNative(
    `{"responseName":"${callback.responseName}","responseData":{"code":1,"msg":"","result":{"themeinfo": "1"}}}`
  );
});

document.body.appendChild(button);
document.body.appendChild(button2);
document.body.appendChild(button3);
```
