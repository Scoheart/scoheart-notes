src/node_main.cc：包含了 main 函数，是整个程序的入口点。
src/node.cc：实现了 Node.js 的核心逻辑，包括初始化和执行 JavaScript 文件。
src/node_options.cc：负责解析命令行参数。
src/env.cc：管理 Node.js 环境的创建和销毁。
src/node_binding.cc：提供了 C++ 到 JavaScript 的绑定机制，允许 JavaScript 访问 C++ 实现的功能。
src/node_contextify.cc：处理上下文相关的操作，如创建和销毁 V8 上下文。
src/node_snapshot.cc：如果使用了快照特性，则此文件负责加载和初始化快照。