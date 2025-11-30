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

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let current = head;
    let pre: null | ListNode = null;
    while (current) {
        const next = current.next;
        current.next = pre;
        pre = current;
        current = next;
    }
    return pre
};

// function reverseList(head: ListNode | null): ListNode | null {
//     let current = head;
//     let pre = null;
//     while (current) {
//         const next = current.next;
//         current.next = pre;
//         pre = current;
//         current = next;
//     }
//     return pre;
// };