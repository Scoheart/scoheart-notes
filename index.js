import vm from "node:vm";

const context = vm.createContext({ scoheart: "hello", name: "scoheart" });

const code = "const a = globalThis; JSON.stringify(a) + 'a'";

const res = vm.runInContext(code, context);

console.log(res);
