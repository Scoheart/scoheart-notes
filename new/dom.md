
EventTarget
  |
  +-- Node
        |
        +-- Document
        +-- Element
             |
             +-- HTMLElement
             +-- SVGElement (SVG DOM)
             +-- MathMLElement (MathML DOM)
        +-- DocumentFragment
        +-- CharacterData
             |
             +-- Text
             +-- CDATASection
             +-- Comment
        +-- ProcessingInstruction
        +-- DocumentType
        +-- Attr



ShadowBlot (基础抽象类)
  ↓
ParentBlot (可以有子节点)
  ↓
ContainerBlot (容器)     LeafBlot (叶子节点)
  ↓                        ↓
ScrollBlot              TextBlot
BlockBlot               EmbedBlot
InlineBlot



Editor:
    内容操作的底层实现
    Delta 变更的处理
    文档格式的管理
    直接与 Scroll/Blot 交互

Quill:
    用户 API 的提供
    模块的管理和协调
    事件的分发
    主题和配置的处理
    编辑器状态的维护

这种分工使得：
Editor 专注于内容操作的具体实现
Quill 负责整体协调和对外接口
代码结构清晰，职责分明
便于维护和扩展
使用示例：



``` ts
import { ScrollBlot } from 'parchment';
import { InlineBlot } from 'parchment';
import { BlockBlot, Registry } from 'parchment';

BlockBlot.defaultChild = InlineBlot;
const registry = new Registry();
registry.register(BlockBlot, InlineBlot);
const scroll = new ScrollBlot(registry, document.querySelector('#editor'));
const block1 = scroll.create('block');
const block2 = scroll.create('block');
scroll.appendChild(block1);
scroll.appendChild(block2);
document.querySelector('#editor').appendChild(scroll.domNode);
```

quill.insertText
editor.insertText
scroll.insertAt
scroll.create
blot.insertAt