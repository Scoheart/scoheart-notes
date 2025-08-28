function maxSubArray(nums: number[]): number {
    const dp = Array.from<number>({ length: nums.length }).fill(0);
    dp[0] = nums[0];
    let ans = dp[0];

    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        ans = Math.max(dp[i], ans);
    }
    return ans;
};