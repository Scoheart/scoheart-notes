# 算法

## 21 - Easy - Merge Two Sorted Lists. 合并两个有序链表

1. iterative：建立一个虚拟头节点，然后遍历两个链表，将较小的节点插入到虚拟头节点后面，直到一个链表为空，将另一个链表插入到虚拟头节点后面
    - 时间复杂度：O(n)，n 是两个链表的长度之和
    - 空间复杂度：O(1)，只使用了常数个变量

2. recursive：递归地合并两个链表
    - 时间复杂度：O(n)，n 是两个链表的长度之和
    - 空间复杂度：O(n)，递归调用栈的深度为 n

## 206 - Easy - Reverse Linked List. 反转链表

1. iterative 三个指针，pre, cur, next
    - 时间复杂度：O(n)，n 是链表的长度
    - 空间复杂度：O(1)，只使用了常数个变量

2. recursive 
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)

## 234 - Easy - Palindrome Linked List. 回文链表

1. iterative：将链表分为两部分，然后反转后半部分，然后比较两部分是否相等
    - 时间复杂度：O(n)，n 是链表的长度
    - 空间复杂度：O(1)，只使用了常数个变量







