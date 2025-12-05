function partition(s: string): string[][] {
    const res = [];
    const path = [];
    function isPalindrome(l: number, r: number) {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    }

    function backtrack(start: number) {
        if (start === s.length) {
            res.push([...path]);
            return
        }

        for (let end = start; end < s.length; end++) {
            if (isPalindrome(start, end) === false) continue;
            path.push(s.substring(start, end + 1));
            backtrack(end + 1);
            path.pop()
        }
    }
    backtrack(0);
    return res;
};
