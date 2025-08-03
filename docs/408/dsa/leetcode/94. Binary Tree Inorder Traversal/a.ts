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

function inorderTraversal(root: TreeNode | null): number[] {
    let stack = [];
    let current = root;
    let result = [];
    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        const node = stack.pop()!;   // 保证非空
        result.push(node.val);
        current = node.right;
    }
    return result;
};

test('', () => {

});

