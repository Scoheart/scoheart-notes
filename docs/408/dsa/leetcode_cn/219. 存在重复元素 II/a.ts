function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map = new Map();

    for(let i = 0; i < nums.length; i++) {
        const curNum = nums[i];
        if(map.has(curNum) && i - map.get(curNum) <= k) {
            return true;
        }
        map.set(curNum, i);
    }
    return false;
};