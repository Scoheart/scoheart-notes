/**
 * 实现一个并发请求管理器，限制同时进行的异鐧协请求数量，并在所有请求完成后返回结果
 * 
 * 题日要求
 *  实现一个并发请求管理器 RequestQueue，它应该具有以下功能:
 *      接受一个最大并发数 maxConcurrent 作为参数。
 *      提供一个 add 方法，用于添加任务到队列中。
 *      提供一个 run 方法，用于启动任务队列。
 *      任务队列应该能够限制同时进行的并发请求数量，确保不会超过 maxConcurrent。
 */

class RequestQueue {
    taskQueue: Array<any> = [];
    maxConcurrent: number = 0;
    constructor(maxConcurrent: number) {
        this.maxConcurrent = maxConcurrent;
    }

    add(taskList: Array<any>) {
        this.taskQueue.push(...taskList);
    }

    async run() {
        const { taskQueue, maxConcurrent } = this
        const result: Array<any> = [];
        let next = 0;
        async function worker(wid: number) {
            while (true) {
                const i = next;
                if (i >= taskQueue.length) break;
                console.log(`worker${wid} start do task ${i}`)
                next++;
                result[i] = await taskQueue[i]();
            }
        }

        const workerPool = Array.from({ length: maxConcurrent }, (_, k) => worker(k));
        const a = await Promise.all(workerPool)
        return result;
    }
}

const requestQueue = new RequestQueue(3);

requestQueue.add([
    () => new Promise(resolve => setTimeout(() => resolve('A'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('B'), 2000)),
    () => new Promise(resolve => setTimeout(() => resolve('C'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('D'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('E'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('F'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('G'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('H'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('I'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('J'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('K'), 1000)),
]);

const result = await requestQueue.run();
console.log(result);

export { }