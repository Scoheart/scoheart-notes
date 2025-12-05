#

## 创建节点

Node 类的构造函数的第一个参数是位置参数，表示节点的所有标签。第二个参数是关键字参数，表示节点的所有属性。

```python
from py2neo import Node
label = ["Person", "Student"]

properies = {
    "name": "张三",
    "age": 18,
}

# * 和 ** 是 Python 的语法糖 —— 解包运算符，表示将列表和字典解包
Node(*label, **properies)
```

## 创建关系

```python
from py2neo import Relationship

person1 = Node("Person", name="张三")
person2 = Node("Person", name="李四")

# 创建关系
relation1 = Relationship(person1, "FRIEND", person2, since=2010)
relation2 = Relationship(person1, "COLLEAGUE", person2, since=2015)
```
