function hasCycle(head: ListNode | null): boolean {
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (fast === slow) return true;
    }
    return false;
};













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
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function hasCycle(head: ListNode | null): boolean {
    if (head === null) return false;
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        if (slow === fast) return false
        fast = fast.next.next;
        slow = slow.next;
    }
    return true;
};
