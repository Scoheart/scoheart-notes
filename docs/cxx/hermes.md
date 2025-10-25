# Hermes

## checkout source code

git clone https://github.com/facebook/hermes.git

## build

build shared library

```shell
cmake -S <source_dir> -G <generator> -B <build_dir> \
 -DCMAKE_BUILD_TYPE=Release \
 -DHERMES_BUILD_APPLE_FRAMEWORK=OFF \
 -DBUILD_SHARED_LIBS=ON

cd <build_dir> && ninja


export DYLD_LIBRARY_PATH=build/API/hermes:build/jsi

clang++ index.cc \
 -std=c++17 \
 -Ihermes/API/ \
 -Ihermes/API/jsi \
 -Ihermes/public \
 -Lbuild/API/hermes \
 -Lbuild/jsi \
 -lhermes \
 -ljsi \
 -o index && ./index
```

```shell
cmake -S hermes -G Ninja -B build \
 -DCMAKE_BUILD_TYPE=Release \
 -DHERMES_BUILD_APPLE_FRAMEWORK=OFF \
 -DBUILD_SHARED_LIBS=ON

cd build && ninja

cmake -S hermes -G Ninja -B build_static \
 -DCMAKE_BUILD_TYPE=Release \
 -DHERMES_BUILD_APPLE_FRAMEWORK=OFF \
 -DBUILD_SHARED_LIBS=OFF \
 -DHERMES_BUILD_SHARED_JSI=OFF

cd build_static && ninja
```

- `-DHERMES_BUILD_APPLE_FRAMEWORK=OFF` 将 Hermes 打包为 Apple Framework


```bash
cmake -S ../../ -G Ninja -B macos-15 \
 -DCMAKE_BUILD_TYPE=Release \
 -DHERMES_BUILD_APPLE_FRAMEWORK=OFF \
 -DBUILD_SHARED_LIBS=ON \
 -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64" \
 -DCMAKE_OSX_DEPLOYMENT_TARGET=15.0
```


## install

```shell
cmake --build <build_dir> --target install
```

## config

```bash
-DCMAKE_OSX_ARCHITECTURES="arm64;x86_64" 改平台/架构
-DCMAKE_OSX_DEPLOYMENT_TARGET=16.0 最低运行版本

## cursor Tab
-DCMAKE_OSX_SDK=16.0 构建时使用的 macOS SDK 版本
-DCMAKE_OSX_TOOLCHAIN=16.0 构建时使用的 macOS Toolchain 版本
-DCMAKE_OSX_TOOLCHAIN_VERSION=16.0 构建时使用的 macOS Toolchain 版本
```

## inspect

检查编译的 Hermes 的 target、minos、sdk 等

object file tool = otool

version tool = vtool

file

```bash
file -b ./bin/lilin-js-engine
```

```shell
vtool -show-build </path/to/hermes>

# output
Load command 11
      cmd LC_BUILD_VERSION
  cmdsize 32
 platform MACOS # 目标平台
    minos 16.0 # 最低运行版本 = macOS 16
      sdk 26.0 # 构建时使用的 macOS SDK 版本 （供记录，不是下限）
   ntools 1
     tool LD # 使用的链接器
  version 1167.5 # 使用的链接器版本
```
