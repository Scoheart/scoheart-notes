// class LRUCache<K = any, V = any> {
//     private capacity: number;
//     private map = new Map<K, V>();

//     constructor(capacity: number) {
//         if (capacity <= 0) throw new Error("capacity must be > 0");
//         this.capacity = capacity;
//     }

//     get(key: K): V | -1 {
//         if (!this.map.has(key)) return -1;
//         const val = this.map.get(key)!;
//         this.map.delete(key);          // 重新插到尾部 → 最近使用
//         this.map.set(key, val);
//         return val;
//     }

//     put(key: K, val: V): void {
//         if (this.map.has(key)) {
//             this.map.delete(key);        // 移动到尾部
//         } else if (this.map.size >= this.capacity) {
//             const lruKey = this.map.keys().next().value; // 头部=最久未使用
//             this.map.delete(lruKey);
//         }
//         this.map.set(key, val);
//     }
// }