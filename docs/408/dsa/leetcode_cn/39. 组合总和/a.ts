function combinationSum(candidates: number[], target: number): number[][] {
    const res = [];
    const path = [];
    function backtrack(start: number, remain: number) {
        if (remain === 0) {
            res.push([...path]);
            return
        }
        if (remain < 0) return
        for (let i = start; i < candidates.length; i++) {
            const num = candidates[i];
            path.push(num);
            backtrack(i, remain - num);
            path.pop();
        }
    }
    backtrack(0, target);
    return res;
};