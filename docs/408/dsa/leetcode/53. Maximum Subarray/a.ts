import test from "node:test"
import assert from "node:assert"

function maxSubArray(nums: number[]): number {
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    let maxSoFar = dp[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        maxSoFar = Math.max(dp[i], maxSoFar);
    }
    return maxSoFar;
};

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

