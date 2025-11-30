## group

[official docs - group](https://gn.googlesource.com/gn/+/main/docs/reference.md#func_group)

group 用于将多个目标文件分组，方便管理。

- deps 是当前组依赖的目标文件，这些目标文件会被添加到当前组中。
- public_deps 是当前组依赖的目标文件，这些目标文件会被添加到当前组中，并且会暴露给当前组的外部使用者。
- sources 是当前组包含的源文件，这些源文件会被添加到当前组中。
- data 是当前组包含的数据文件，这些数据文件会被添加到当前组中。
- public 是当前组是否对外暴露，如果为 true，则当前组对外暴露，否则不暴露。
- visibility 是当前组的可见性，如果为空，则当前组对所有模块可见，否则只有指定的模块可见。

```
group(name) {
  deps = [
    "//path/to/target1",
    "//path/to/target2",
  ]
}

group(name) {
  deps = [
    ":target1",
    ":target2",
  ]
}

group(name) {
    public_deps = [
        "//path/to/target1",
        "//path/to/target2",
    ]
}
```
