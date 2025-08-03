function detectCycle(head: ListNode | null): ListNode | null {
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (fast === slow) break;
    }
    if (!fast || !fast.next) return null;

    slow = head;
    while (slow !== fast) {
        slow = slow?.next;
        fast = fast?.next;
    }
    return slow;
};