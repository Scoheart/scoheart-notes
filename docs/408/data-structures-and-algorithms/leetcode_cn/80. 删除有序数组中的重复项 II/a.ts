import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {
    assert.equal(removeDuplicates([1,1,1,2,2,3]), 5);
    assert.equal(removeDuplicates([0,0,1,1,1,1,2,3,3]), 7);
});

function removeDuplicates(nums: number[]): number {
    let slow = 0;
    let fast = 0;
    while (fast < nums.length) {
        if(slow <= 1 || nums[fast] !== nums[slow - 2]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow
}