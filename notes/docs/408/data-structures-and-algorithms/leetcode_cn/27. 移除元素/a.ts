import test from 'node:test';
import assert from 'node:assert';

test('27. 移除元素', () => {
    assert.equal(removeElement([3,2,2,3], 3), 2);
    assert.equal(removeElement([0,1,2,2,3,0,4,2], 2), 5);
});

function removeElement(nums: number[], val: number): number {
    let slow = 0;
    let fast = 0;
    
    while(fast < nums.length) {
        if(nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
}