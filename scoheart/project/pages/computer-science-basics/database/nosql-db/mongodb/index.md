# MongoDB

## 数据库操作

```bash
# 查看
show dbs
show databases
db

# 创建
use db_name

# 删除
db.dropDatabase()
```

## 集合操作

```bash
# 查看
show collections

# 创建
db.createCollection('collection_name')

# 删除
db.collection_name.drop()
```

## 文档操作

```bash
# 插入
db.collection_name.insert({})
db.collection_name.insertMany([{}, {}])

# 查询
db.collection_name.find()

db.demo.insert({
    name: "shuhao",
    age: 18
})
```

## Other

### mongo vs mongosh

都是 mongodb 的客户端，mongodb4.4 之后，默认使用 mongosh，而之前的版本使用 mongo
