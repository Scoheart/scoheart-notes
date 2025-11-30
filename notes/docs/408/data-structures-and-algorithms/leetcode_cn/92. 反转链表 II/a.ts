/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { nextTick } from "process";

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    let dummy = new ListNode();
    dummy.next = head;
    let pre = dummy;

    for (let i = 0; i < left - 1; i++) {
        if (pre.next !== null) pre = pre.next;
    }

    let current = pre.next!;

    // 反转 right - left 次
    for (let j = 0; j < right - left; j++) {
        const nextNode = current.next!; // 保存current的下一个节点

        // 调整指针完成一次局部反转
        current.next = nextNode.next;   // current跳过nextNode
        nextNode.next = pre.next;       // nextNode指向反转部分的当前头部
        pre.next = nextNode;            // pre指向新的反转头部
    }

    return dummy.next;
};

/**
 * 1 2 3 4 5 
 *      current -> 2, 2 -> 4, 3 -> 2, 1 -> 3
 * 1 3 2 4 5 
 * 1 4 3 2 5
 */

// pre cur nextnode
// cur.next = nextnode.next
// pre.next = nextnode