/**
 * 1. DFS
 * - 前序
 * - 后序
 * 
 * 2. BFS
 */

import test from 'node:test';
import assert from 'node:assert';

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const queue = [root];
    let depth = 0;
    while (queue.length) {
        depth++;
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (node?.left) queue.push(node.left);
            if (node?.right) queue.push(node.right);
        }
    }
    return depth;
};

function maxDepthDFS(root: TreeNode | null): number {
    if (!root) return 0;
    let stack = [{ node: root, depth: 1 }];
    let max = 0;
    while (stack.length) {
        const { node, depth } = stack.pop();
        max = Math.max(max, depth);
        if (node.left) stack.push({ node: node.left, depth: depth + 1 })
        if (node.right) stack.push({ node: node.right, depth: depth + 1 })
    }
    return max;
};

test('testcase', () => {

});