import test from 'node:test';
import assert from 'node:assert';

function isPalindrome(s: string): boolean {
    const str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
};
test('testcase', () => {

});