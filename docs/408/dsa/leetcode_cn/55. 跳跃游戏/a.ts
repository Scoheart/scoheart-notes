import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {

});

function canJump(nums: number[]): boolean {
    let farthest = 0;

    for (let i = 0; i < nums.length; i++) {
        if (farthest < i) {
            return false;
        }
        farthest = Math.max(farthest, i + nums[i]);
        // if (farthest >= nums.length - 1) return true;
    }
    return true;
};