import test from 'node:test';
import assert from 'node:assert';

function isPalindrome(x: number): boolean {
    const s = new String(x);
    let i = 0
    let r = s.length - 1;
    for (; i < s.length / 2; i++) {
        if (s[i] !== s[r]) {
            return false;
        }
        r--;
    }
    return true;
};
test('testcase', () => {
    isPalindrome(231)
});