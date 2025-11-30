class MinHeap {
    constructor() {
        this.heap = []
    }

    insert(value: number) {
        this.heap.push(value)
        this.heapifyUp(this.heap.length - 1)
    }

    extractMin() {
        if (this.heap.length === 0) {
            return null
        }
        if (this.heap.length === 1) {
            return this.heap.pop()
        }
        const min = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown(0)
        return min
    }

    heapifyUp(index: number) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2)
            if (this.heap[index] < this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]]
            }
        }
    }

    heapifyDown(index: number) {
        const leftChildIndex = 2 * index + 1
        const rightChildIndex = 2 * index + 2
        let smallest = index

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex
        }
        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex
        }
        if (smallest !== index) {
            this.swap(index, smallest)
            this.heapifyDown(smallest)
        }
    }

    swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
}

const minHeap = new MinHeap()
minHeap.insert(3)
minHeap.insert(1)
minHeap.insert(2)
console.log(minHeap.extractMin())
console.log(minHeap.extractMin())