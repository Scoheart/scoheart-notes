# Module Resolution

1. Module resolution is host-defined
2. TypeScript imitates the host’s module resolution, but with types

# Module Output

1. the module compiler option
2. potentially the file extension
3. package.json "type" field.

# module

- module format of ouput javascript files
- inform the compiler about how the module kind of each file should be detected
- how different module kinds are allowed to import each other
- and whether features like import.meta and top-level await are available.

- node16 / nodenext ——> module format detection 可以理解为动态的支持 ESM 和 CommonJS
- es2015 / es2020 (import.meta / export \* as ns from 'mode') / es2022 (top level await) / esnext: ES Module 的规范
- commonjs : CommonJS 的规范
- umd
- amd
- system

# ERROR

node:internal/modules/cjs/loader:1272
throw new ERR_REQUIRE_ESM(filename, true);
^

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/scoheart/Development/baidu/netdisk-client-dev-eff/figma-plugin/packages/test/dist/mo.mjs not supported.
Instead change the require of /Users/scoheart/Development/baidu/netdisk-client-dev-eff/figma-plugin/packages/test/dist/mo.mjs to a dynamic import() which is available in all CommonJS modules.
at Object.<anonymous> (/Users/scoheart/Development/baidu/netdisk-client-dev-eff/figma-plugin/packages/test/dist/index.js:6:34) {
code: 'ERR_REQUIRE_ESM'
}

Node.js v22.3.0

# ESM/CJS interoperate in Nodejs

- import ESM/CJS

- require ESM/CJS

# paackge.json - module

https://github.com/sunyongjian/blog/issues/37
