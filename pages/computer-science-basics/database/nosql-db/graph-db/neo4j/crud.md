#

## create

### label

yuliang:Person:Student

### property

{name: 'yuliang', age: 18}

```cypher
create (yuliang:Person:Student {name: 'yuliang', age: 18})
```

## delete

### delete all

```cypher
match (n)


delete n            // 删除所有结点（不存在关系）
detach delete n     // 删除所有节点（存在关系）
```

## set

```cypher
match (n:Person {name: "shuhao", age: 22})

set n.age = 23

```
