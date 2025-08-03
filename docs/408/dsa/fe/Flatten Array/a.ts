import assert from "node:assert";
import test from "node:test";

const flatRecursion = (arr: Array<any>): Array<any> => {
    const result: Array<any> = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatRecursion(item));
        } else {
            result.push(item);
        }
    }
    return result;
}

const flatten = <T>(arr: Array<T>): Array<T> => {
    const result: Array<T> = [];
    const stack: Array<T> = [...arr];
    while (stack.length) {
        const data: T | undefined = stack.pop();
        if (!data) {
            continue;
        }
        if (Array.isArray(data)) {
            stack.push(...data);
        } else {
            result.push(data);
        }
    }
    return result.reverse();
}

test('test', () => {
    assert.deepStrictEqual(flatten([1, 2, 3, [4, 5, 6], 7, [8, 9, 10]]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('test2', () => {
    assert.deepStrictEqual(flatten([1, [2, [3, [4, 5, 6], 7], 8, 9, 10]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});


