# stroke

|          Figma          |    Type    |          CSS           |
| :---------------------: | :--------: | :--------------------: |
| strokesIncludedInLayout | Autolayout | box-sizing: border-box |

```ts
interface MinimalStrokesMixin {
  strokes: ReadonlyArray<Paint>;
  strokeStyleId: string;
  strokeWeight: number | PluginAPI['mixed'];
  strokeJoin: StrokeJoin | PluginAPI['mixed'];
  strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE';
  dashPattern: ReadonlyArray<number>;
  readonly strokeGeometry: VectorPaths;
}
interface IndividualStrokesMixin {
  strokeTopWeight: number;
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
}
```
