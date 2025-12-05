# registry

- 依赖拉取 `MUST` 使用以下对应的内部 registry；`MUST NOT` 擅自切换至公共 registry（除非依赖审计允许并记录）。
- 多项目协作 `SHOULD` 按团队/产品线统一 registry，并在 `.npmrc` 固化，减少环境差异。

| Project                                            | Registry URL                                                    |
| -------------------------------------------------- | --------------------------------------------------------------- |
| 网约车 & 代驾                                      | http://192.168.200.216/nexus/content/groups/npm-group/          |
| 巡改网（出租车）& 趣接单（极速版｜兼职）& 火箭出行 | http://npm-qx.bailongma-inc.com/nexus/content/groups/npm-group/ |
