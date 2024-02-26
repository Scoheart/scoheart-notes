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
  strokeWeight: number | PluginAPI['mixed']; // border-weight
  strokeJoin: StrokeJoin | PluginAPI['mixed'];
  strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE'; // box-sizing
  dashPattern: ReadonlyArray<number>; // border-style
  readonly strokeGeometry: VectorPaths;
}

// border-weight
interface IndividualStrokesMixin {
  strokeTopWeight: number;
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
}
```

### box-shadow

CSS 的 box-shadow 包括 5 大部分

- box-shadow-color：映射 color
- box-shadow-offset：映射 offset
- box-shadow-blur：映射 radius
- box-shadow-spread：映射 spread
- box-shadow-position：映射 type

```ts
interface DropShadowEffect {
  readonly type: 'DROP_SHADOW'; // box-shadow-position
  readonly color: RGBA; // box-shadow-color
  readonly offset: Vector; // box-shadow-offset
  readonly radius: number;
  readonly spread?: number;
  readonly visible: boolean;
  readonly blendMode: BlendMode;
  readonly showShadowBehindNode?: boolean;
  readonly boundVariables?: {
    [field in VariableBindableEffectField]?: VariableAlias;
  };
}
interface InnerShadowEffect {
  readonly type: 'INNER_SHADOW';
  readonly color: RGBA;
  readonly offset: Vector;
  readonly radius: number;
  readonly spread?: number;
  readonly visible: boolean;
  readonly blendMode: BlendMode;
  readonly boundVariables?: {
    [field in VariableBindableEffectField]?: VariableAlias;
  };
}
interface BlurEffect {
  readonly type: 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  readonly radius: number;
  readonly visible: boolean;
  readonly boundVariables?: {
    ['radius']?: VariableAlias;
  };
}
declare type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect;
```

### color

```ts
interface SolidPaint {
  readonly type: 'SOLID';
  readonly color: RGB;
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
  readonly boundVariables?: {
    [field in VariableBindablePaintField]?: VariableAlias;
  };
}
interface GradientPaint {
  readonly type:
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND';
  readonly gradientTransform: Transform;
  readonly gradientStops: ReadonlyArray<ColorStop>;
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}
interface ImagePaint {
  readonly type: 'IMAGE';
  readonly scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE';
  readonly imageHash: string | null;
  readonly imageTransform?: Transform;
  readonly scalingFactor?: number;
  readonly rotation?: number;
  readonly filters?: ImageFilters;
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}
interface VideoPaint {
  readonly type: 'VIDEO';
  readonly scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE';
  readonly videoHash: string | null;
  readonly videoTransform?: Transform;
  readonly scalingFactor?: number;
  readonly rotation?: number;
  readonly filters?: ImageFilters;
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly blendMode?: BlendMode;
}
declare type Paint = SolidPaint | GradientPaint | ImagePaint | VideoPaint;
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
