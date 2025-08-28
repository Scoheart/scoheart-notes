import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {

});


// function lengthOfLongestSubstring(s: string): number {
//     let left = 0;
//     let right = 0;
//     let lastIndex = {};
//     let maxWindowSize = -Infinity;
//     while (right < s.length) {
//         const ch = s[right];
//         if (ch in lastIndex && lastIndex[ch] >= left) {
//             left = lastIndex[ch] + 1;
//         }
//         lastIndex[ch] = right;
//         const windowSize = right - left + 1;
//         maxWindowSize = Math.max(windowSize, maxWindowSize);
//         right++;
//     }
//     return maxWindowSize === -Infinity ? 0 : maxWindowSize;
// }

function lengthOfLongestSubstring(s: string): number {
    let lastIndex = {}
    let left = 0;
    let right = 0;
    let maxLen = 0;
    for (; right < s.length; right++) {
        const ch = s[right];
        if (ch in lastIndex && lastIndex[ch] >= left) {
            left = lastIndex[ch] + 1;
        }
        maxLen = Math.max(maxLen, right - left + 1);
        lastIndex[ch] = right;
    }
    return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb"))

























