let names = ["iPhone 14", "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15", "iPhone 15 Pro", "iPhone 15 Pro Max"]
let colors = ["黑色", "白色", "蓝色", "绿色", "红色", "紫色"]
let storages = ["128G", "256G", "512G"]


function sku(...arr) {
    return arr.reduce((acc, cur) => acc.flatMap(a => cur.map(c => [...a, c])), [[]])
}

console.log(sku(names, colors, storages))