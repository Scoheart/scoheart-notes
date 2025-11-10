import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {
    longestConsecutive([1, 3, 4])
});

function longestConsecutive(nums: number[]): number {
    const numSet = new Set<number>(nums);
    let longest = 0;
    for (const x of numSet) {
        if (!numSet.has(x - 1)) {
            let length = 1;
            let curNum = x;
            while (numSet.has(curNum + 1)) {
                length++;
                curNum++;
            }
            longest = Math.max(longest, length);
        }
    }

    return longest;
}

// 示例
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4