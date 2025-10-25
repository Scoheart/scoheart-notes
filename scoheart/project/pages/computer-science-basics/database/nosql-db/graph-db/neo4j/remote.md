# 远程连接

## 启动原创访问

neo4j 默认只接受本地连接，如果想让其他主机访问，需要修改配置文件。

```conf
#*****************************************************************
# Network connector configuration
#*****************************************************************

# With default configuration Neo4j only accepts local connections.
# To accept non-local connections, uncomment this line:
server.default_listen_address=0.0.0.0
```

```shell
neo4j stop
neo4j start

neo4j restart
```