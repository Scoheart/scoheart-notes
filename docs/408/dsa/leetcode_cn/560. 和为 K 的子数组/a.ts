function subarraySum(nums: number[], k: number): number {
    const map = new Map();
    map.set(0, 1);
    let sum = 0;
    let ans = 0;

    for (const item of nums) {
        sum += item;
        if (map.has(sum - k)) {
            ans += map.get(sum - k);
        }
        map.set(sum, (map.get(sum) || 0) + 1)
    }
    return ans;
};