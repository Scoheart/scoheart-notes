function deepClone(obj, weakMap = new WeakMap()) {
    // 基本类型 & null
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    // 解决循环引用
    if (weakMap.has(obj)) {
        return weakMap.get(obj);
    }

    let clone;

    // 内置对象
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // 数组 or 普通对象
    clone = Array.isArray(obj) ? [] : {};
    weakMap.set(obj, clone);

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], weakMap);
        }
    }

    return clone;
}