export { }
class Node {
    key
    val
    prev
    next
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    private capacity: number;
    private map: Map<any, any>;
    private head: Node;
    private tail: Node;
    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0)
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _insertHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    get(key: number): number {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            this._remove(node);
            this._insertHead(node);
            return node.val;
        }
        return -1;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val = value;
            this._remove(node)
            this._insertHead(node);
        } else {
            const node = new Node(key, value);
            this.map.set(key, node);
            this._insertHead(node);
            if (this.map.size > this.capacity) {
                const lru = this.tail.prev;
                this._remove(lru);
                this.map.delete(lru.key);
            }
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */