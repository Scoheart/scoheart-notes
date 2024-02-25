# Node

## Container

- PageNode
- FrameNode
- FrameNode - Autolayout
- GroupNode
- BooleanOptionsNode

## Common

### border

CSS 的 border 包括三大部分

- border-width：映射 strokeWeight
- border-style：映射 dashPattern
- border-color：映射 strokes

相关属性

```ts
interface MinimalStrokesMixin {
  strokes: ReadonlyArray<Paint>; // border-color
  strokeStyleId: string;
  strokeWeight: number | PluginAPI['mixed'];
  strokeJoin: StrokeJoin | PluginAPI['mixed'];
  strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE'; // box-sizing
  dashPattern: ReadonlyArray<number>; // border-style
  readonly strokeGeometry: VectorPaths;
}
interface IndividualStrokesMixin {
  strokeTopWeight: number;
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
}
```

## Frame

### position

相关属性

> type、layoutMode、layoutPositioning

对于每一个 Node 的 position 我们首先需要知道他的 parent Node 是什么类型的 Node。

- PageNode: relative
- GroupNode: absolute
- 如果为 FrameNode，则还需要看其 parent Node 的 layoutMode
  - NONE：absolute
  - 如果为 VERTICAL ｜ HORIZONTAL 这两者，还需要看其自身的 layoutPositioning
    - AUTO：relative
    - ABSOLUTE：absolute
