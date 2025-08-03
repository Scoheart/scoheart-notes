# Hermes

## checkout source code

git clone https://github.com/facebook/hermes.git

## build

build shared library
``` shell
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



``` shell
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


## install

``` shell
cmake --build <build_dir> --target install
```