/**
 * Solution 1
 * 通过将字符串排序后作为 key 存储到 map 中，有几个key，就有几大类，然后返回 map 的 values 即可
 */
function groupAnagrams(strs: string[]): string[][] {
    const map = new Map();
    for (const str of strs) {
        let arr = Array.from(str);
        arr.sort();
        let key = arr.toString();
        let list = map.get(key) ? map.get(key) : new Array();
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
}