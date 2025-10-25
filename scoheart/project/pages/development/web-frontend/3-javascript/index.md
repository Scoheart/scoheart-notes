## JavaScript 对象的特征

对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
对象有状态：对象具有状态，同一对象可能处于不同状态之下。
对象具有行为：即对象的状态，可能因为它的行为产生变迁。

## JavaScript 对象的两类属性

- 数据属性
  - value：就是属性的值。
  - writable：决定属性能否被赋值。
  - enumerable：决定 for in 能否枚举该属性。
  - configurable：决定该属性能否被删除或者改变特征值
- 访问器属性
  - getter：函数或 undefined，在取属性值时被调用。
  - setter：函数或 undefined，在设置属性值时被调用。
  - enumerable：决定 for in 能否枚举该属性。
  - configurable：决定该属性能否被删除或者改变特征值。
