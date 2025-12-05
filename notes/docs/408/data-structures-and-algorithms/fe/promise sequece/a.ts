import test from "node:test";
import assert from "node:assert";

// const mockRequest = (ms: number) =>
//     new Promise((resolve) => setTimeout(() => resolve(ms), ms));

// function runSequence(tasks: (() => Promise<any>)[]) {
//     const res = []
//     tasks.reduce((prev, curr) => {
//         return prev.then((res) => {
//             console.log(curr)
//             return curr().then((res) => {
//                 res.push(res)
//                 return res.slice()
//             })
//         })
//     }, Promise.resolve([]))
//     return res
// }

// // runSequence([
// //     () => mockRequest(1000),
// //     () => mockRequest(2000),
// //     () => mockRequest(1000),
// // ]).then((res) => {
// //     console.log(res);
// // })

// export { }

// declare global {
//     interface PromiseConstructor {
//         sequence<T>(taskFns: Array<() => Promise<T>>): Promise<T[]>;
//     }
// }


// Promise.sequence = function (taskFns) {
//     return taskFns.reduce((prev, task) => {
//         return prev.then(results => {
//             return task().then(val => {
//                 results.push(val);
//                 return results;
//             });
//         });
//     }, Promise.resolve([]));
// };

// Promise.sequence([
//     () => mockRequest(1000),
//     () => mockRequest(2000),
//     () => mockRequest(1000),
// ]).then((res) => {
//     console.log(res);
// })

function runSequence_reduce(tasks: Array<() => Promise<any>>) {
    return tasks.reduce(async (prevPromise: Promise<any[]>, nextTask: () => Promise<any>) => {
        return prevPromise.then(result => {
            return nextTask().then(val => {
                result.push(val);
                return result;
            });
        });
    }, Promise.resolve([]));
}

async function runSequence_forof(tasks: Array<() => Promise<any>>) {
    const res: any[] = [];
    for (const task of tasks) {
        res.push(await task())
    }
    return res
}

function runSequence_recursive(tasks: Array<() => Promise<any>>) {
    const res: any[] = [];
    const helper = (index: number) => {
        if (index === tasks.length) return Promise.resolve(res);
        return tasks[index]().then(val => {
            res.push(val);
            return helper(index + 1);
        });
    };
    return helper(0);
}

const mockRequest = (ms: number) => new Promise(res => res(ms))

test('runSequence_reduce', () => {
    const res = runSequence_reduce([
        () => mockRequest(1000),
        () => mockRequest(2000),
        () => mockRequest(1000),
    ])
    console.log(res)
});

test('runSequence_forof', () => {
    const res = runSequence_forof([
        () => mockRequest(1000),
        () => mockRequest(2000),
        () => mockRequest(1000),
    ])
    console.log(res)
});

test('runSequence_recursive', async () => {
    const res = await runSequence_recursive([
        () => mockRequest(1000),
        () => mockRequest(2000),
        () => mockRequest(1000),
    ])
    console.log(res)
});

