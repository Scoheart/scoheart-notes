import test from "node:test";
import assert from "node:assert";
function lengthOfLongestSubstring(s: string): number {
    let left = 0;
    let maxL = 0;
    const charSet = new Set();
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left += 1;
        }
        charSet.add(s[right]);
        maxL = Math.max(maxL, right - left + 1);
    }
    return maxL;
};

test("lll test", () => {
    assert.equal(lengthOfLongestSubstring("abcabcbb"), 3);
})