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
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function maxDepth_dfs_recursive(root: TreeNode | null): number {
    if (!root) return 0;
    return Math.max(maxDepth_dfs_recursive(root.left), maxDepth_dfs_recursive(root.right)) + 1;
}

function maxDepth_dfs_iterative(root: TreeNode | null): number {
    if (root === null) return 0;
    const stack = [{ node: root, depth: 1 }];
    let max = 0;
    while (stack.length) {
        const { node, depth } = stack.pop()!;
        if (node.left) stack.push({ node: node.left, depth: depth + 1 })
        if (node.right) stack.push({ node: node.right, depth: depth + 1 })
        max = Math.max(max, depth);
    }
    return max;
}