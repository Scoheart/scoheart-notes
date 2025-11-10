import assert from "assert";
import test from "node:test";

function longestConsecutive(nums: number[]): number {
    // 使用 Set 去重并提供 O(1) 的查找能力
    const numSet: Set<number> = new Set(nums);
    let maxLength: number = 0;

    for (const num of numSet) {
        // 只有当 num 是某个连续序列的起点时才开始扩展
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // 向后查找连续的数字
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // 更新最大长度
            maxLength = Math.max(maxLength, currentStreak);
        }
    }

    return maxLength;
}

test("longestConsecutive", () => {
    longestConsecutive([100, 4, 200, 1, 3, 2])
    // assert.equal(longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
});

