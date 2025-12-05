function swapPairs(head: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    dummy.next = head;
    let pre = dummy;

    while (pre.next && pre.next.next) {
        const first = pre.next;
        const second = pre.next.next;

        first.next = second.next;
        second.next = first;
        pre.next = second;

        pre = first;
    }
    return dummy.next;
};