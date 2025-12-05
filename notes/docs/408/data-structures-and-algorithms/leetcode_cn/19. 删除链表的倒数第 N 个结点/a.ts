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

export { }

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let slow: ListNode | null = dummy;
    let fast: ListNode | null = dummy;

    // 让 fast 先走 n 步
    for (let i = 0; i <= n && fast; i++) {
        fast = fast.next;
    }

    // 同时移动 slow 和 fast，直到 fast 到达末尾
    while (fast) {
        fast = fast.next;
        slow = slow!.next;
    }

    // 删除 slow 的下一个节点
    if (slow && slow.next) {
        slow.next = slow.next.next;
    }

    return dummy.next;
};

// 构造链表 1→2→3→4→5
let head = new ListNode(1,
    new ListNode(2,
        new ListNode(3,
            new ListNode(4,
                new ListNode(5)))));

let newHead = removeNthFromEnd(head, 2);

// 打印新链表: 1 → 2 → 3 → 5
let cur = newHead;
let res: number[] = [];
while (cur) {
    res.push(cur.val);
    cur = cur.next;
}
console.log(res.join(" -> "));  // 1 -> 2 -> 3 -> 5