# RequireJS `data-main` 实现原理深度解析

> 基于 RequireJS 2.3.6 源码的详细分析

## 目录

1. [概述](#概述)
2. [核心实现流程](#核心实现流程)
3. [源码关键部分详解](#源码关键部分详解)
4. [完整实现机制](#完整实现机制)
5. [手写实现示例](#手写实现示例)
6. [常见问题解答](#常见问题解答)

---

## 概述

### 什么是 data-main？

```html
<script
  src="https://cdn.jsdelivr.net/npm/requirejs@2.3.6/require.js"
  data-main="main"
></script>
```

`data-main` 是 RequireJS 提供的一个特殊属性，用于：
- ✅ 指定应用程序的主入口文件
- ✅ 自动配置模块加载的基础路径（baseUrl）
- ✅ 在 RequireJS 加载完成后自动加载入口模块

---

## 核心实现流程

```
┌─────────────────────────────────────────────────────────────┐
│  第一阶段：RequireJS 自身加载                                │
├─────────────────────────────────────────────────────────────┤
│  1. 浏览器解析 HTML，遇到 <script src="require.js">        │
│  2. 下载 require.js 文件                                     │
│  3. 将 <script> 标签添加到 DOM                               │
│  4. 执行 require.js 代码                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  第二阶段：识别并处理 data-main                              │
├─────────────────────────────────────────────────────────────┤
│  5. require.js 查找自己的 <script> 标签                     │
│     → 使用 document.currentScript (现代浏览器)               │
│     → 或遍历所有 script 标签 (IE 兼容)                       │
│  6. 读取 data-main 属性值                                    │
│  7. 解析路径，提取 baseUrl 和模块名                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  第三阶段：加载主模块                                        │
├─────────────────────────────────────────────────────────────┤
│  8. 配置 RequireJS (设置 baseUrl)                           │
│  9. 创建 <script> 标签加载 main.js                          │
│ 10. 执行 main.js，启动应用                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 源码关键部分详解

### 1. 获取当前执行的 Script 标签

RequireJS 需要找到自己的 `<script>` 标签来读取 `data-main` 属性。

#### 源码实现（简化版）

```javascript
/**
 * 获取当前正在执行的 script 标签
 * RequireJS 内部实现
 */
function getCurrentScript() {
    var scripts, i, script;

    // 方法1: 现代浏览器支持 document.currentScript
    if (document.currentScript) {
        return document.currentScript;
    }

    // 方法2: IE 兼容方案 - 通过 readyState 判断
    scripts = document.getElementsByTagName('script');
    for (i = scripts.length - 1; i >= 0; i--) {
        script = scripts[i];
        // IE 中正在执行的脚本 readyState 为 'interactive'
        if (script.readyState === 'interactive') {
            return script;
        }
    }

    // 方法3: 回退方案 - 返回最后一个 script
    // 通常最后一个就是当前执行的脚本
    return scripts[scripts.length - 1];
}
```

#### 为什么能找到自己？

**关键概念：同步执行**

```javascript
// HTML 解析过程
<script src="require.js" data-main="main">
  ↓
  1. 浏览器创建 <script> DOM 节点
  ↓
  2. 添加到 document 中（此时 DOM 已包含该节点）
  ↓
  3. 开始执行 require.js 的代码
  ↓
  4. 代码中调用 getCurrentScript()
  ↓
  5. 可以查询到自己（因为已在 DOM 中）
```

### 2. 读取和解析 data-main 属性

#### 源码实现

```javascript
/**
 * 处理 data-main 属性
 * 这是 RequireJS 启动时执行的核心逻辑
 */
(function() {
    var cfg = {},
        currentScript = getCurrentScript(),
        dataMain,
        src,
        mainScript;

    // 读取 data-main 属性
    if (currentScript) {
        dataMain = currentScript.getAttribute('data-main');

        if (dataMain) {
            // 移除可能的 .js 后缀
            // 例如: "main.js" → "main"
            mainScript = dataMain.replace(/\.js$/, '');

            // 获取 script 标签的 src 属性
            src = currentScript.getAttribute('src');

            // 如果 data-main 包含路径分隔符，需要处理 baseUrl
            if (mainScript.indexOf('/') !== -1) {
                // 例如: data-main="js/app"
                // 需要提取目录部分作为 baseUrl
                var parts = mainScript.split('/');
                mainScript = parts.pop(); // 取最后一部分作为模块名
                var subPath = parts.length ? parts.join('/') + '/' : '';

                // 设置 baseUrl
                cfg.baseUrl = subPath;
            }

            // 设置 deps，这会导致 RequireJS 自动加载主模块
            cfg.deps = [mainScript];
        }
    }

    // 应用配置并启动 RequireJS
    requirejs.config(cfg);
})();
```

#### 路径解析示例

```javascript
// 示例 1: 简单模块名
// <script src="lib/require.js" data-main="main">
dataMain = "main"
→ baseUrl: "./"
→ 加载: "./main.js"

// 示例 2: 带路径的模块名
// <script src="lib/require.js" data-main="js/app">
dataMain = "js/app"
→ baseUrl: "js/"
→ 加载: "js/app.js"

// 示例 3: 多级路径
// <script src="lib/require.js" data-main="scripts/main/app">
dataMain = "scripts/main/app"
→ baseUrl: "scripts/main/"
→ 加载: "scripts/main/app.js"
```

### 3. 动态加载模块

RequireJS 通过动态创建 `<script>` 标签来加载模块。

#### 源码核心逻辑

```javascript
/**
 * 模块加载器
 * RequireJS 的核心加载函数
 */
function load(moduleName, url) {
    var node = document.createElement('script'),
        config = requirejs.s.contexts._.config;

    // 设置 script 属性
    node.type = config.scriptType || 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;

    // 监听加载完成事件
    node.addEventListener('load', onScriptLoad, false);
    node.addEventListener('error', onScriptError, false);

    // 设置 data-requiremodule 用于调试
    node.setAttribute('data-requiremodule', moduleName);

    // 设置 src，触发加载
    node.src = url;

    // 添加到 DOM，开始下载
    currentlyAddingScript = node;

    if (baseElement) {
        head.insertBefore(node, baseElement);
    } else {
        head.appendChild(node);
    }

    currentlyAddingScript = null;

    return node;
}
```

#### 加载事件处理

```javascript
/**
 * Script 加载完成的回调
 */
function onScriptLoad(evt) {
    var node = evt.currentTarget || evt.srcElement;

    // 移除事件监听器
    node.removeEventListener('load', onScriptLoad, false);
    node.removeEventListener('error', onScriptError, false);

    // 获取模块名
    var moduleName = node.getAttribute('data-requiremodule');

    // 标记模块为已加载
    var context = getContext(contextName);
    context.completeLoad(moduleName);
}

/**
 * Script 加载失败的回调
 */
function onScriptError(evt) {
    var node = evt.currentTarget || evt.srcElement;
    var moduleName = node.getAttribute('data-requiremodule');

    // 抛出错误
    var err = new Error('Script error for: ' + moduleName);
    err.requireType = 'scripterror';
    err.requireModules = [moduleName];

    // 触发错误处理
    onError(err);
}
```

### 4. 依赖管理机制

RequireJS 的依赖管理是其核心功能之一。

#### 模块定义

```javascript
/**
 * define 函数实现
 * 用于定义模块
 */
function define(name, deps, callback) {
    var node, context;

    // 处理参数重载
    // define(callback)
    if (typeof name !== 'string') {
        callback = deps;
        deps = name;
        name = null;
    }

    // define(name, callback)
    if (!isArray(deps)) {
        callback = deps;
        deps = [];
    }

    // 如果没有指定依赖，且 callback 是函数，尝试解析依赖
    if (!deps.length && isFunction(callback)) {
        // 通过正则表达式解析 require() 调用
        // 这是 CommonJS 风格的依赖分析
        if (callback.length) {
            callback
                .toString()
                .replace(commentRegExp, commentReplace)
                .replace(cjsRequireRegExp, function(match, dep) {
                    deps.push(dep);
                });

            // 默认依赖 require, exports, module
            deps = (callback.length === 1 ?
                    ['require'] :
                    ['require', 'exports', 'module']).concat(deps);
        }
    }

    // 获取当前正在处理的 script
    if (useInteractive) {
        node = currentlyAddingScript || getInteractiveScript();
        if (node) {
            if (!name) {
                name = node.getAttribute('data-requiremodule');
            }
            context = contexts[node.getAttribute('data-requirecontext')];
        }
    }

    // 将模块信息加入队列
    if (context) {
        context.defQueue.push([name, deps, callback]);
        context.defQueueMap[name] = true;
    } else {
        globalDefQueue.push([name, deps, callback]);
    }
}
```

#### 依赖解析和加载

```javascript
/**
 * 依赖解析器
 */
function Module(map) {
    this.events = {};
    this.map = map;
    this.depMaps = [];
    this.depCount = 0;
    this.depExports = [];
    this.depMatched = [];
}

Module.prototype = {
    /**
     * 初始化模块，加载依赖
     */
    init: function(depMaps, factory, errback, options) {
        options = options || {};

        // 保存依赖映射
        this.depMaps = depMaps && depMaps.slice(0);
        this.factory = factory;
        this.errback = errback;

        // 如果已启用，开始加载依赖
        if (options.enabled) {
            this.enable();
        }
    },

    /**
     * 启用模块，加载所有依赖
     */
    enable: function() {
        this.enabled = true;
        this.enabling = true;

        // 遍历所有依赖
        each(this.depMaps, bind(this, function(depMap, i) {
            var depModule;

            if (typeof depMap === 'string') {
                // 规范化依赖名称
                depMap = makeModuleMap(depMap, this.map.parentMap);
                this.depMaps[i] = depMap;

                // 检查是否是特殊依赖 (require, exports, module)
                if (depMap.prefix === 'require') {
                    this.depExports[i] = makeRequire(this.map);
                } else if (depMap.prefix === 'exports') {
                    this.depExports[i] = this.exports = {};
                    this.usingExports = true;
                } else if (depMap.prefix === 'module') {
                    this.depExports[i] = this.module = {
                        id: this.map.id,
                        uri: this.map.url,
                        config: function() {
                            return getOwn(config.config, this.map.id) || {};
                        },
                        exports: this.exports || (this.exports = {})
                    };
                } else {
                    // 普通依赖，需要加载
                    depModule = getModule(depMap);
                    depModule.enable();

                    // 监听依赖的定义完成事件
                    depModule.on('defined', bind(this, function(depExports) {
                        this.defineDep(i, depExports);
                        this.check();
                    }));
                }
            }
        }));

        this.enabling = false;
        this.check();
    },

    /**
     * 检查所有依赖是否已加载完成
     */
    check: function() {
        var err, cjsModule, id = this.map.id,
            depExports = this.depExports,
            exports = this.exports,
            factory = this.factory;

        if (!this.inited) {
            return;
        }

        // 检查是否所有依赖都已定义
        if (!this.error) {
            if (this.depCount < 1 && !this.defined) {
                if (isFunction(factory)) {
                    try {
                        // 执行工厂函数，传入依赖
                        exports = context.execCb(id, factory, depExports, exports);

                        // 如果使用了 exports，优先使用 module.exports
                        if (this.usingExports) {
                            if (exports === undefined) {
                                exports = this.exports;
                            }
                        }

                        // 标记为已定义
                        this.exports = exports;
                        this.defined = true;
                    } catch (e) {
                        // 错误处理
                        this.error = e;
                        this.emit('error', this.error);
                    }
                } else {
                    // 非函数工厂，直接使用其值
                    this.exports = factory;
                    this.defined = true;
                }

                // 触发定义完成事件
                this.emit('defined', this.exports);
            }
        } else {
            this.emit('error', this.error);
        }
    }
};
```

### 5. Context（上下文）管理

RequireJS 使用 Context 来管理不同的模块加载环境。

```javascript
/**
 * Context 构造函数
 * 每个上下文维护独立的模块注册表和配置
 */
function newContext(contextName) {
    var context = {
        config: {
            waitSeconds: 7,
            baseUrl: './',
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },

        // 模块注册表
        registry: {},

        // 已定义的模块
        defined: {},

        // 未完成的依赖映射
        urlFetched: {},

        // 定义队列
        defQueue: [],
        defQueueMap: {},

        /**
         * 配置上下文
         */
        configure: function(cfg) {
            // 合并配置
            if (cfg.baseUrl) {
                if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                    cfg.baseUrl += '/';
                }
            }

            // 处理 paths
            var paths = this.config.paths;
            eachProp(cfg.paths, function(value, key) {
                paths[key] = value;
            });

            // 应用配置
            mixin(this.config, cfg, true);

            // 如果有 deps，加载它们
            if (cfg.deps) {
                this.require(cfg.deps, cfg.callback);
            }
        },

        /**
         * require 函数实现
         */
        require: function(deps, callback, errback) {
            var moduleName, moduleMap;

            // 处理单个模块名的情况
            if (typeof deps === 'string') {
                if (isFunction(callback)) {
                    return onError(new Error('Invalid require call'));
                }

                moduleName = deps;
                moduleMap = makeModuleMap(moduleName);

                // 同步返回已定义的模块
                if (!hasProp(this.defined, moduleName)) {
                    throw new Error('Module not loaded: ' + moduleName);
                }
                return this.defined[moduleName];
            }

            // 创建主模块来加载依赖
            context.nextTick(function() {
                var id = '_@r' + (requireCounter += 1);
                var map = makeModuleMap(null, null, {
                    id: id
                });

                var mod = getModule(map);
                mod.init(deps, callback, errback, {
                    enabled: true
                });

                context.enable();
            });

            return context.require;
        },

        /**
         * 完成模块加载
         */
        completeLoad: function(moduleName) {
            var found, args, mod,
                shim = getOwn(this.config.shim, moduleName) || {},
                shExports = shim.exports;

            // 处理定义队列
            while (this.defQueue.length) {
                args = this.defQueue.shift();
                if (args[0] === null) {
                    args[0] = moduleName;
                    if (found) {
                        break;
                    }
                    found = true;
                } else if (args[0] === moduleName) {
                    found = true;
                }

                // 调用 define 处理模块定义
                callGetModule(args);
            }

            // 处理 shim 配置
            mod = getOwn(this.registry, moduleName);
            if (!found && !hasProp(this.defined, moduleName) && mod && !mod.inited) {
                if (shExports) {
                    mod.exports = context.defined[moduleName] = getGlobal(shExports);
                    mod.check();
                } else {
                    return onError(new Error('No define call for ' + moduleName));
                }
            }
        }
    };

    return context;
}
```

---

## 完整实现机制

### 整体架构图

```
RequireJS 架构
├── 初始化层
│   ├── 获取当前 script (getCurrentScript)
│   ├── 读取 data-main 属性
│   └── 解析配置并启动
│
├── 配置层 (Context)
│   ├── baseUrl 配置
│   ├── paths 映射
│   ├── shim 配置
│   └── packages 配置
│
├── 模块管理层
│   ├── 模块注册表 (registry)
│   ├── 已定义模块 (defined)
│   ├── 模块映射 (Module Map)
│   └── 定义队列 (defQueue)
│
├── 依赖解析层
│   ├── 依赖收集
│   ├── 依赖加载
│   ├── 循环依赖检测
│   └── 依赖注入
│
└── 加载执行层
    ├── 动态 script 创建
    ├── 加载状态跟踪
    ├── 错误处理
    └── 模块执行
```

### 完整执行时序图

```
时间轴                           操作
  │
  ├─ t0 ─────────► 浏览器解析 <script src="require.js" data-main="main">
  │                   │
  │                   ├─ 添加 script 到 DOM
  │                   │
  │                   └─ 下载 require.js
  │
  ├─ t1 ─────────► require.js 开始执行
  │                   │
  │                   ├─ 创建全局 requirejs/require/define 函数
  │                   │
  │                   ├─ 创建默认 context
  │                   │
  │                   └─ 执行初始化代码
  │
  ├─ t2 ─────────► 处理 data-main
  │                   │
  │                   ├─ getCurrentScript() → 找到自己的 script
  │                   │
  │                   ├─ getAttribute('data-main') → "main"
  │                   │
  │                   ├─ 解析路径
  │                   │   └─ baseUrl = "./"
  │                   │   └─ mainModule = "main"
  │                   │
  │                   └─ 配置并加载
  │                       └─ requirejs.config({ deps: ["main"] })
  │
  ├─ t3 ─────────► 加载主模块
  │                   │
  │                   ├─ 创建 Module 对象
  │                   │
  │                   ├─ 创建 <script src="main.js">
  │                   │
  │                   └─ appendChild 到 head
  │
  ├─ t4 ─────────► 下载 main.js
  │                   │
  │                   └─ (网络请求)
  │
  ├─ t5 ─────────► main.js 加载完成
  │                   │
  │                   ├─ onload 事件触发
  │                   │
  │                   └─ 执行 main.js 内容
  │
  ├─ t6 ─────────► main.js 定义模块
  │                   │
  │                   └─ define(['dep1', 'dep2'], function(d1, d2) {...})
  │                       │
  │                       ├─ 解析依赖 → ['dep1', 'dep2']
  │                       │
  │                       └─ 加入定义队列
  │
  ├─ t7 ─────────► 加载依赖模块
  │                   │
  │                   ├─ 创建 <script src="dep1.js">
  │                   │
  │                   └─ 创建 <script src="dep2.js">
  │
  ├─ t8 ─────────► 依赖模块加载完成
  │                   │
  │                   └─ 所有依赖都已定义
  │
  ├─ t9 ─────────► 执行工厂函数
  │                   │
  │                   ├─ 注入依赖 → factory(dep1Export, dep2Export)
  │                   │
  │                   ├─ 获取返回值作为模块导出
  │                   │
  │                   └─ 标记模块为已定义
  │
  └─ t10 ────────► 应用启动完成
```

---

## 手写实现示例

基于对 RequireJS 的理解，我们可以实现一个简化版的模块加载器。

### Mini RequireJS 实现

```javascript
/**
 * 简化版 RequireJS 实现
 * 仅实现核心功能：data-main、模块定义、依赖加载
 */
(function(global) {
    'use strict';

    // ========== 工具函数 ==========

    function isFunction(it) {
        return typeof it === 'function';
    }

    function isArray(it) {
        return Object.prototype.toString.call(it) === '[object Array]';
    }

    function each(ary, func) {
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    // ========== 核心变量 ==========

    var config = {
        baseUrl: './',
        paths: {},
        waitSeconds: 7
    };

    // 模块注册表
    var defined = {};      // 已定义的模块
    var waiting = {};      // 等待加载的模块
    var callbacks = {};    // 模块加载完成的回调

    // 脚本加载状态
    var loadedScripts = {};

    // ========== 获取当前脚本 ==========

    function getCurrentScript() {
        // 现代浏览器
        if (document.currentScript) {
            return document.currentScript;
        }

        // IE 兼容
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].readyState === 'interactive') {
                return scripts[i];
            }
        }

        // 回退：返回最后一个
        return scripts[scripts.length - 1];
    }

    // ========== 路径处理 ==========

    function normalize(name, baseUrl) {
        // 移除 .js 后缀
        name = name.replace(/\.js$/, '');

        // 处理相对路径
        if (name.charAt(0) === '.') {
            // 简化处理，实际应该相对于 baseUrl 解析
            name = baseUrl + name;
        }

        // 检查 paths 配置
        if (config.paths[name]) {
            name = config.paths[name];
        }

        return name;
    }

    function toUrl(name) {
        return config.baseUrl + name + '.js';
    }

    // ========== 脚本加载 ==========

    function loadScript(url, moduleName, callback) {
        // 如果已加载，直接回调
        if (loadedScripts[url]) {
            callback && callback();
            return;
        }

        console.log('[Mini-RequireJS] 加载模块:', moduleName, '→', url);

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.setAttribute('data-module', moduleName);

        // 加载完成
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState ||
                this.readyState === 'loaded' ||
                this.readyState === 'complete') {

                script.onload = script.onreadystatechange = null;
                loadedScripts[url] = true;

                console.log('[Mini-RequireJS] 模块加载完成:', moduleName);

                callback && callback();
            }
        };

        // 加载失败
        script.onerror = function() {
            console.error('[Mini-RequireJS] 模块加载失败:', moduleName, url);
            delete loadedScripts[url];
        };

        script.src = url;
        document.head.appendChild(script);
    }

    // ========== 依赖加载 ==========

    function loadDependencies(deps, callback) {
        var loaded = 0;
        var total = deps.length;
        var exports = [];

        if (total === 0) {
            callback([]);
            return;
        }

        function checkComplete() {
            loaded++;
            if (loaded === total) {
                // 收集所有依赖的导出
                each(deps, function(dep, i) {
                    exports[i] = defined[dep];
                });
                callback(exports);
            }
        }

        each(deps, function(dep) {
            // 如果已定义，直接计数
            if (defined[dep]) {
                checkComplete();
            } else {
                // 否则加载模块
                loadModule(dep, checkComplete);
            }
        });
    }

    function loadModule(name, callback) {
        name = normalize(name, config.baseUrl);

        // 如果正在等待，添加回调
        if (waiting[name]) {
            callbacks[name] = callbacks[name] || [];
            callbacks[name].push(callback);
            return;
        }

        // 标记为等待中
        waiting[name] = true;
        callbacks[name] = [callback];

        // 加载脚本
        var url = toUrl(name);
        loadScript(url, name, function() {
            // 脚本加载完成，但模块可能还未定义
            // 定义会在 define() 中完成
        });
    }

    // ========== define 函数 ==========

    function define(name, deps, factory) {
        // 参数重载处理
        if (typeof name !== 'string') {
            factory = deps;
            deps = name;
            name = null;
        }

        if (!isArray(deps)) {
            factory = deps;
            deps = [];
        }

        // 如果没有名称，尝试从当前脚本获取
        if (!name) {
            var scripts = document.getElementsByTagName('script');
            for (var i = scripts.length - 1; i >= 0; i--) {
                var moduleName = scripts[i].getAttribute('data-module');
                if (moduleName) {
                    name = moduleName;
                    break;
                }
            }
        }

        console.log('[Mini-RequireJS] 定义模块:', name, '依赖:', deps);

        // 加载依赖
        loadDependencies(deps, function(depExports) {
            var exports;

            // 执行工厂函数
            if (isFunction(factory)) {
                exports = factory.apply(null, depExports);
            } else {
                exports = factory;
            }

            // 如果没有返回值，使用空对象
            if (exports === undefined) {
                exports = {};
            }

            // 注册模块
            defined[name] = exports;
            delete waiting[name];

            console.log('[Mini-RequireJS] 模块已定义:', name, exports);

            // 触发回调
            if (callbacks[name]) {
                each(callbacks[name], function(cb) {
                    cb(exports);
                });
                delete callbacks[name];
            }
        });
    }

    // ========== require 函数 ==========

    function require(deps, callback) {
        if (typeof deps === 'string') {
            // 同步获取已定义的模块
            deps = normalize(deps, config.baseUrl);
            if (!defined[deps]) {
                throw new Error('Module not loaded: ' + deps);
            }
            return defined[deps];
        }

        // 异步加载依赖
        loadDependencies(deps, function(depExports) {
            if (callback) {
                callback.apply(null, depExports);
            }
        });
    }

    // ========== 配置函数 ==========

    require.config = function(cfg) {
        if (cfg.baseUrl) {
            config.baseUrl = cfg.baseUrl;
            if (config.baseUrl.charAt(config.baseUrl.length - 1) !== '/') {
                config.baseUrl += '/';
            }
        }

        if (cfg.paths) {
            for (var key in cfg.paths) {
                config.paths[key] = cfg.paths[key];
            }
        }

        // 处理 deps (主要用于 data-main)
        if (cfg.deps) {
            require(cfg.deps, cfg.callback);
        }
    };

    // ========== 初始化：处理 data-main ==========

    (function init() {
        var currentScript = getCurrentScript();

        if (currentScript) {
            var dataMain = currentScript.getAttribute('data-main');

            if (dataMain) {
                console.log('[Mini-RequireJS] 检测到 data-main:', dataMain);

                // 解析路径
                var mainScript = dataMain.replace(/\.js$/, '');
                var parts = mainScript.split('/');
                var baseUrl = './';

                // 如果包含路径，提取 baseUrl
                if (parts.length > 1) {
                    var moduleName = parts.pop();
                    baseUrl = parts.join('/') + '/';
                    mainScript = moduleName;
                }

                // 配置并加载主模块
                require.config({
                    baseUrl: baseUrl,
                    deps: [mainScript]
                });
            }
        }
    })();

    // ========== 导出全局变量 ==========

    global.define = define;
    global.require = require;
    global.requirejs = require;

})(window);
```

### 使用示例

#### 1. HTML 入口

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Mini RequireJS Demo</title>
</head>
<body>
    <div id="app"></div>

    <!-- 使用 data-main 指定主模块 -->
    <script src="mini-requirejs.js" data-main="js/main"></script>
</body>
</html>
```

#### 2. 主模块 (js/main.js)

```javascript
// 定义主模块，依赖 utils 和 app
define(['utils', 'app'], function(utils, app) {
    console.log('主模块启动');

    // 使用 utils
    utils.log('应用初始化...');

    // 启动 app
    app.init();

    return {
        version: '1.0.0'
    };
});
```

#### 3. 工具模块 (js/utils.js)

```javascript
// 定义 utils 模块，无依赖
define(function() {
    return {
        log: function(msg) {
            console.log('[Utils]', msg);
        },

        formatDate: function(date) {
            return date.toISOString();
        }
    };
});
```

#### 4. 应用模块 (js/app.js)

```javascript
// 定义 app 模块，依赖 utils
define(['utils'], function(utils) {
    return {
        init: function() {
            utils.log('App 初始化完成');
            document.getElementById('app').innerHTML =
                '<h1>Mini RequireJS 演示</h1>' +
                '<p>当前时间: ' + utils.formatDate(new Date()) + '</p>';
        }
    };
});
```

#### 执行流程

```
1. 浏览器加载 mini-requirejs.js
2. mini-requirejs.js 执行，检测到 data-main="js/main"
3. 解析路径：baseUrl = "js/", mainModule = "main"
4. 加载 js/main.js
5. main.js 定义模块，声明依赖 ['utils', 'app']
6. 并行加载 js/utils.js 和 js/app.js
7. utils.js 无依赖，立即定义完成
8. app.js 依赖 utils，等待 utils 完成后定义
9. 所有依赖就绪，执行 main.js 的工厂函数
10. 应用启动完成
```

---

## 常见问题解答

### Q1: 为什么 RequireJS 能找到自己的 script 标签？

**答：** 关键在于脚本执行的时机：

1. **浏览器解析 HTML 是同步的**
2. 遇到 `<script>` 时，先将标签添加到 DOM
3. 然后立即执行脚本内容
4. 执行时，该 script 标签已经在 DOM 中，可以被查询到

```javascript
// 证明代码
<script>
  console.log('我能找到自己吗？');
  var scripts = document.getElementsByTagName('script');
  console.log('找到了', scripts.length, '个脚本');
  console.log('最后一个就是我:', scripts[scripts.length - 1]);
</script>
```

### Q2: data-main 和直接 require([]) 有什么区别？

**区别对比：**

```html
<!-- 方式 1: 使用 data-main -->
<script src="require.js" data-main="main"></script>
<!--
  优点：简洁，自动配置 baseUrl
  缺点：不够灵活，必须遵循约定
-->

<!-- 方式 2: 手动 require -->
<script src="require.js"></script>
<script>
  requirejs.config({
    baseUrl: './'
  });
  requirejs(['main'], function(main) {
    main.init();
  });
</script>
<!--
  优点：完全控制，可以自定义配置
  缺点：代码量稍多
-->
```

### Q3: 如何调试 RequireJS 的加载过程？

**调试技巧：**

```javascript
// 1. 开启 RequireJS 调试
requirejs.config({
    baseUrl: './',
    // 超时时间设为 0 可以看到更详细的错误
    waitSeconds: 0
});

// 2. 监听错误事件
requirejs.onError = function(err) {
    console.error('RequireJS 错误:', err);
    console.log('错误类型:', err.requireType);
    console.log('相关模块:', err.requireModules);
};

// 3. 查看已加载的模块
console.log('已加载模块:', requirejs.s.contexts._.defined);

// 4. 查看正在等待的模块
console.log('等待加载:', requirejs.s.contexts._.registry);
```

### Q4: data-main 指定的路径规则是什么？

**路径解析规则：**

```javascript
// 规则 1: 相对于 HTML 页面
// HTML 在: /app/index.html
// <script src="lib/require.js" data-main="js/main">
// 结果: 加载 /app/js/main.js

// 规则 2: 相对于 require.js 的位置
// HTML 在: /app/index.html
// require.js 在: /app/lib/require.js
// <script src="lib/require.js" data-main="main">
// 结果: 加载 /app/main.js (相对于 HTML)

// 规则 3: 绝对路径
// <script src="lib/require.js" data-main="/assets/js/main">
// 结果: 加载 /assets/js/main.js

// 规则 4: 带路径的模块名会设置 baseUrl
// <script src="lib/require.js" data-main="scripts/main">
// 结果: baseUrl = "scripts/", 加载 scripts/main.js
//       后续模块也会相对于 scripts/ 加载
```

### Q5: data-main 如何影响后续模块的加载？

**影响机制：**

```javascript
// data-main="js/app"

// RequireJS 内部等价于：
requirejs.config({
    baseUrl: 'js/',  // 从 data-main 提取
    deps: ['app']     // 主模块
});

// 这意味着后续所有模块都相对于 js/ 加载
define(['utils', 'helpers/format'], function(utils, format) {
    // utils → 加载 js/utils.js
    // helpers/format → 加载 js/helpers/format.js
});
```

### Q6: 可以有多个 data-main 吗？

**答：不推荐，但技术上可行**

```html
<!-- 不推荐：多个 RequireJS 实例 -->
<script src="require.js" data-main="app1"></script>
<script src="require.js" data-main="app2"></script>
<!--
  问题：
  1. 第二个 require.js 会覆盖全局的 require/define
  2. 两个应用共享同一个模块注册表
  3. 可能产生冲突和意外行为
-->

<!-- 推荐：单一入口，在主模块中分发 -->
<script src="require.js" data-main="main"></script>
<script>
// main.js
define(['app1', 'app2'], function(app1, app2) {
    app1.init();
    app2.init();
});
</script>
```

### Q7: data-main 加载失败怎么办？

**错误处理：**

```javascript
// 方法 1: 全局错误处理
requirejs.onError = function(err) {
    if (err.requireType === 'timeout') {
        console.error('模块加载超时:', err.requireModules);
    } else if (err.requireType === 'scripterror') {
        console.error('脚本加载错误:', err.requireModules);
        // 可以尝试降级或显示错误页面
    }
};

// 方法 2: 在主模块中处理
define(function(require) {
    try {
        var dep = require('some-module');
    } catch (e) {
        console.error('依赖加载失败:', e);
        // 降级处理
    }
});

// 方法 3: 使用 errback
require(['module'],
    function(module) {
        // 成功
    },
    function(err) {
        // 失败
        console.error('加载失败:', err);
    }
);
```

### Q8: 现代项目还应该使用 RequireJS 吗？

**对比分析：**

| 特性 | RequireJS (AMD) | ES6 Modules | Webpack/Vite |
|------|-----------------|-------------|--------------|
| **浏览器原生支持** | ❌ | ✅ (现代浏览器) | ❌ (需构建) |
| **异步加载** | ✅ | ✅ (动态 import) | ✅ |
| **依赖管理** | ✅ | ✅ | ✅ |
| **打包优化** | ❌ | ❌ | ✅ |
| **开发体验** | ⚠️ 一般 | ✅ 好 | ✅ 优秀 |
| **生态系统** | ⚠️ 老旧 | ✅ 现代 | ✅ 丰富 |

**建议：**

- ✅ **新项目**: 使用 ES6 Modules + Vite/Webpack
- ⚠️ **维护老项目**: 可以继续使用 RequireJS
- 🎓 **学习目的**: RequireJS 是理解模块化的好教材

---

## 总结

### 核心要点

1. **data-main 的本质**
   - 是一个启动约定，简化应用入口配置
   - 通过 HTML 属性传递配置给 JavaScript
   - 自动处理 baseUrl 和主模块加载

2. **实现关键技术**
   - `document.currentScript` - 获取当前脚本
   - `getAttribute('data-main')` - 读取配置
   - 动态创建 `<script>` - 加载模块
   - 事件驱动 - 依赖管理

3. **设计模式**
   - **依赖注入**: 将依赖作为参数传入工厂函数
   - **观察者模式**: 模块加载完成后通知依赖方
   - **工厂模式**: define 的工厂函数创建模块
   - **单例模式**: 每个模块只定义一次

4. **学习价值**
   - 理解模块化的本质
   - 学习依赖管理的实现
   - 掌握异步加载技术
   - 了解 JavaScript 的历史演进

### 参考资源

- [RequireJS 官方文档](https://requirejs.org/)
- [RequireJS GitHub 仓库](https://github.com/requirejs/requirejs)
- [AMD 规范](https://github.com/amdjs/amdjs-api/wiki/AMD)
- [JavaScript 模块化历史](https://github.com/myshov/history-of-javascript/tree/master/4_evolution_of_js_modularity)

---

**文档版本**: 1.0
**最后更新**: 2025-11-25
**作者**: AI Assistant
**基于**: RequireJS 2.3.6 源码分析
