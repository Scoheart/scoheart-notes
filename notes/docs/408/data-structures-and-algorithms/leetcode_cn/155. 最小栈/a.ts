import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {
});

class MinStack {
    stack = []
    minStack = []
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val: number): void {
        this.stack.push(val);

        let minStackLength = this.minStack.length;
        if (minStackLength === 0) {
            this.minStack.push(val);
        } else if (val < this.minStack[minStackLength - 1]) {
            this.minStack.push(val)
        } else {
            this.minStack.push(this.minStack[minStackLength - 1])
        }

    }

    pop(): void {
        if (this.stack.length === 0) {
            return;
        }
        this.stack.pop();
        this.minStack.pop();
    }

    top(): number {
        if (this.stack.length === 0) {
            return 0;
        }
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        if (this.minStack.length === 0) {
            return 0;
        }
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */