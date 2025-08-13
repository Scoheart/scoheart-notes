class ANode {
    prev;
    next;
    constructor(key: number, val: number) {
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    capacity: number = 0;
    map: Map<any, any>;
    head;
    tail;
    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new ANode(0, 0);
        this.tail = new ANode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = node.next = null;
    }

    insertToHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    get(key: number): number {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key)!;
        this.remove(node);
        this.insertToHead(node);
        return node.value;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            const node = this.map.get(key)!;
            node.value = value;
            this.remove(node);
            this.insertToHead(node);
        } else {
            if (this.map.size >= this.capacity) {
                const lru = this.tail.prev!;
                this.remove(lru);
                this.map.delete(lru.key);
            }
            const newNode = new ANode(key, value);
            this.insertToHead(newNode);
            this.map.set(key, newNode);
        }
    }
}