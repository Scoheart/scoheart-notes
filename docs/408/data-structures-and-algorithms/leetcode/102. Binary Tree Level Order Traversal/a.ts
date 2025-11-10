import test from 'node:test';
import assert from 'node:assert';
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function levelOrder2(root: TreeNode | null): number[][] {
    const result = [];
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        result.push(node.val);
        if (node?.left) queue.push(node.left);
        if (node?.right) queue.push(node.right);
    }
    return result;
};

function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length) {
        let size = queue.length;
        let level = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node?.val);
            if (node?.left) queue.push(node.left);
            if (node?.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
};

test('testcase', () => {

});