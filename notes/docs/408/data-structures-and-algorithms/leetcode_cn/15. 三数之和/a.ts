function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const res: Array<Array<number>> = [];
    for (let i = 0; i < nums.length - 2; i++) { // 要 3 个数，i <= nums.length - 3, i < nums.length - 2
        if (nums[i] > 0) break; // nums[i] ≤ nums[left] ≤ nums[right]，和一定不为 0
        if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复值
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
};


const arr = [2, 1, 3, 7, 6, 9, 30, 10, 20]

console.log(arr.sort())