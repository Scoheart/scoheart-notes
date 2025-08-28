function singleNonDuplicate(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = left + ((right - left) >> 1);
        if (mid % 2 === 1) mid--;
        if (nums[mid] === nums[mid + 1]) {
            left = mid + 2;
        } else {
            right = mid;
        }
    }
    return nums[left];
};


console.log(singleNonDuplicate([1, 1, 2, 2, 3, 4, 4, 5, 5]))
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11]))