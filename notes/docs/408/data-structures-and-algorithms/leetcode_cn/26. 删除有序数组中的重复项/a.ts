import test from 'node:test';
import assert from 'node:assert';

test('26. 删除有序数组中的重复项', () => {
    assert.equal(removeDuplicates([1, 1, 2]), 2);
    assert.equal(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), 5);
});

function removeDuplicates(nums: number[]): number {
    let slow = 0;
    let fast = 1;
    while (fast < nums.length) {
        if(nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }
    return slow + 1;
};
