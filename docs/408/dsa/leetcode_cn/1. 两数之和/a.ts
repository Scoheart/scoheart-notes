function twoSum(nums: number[], target: number): number[] {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (map.has(need)) {
            return [map.get(need), i];
        }
        map.set(nums[i], i);
    }
    return []
};