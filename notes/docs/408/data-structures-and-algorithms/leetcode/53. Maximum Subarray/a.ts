import test from "node:test"
import assert from "node:assert"

function maxSubArray2(nums: number[]): number {
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    let maxSoFar = dp[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        maxSoFar = Math.max(dp[i], maxSoFar);
    }
    return maxSoFar;
};

function maxSubArray(nums: number[]): number {
    if (nums.length === 0) {
        throw new Error("数组不能为空");
    }

    let current = nums[0];
    let best = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // 以 nums[i] 结尾的最优子数组，要么扩展之前的，要么从自己重新开始
        current = Math.max(nums[i], current + nums[i]);
        best = Math.max(best, current);
    }

    return best;
}

function findAllSubArray(nums: Array<number>) {
    let res: Array<Array<number>> = [];
    console.log(res)
    for (let start = 0; start < nums.length; start++) {
        for (let end = start; end < nums.length; end++) {
            res.push(nums.slice(start, end + 1));
        }
    }
}
test("subarray", () => {
    assert(maxSubArray([1, 4, 5, 8]))
})

