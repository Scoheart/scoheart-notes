##  static link

``` bash
# 直接指定库文件路径
g++ main.cpp /path/to/libadd.a -o myapp

#使用 -L / -l 选项, 其中 -L 指定查找库文件的目录，-ladd 会让编译器去找 libadd.a 或 libadd.so，优先使用 .a
g++ main.cpp -L/path/to -ladd -o myapp
```

## dynamic link

``` bash
# 隐式加载
g++ main.cpp -L/path/to -lsub -o myapp
export LD_LIBRARY_PATH=/path/to:$LD_LIBRARY_PATH
./myapp

g++ main.cpp -L/path/to -lsub -Wl,-rpath,'$ORIGIN' -o myapp

# 显式加载（dlopen / dlsym）
g++ main.cpp -ldl -o myapp
void* handle = dlopen("./libsub.so", RTLD_LAZY);
```