
# pnpm

## 操作系统存储

### 硬链接
指向同一块辅存的引用

### 软链接
指向一个文件，保存的是文件路径

### 文件拷贝
新的辅村开辟

## 扁平化依赖
会带来幽灵依赖

就是项目可以直接引用没有直接声明的依赖

yarn npm 会拉平所有依赖
如果两个包依赖同一个包，但是不同版本，最后都会是同一版本