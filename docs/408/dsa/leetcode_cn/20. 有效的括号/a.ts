function isValid(s: string): boolean {
    const stack: string[] = [];
    const map = {
        ")": "(",
        "]": "[",
        "}": "{"
    }
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
            stack.push(s[i]);
        } else {
            if (stack.pop() !== map[ch]) {
                return false;
            }
        }
    }
    return stack.length === 0;
};