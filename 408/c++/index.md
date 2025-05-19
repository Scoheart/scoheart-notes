# Ninja

## 编译 v8 速度对比

1. 1th

gn config

```bash
dcheck_always_on = false
target_cpu = "arm64"
use_custom_libcxx = false
is_debug = false                        # 关闭调试，优化体积和速度
v8_monolithic = true                    # 构建单个大静态库
is_component_build = false             # 禁用分模块构建，提升兼容性
v8_use_external_startup_data = false   # 不用 snapshot，简化构建
v8_enable_i18n_support = false         # 去掉 ICU 和 Intl 模块
v8_enable_test_features = false        # 关闭所有测试功能
v8_enable_checking = false             # 关闭内部断言检查
symbol_level = 0                       # 不编译符号信息，减小体积
```

ninja command

```bash
scoheart@Scohearts-MacBook-Pro v8 % time ninja -C out.gn/arm64.release.test2 v8_monolith
ninja: Entering directory `out.gn/arm64.release.test2'
[1774/1774] AR obj/libv8_monolith.a
ninja -C out.gn/arm64.release.test2 v8_monolith  5575.02s user 243.64s system 1318% cpu 7:21.40 total
```

2. 2th

gn config
```bash
is_debug = false                         # 关闭调试符号，减小体积
v8_monolithic = true                     # 编译成单文件静态库
is_component_build = false              # 禁用分模块构建
v8_enable_i18n_support = false          # 禁用 Intl（依赖 ICU）
v8_use_external_startup_data = false    # 禁用 snapshot 外部数据支持
v8_enable_test_features = false         # 禁用测试相关代码
v8_enable_webassembly = false           # 如不需要 WASM 可关闭
v8_enable_gdbjit = false                # 禁用 GDB JIT 接口
symbol_level = 0                        # 不生成调试符号
treat_warnings_as_errors = false        # 忽略一些 Werror 报错（部分平台必需）
```

ninja command

```bash
scoheart@Scohearts-MacBook-Pro v8 % time ninja -C out.gn/arm64.release.test3 -j16  v8_monolith
ninja: Entering directory `out.gn/arm64.release.test3'
[0/1] Regenerating ninja files
[1744/1745] AR obj/libv8_monolith.a
ninja -C out.gn/arm64.release.test3 -j16 v8_monolith  4613.85s user 198.44s system 1309% cpu 6:07.50 total
```

3. 3th

gn config

```bash

```

ninja command

```bash
scoheart@Scohearts-MacBook-Pro v8 % time ninja -C out.gn/arm64.release.test4 -j18 v8_monolith -d stats

ninja: Entering directory `out.gn/arm64.release.test4'
[1744/1744] AR obj/libv8_monolith.a
metric                  count   avg (us)        total (ms)
.ninja parse            1       33260.0         33.3
.ninja_log load         1       10.0            0.0
.ninja_deps load        1       2.0             0.0
node stat               15266   2.9             44.7
depfile load            4       23.5            0.1
ComputeCriticalPath     1       239.0           0.2
StartEdge               1951    1071.6          2090.7
FinishCommand           1744    652.5           1138.0

path->node hash load 0.55 (14114 entries / 25717 buckets)
ninja -C out.gn/arm64.release.test4 -j18 v8_monolith -d stats  4713.74s user 201.29s system 1322% cpu 6:11.78 total
```

