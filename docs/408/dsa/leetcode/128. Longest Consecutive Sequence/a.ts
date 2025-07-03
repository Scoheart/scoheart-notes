import assert from "assert";
import test from "node:test";

function longestConsecutive(nums: number[]): number {
    const set: Set<number> = new Set(nums)
    let maxLength = 0;
    for (const num of nums) {
        let currentNum = num;
        let maxLength = 0;
        if (set.has(currentNum - 1)) continue;
        while (set.has(currentNum + 1)) {
            currentNum++;
            maxLength++;
        }
    }
    
    return 1;
}

function a(demo: number[]) {
    while(demo.find(a => a)) {
        
    }
}


test("longestConsecutive", () => {
    longestConsecutive([100, 4, 200, 1, 3, 2])
    // assert.equal(longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
});

