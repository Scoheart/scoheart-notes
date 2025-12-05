import test from "node:test";
import assert from "node:assert";
const unique = (arr: Array<any>) => {
    const map = new Map<string, any>();
    arr.forEach((item: any) => {
        const key = JSON.stringify(item);
        if (!map.has(key)) map.set(key, item);
    })
    return [...map.values()];
}

test("unique array", () => {
    assert.deepStrictEqual(unique([1, 3, 4, 5, 1, 2]), [1, 3, 4, 5, 2]);
})