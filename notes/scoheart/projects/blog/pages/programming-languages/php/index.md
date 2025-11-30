# php

## 编译

``` shell
./configure

make

make install
```

## 问题

1. make: *** [ext/fileinfo/libmagic/apprentice.lo] Error 1解决方法

原因是由于服务器内存不足1G，跑不动。

```shell
./configure --disable-fileinfo
```