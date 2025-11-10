

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

import test from 'node:test';
import assert from 'node:assert';

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

function preorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    console.log(root.val);
    if (root.left) preorderTraversal(root.left);
    if (root.right) preorderTraversal(root.right);
};


function preorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    let result = [];
    let stack = [root];
    while (stack.length) {
        const node = stack.pop();
        result.push(node?.val);
        if (node?.right) stack.push(node.right);
        if (node?.left) stack.push(node.left);
    }
    return result;
}

function preorderIterative(root: TreeNode | null): number[] {
    if (!root) return [];
    const stack: TreeNode[] = [root];
    const res: number[] = [];
    while (stack.length) {
      const node = stack.pop()!;
      res.push(node.val);
      // 先右后左，保证左先出
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
    return res;
  }


test('test', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    // preorderTraversal(root);
    assert.equal(preorderTraversal(root), [1, 2, 4, 5, 3, 6, 7]);
});