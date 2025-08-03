import test from "node:test";
import assert from "node:assert";
function reverseString(s: string[]): void {
    for (let i = 0; i < s.length / 2; i++) {
        const tmp = s[i];
        s[i] = s[s.length - i - 1];
        s[s.length - i - 1] = tmp;
    }
};

function reverseStringInPlace(s: string[]): void {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        const tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
        left++;
    }
}

const arr = ["h", "e", "b", "a", "o", 'l'];

test("ssdss", () => {
    reverseString(arr);
    assert.deepEqual(arr, ["l", "o", "a", "b", "e", "h"])
})