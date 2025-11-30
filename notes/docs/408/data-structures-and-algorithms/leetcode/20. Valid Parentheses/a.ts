import test from 'node:test';
import assert from 'node:assert';

function isValid(s: string): boolean {
    const stack: Array<string> = [];
    const map: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{',
    };
    for (const ch of s) {
        if (ch in map) {
            if (stack.pop() !== map[ch]) return false
        } else {
            stack.push(ch)
        }
    }
    return stack.length === 0;
};

test('testcase', () => {

});