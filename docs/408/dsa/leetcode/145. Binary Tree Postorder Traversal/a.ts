import test from 'node:test';
import assert from 'node:assert';

function postorderTraversal(root: TreeNode | null): number[] {
    if(!root) return [];
    let result = [];
    const stack = [root];
    while (stack.length) {
        const node = stack.pop();
        result.push(node.val);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return result.reverse();
}

function postorderTraversal2(root: TreeNode | null): number[] {
    
};

test('testcase', () => {

});