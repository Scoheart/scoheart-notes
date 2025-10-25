
parchment
- blots
  - shadowblot
  - parentsblot
  - containerblot
  - leafblot
- attributors
- registry

registry
- create

blot
- create  to create domNode
- constructor  to create blot 

Registry
- blot.set(domNode, blot)

registry.create(scroll, 'block')
├─► Registry.query('block') // 获取 BlockBlot 类
├─► BlockBlot.create() 
│   └─► ShadowBlot.create() // 创建 <p> 元素
├─► new BlockBlot(scroll, node)
│   ├─► super(scroll, node) // ParentBlot 构造函数
│   └─► ShadowBlot 构造函数
│       └─► Registry.blots.set(domNode, blot) // 注册映射关系
└─► 返回创建的 blot 实例

Blot 和 DOM 节点的映射关系：
创建映射
DOM 节点通过 create() 方法创建
Blot 实例在构造函数中创建
通过 Registry.blots.set() 建立映射

使用映射
可以通过 Registry.find(node) 找到对应的 Blot
可以通过 blot.domNode 访问对应的 DOM 节点

维护映射
当 Blot 被删除时，通过 detach() 方法移除映射
DOM 变化通过 MutationObserver 监听并同步到 Blot 结构
这种设计确保了 DOM 结构和 Blot 结构的同步，同时提供了高层次的文档操作 API。


ShadowBlot (抽象基类)
├── LeafBlot (叶子节点)
│   ├── TextBlot (文本)
│   └── EmbedBlot (嵌入内容)
└── ParentBlot (可包含子节点)
    ├── BlockBlot (块级元素)
    ├── InlineBlot (行内元素)
    └── ScrollBlot (根节点)