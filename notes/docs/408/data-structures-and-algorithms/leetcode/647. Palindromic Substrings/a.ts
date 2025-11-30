import test from 'node:test';
import assert from 'node:assert';
test('testcase', () => {
    assert.equal(countSubstrings('abc'), 3);
});

function countSubstrings(s: string): number {
    let count = 0;
    const expand = (left: number, right: number) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    }
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return count;
}