import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {
    assert.equal(isAnagram("anagram", "nagaram"), true);
    assert.equal(isAnagram("a", "abb"), false);
    // assert.equal(isAnagram("rat", "car"), false);
});

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const alphabet = new Array(26).fill(0);
    const baseCode = 'a'.charCodeAt(0);
    for (let i = 0; i < s.length; i++) {
        alphabet[s.charCodeAt(i) - baseCode]++;
        alphabet[t.charCodeAt(i) - baseCode]--;
    }
    return alphabet.every(ch => ch === 0);
};