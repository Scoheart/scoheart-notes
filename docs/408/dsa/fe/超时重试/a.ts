import test from 'node:test';
import assert from 'node:assert';


// test('testcase', async () => {
//     const res = await retry(() => mockRequest(1000), 1000, 3)
//     console.log(res)
// });


const mockRequest = (ms: number) => new Promise((res, rej) => {
    setTimeout(() => {
        if (Math.random() > 0.9) {
            res(ms)
        } else {
            rej(new Error('mock request failed'))
        }
    }, ms)
})

/**
 * 无限重试，直到成功
 */
async function retry_forever<T>(fn: () => Promise<T>): Promise<T> {
    let attempt = 0;
    while (true) {
        try {
            attempt++;
            console.log(`request times ${attempt}`)
            return await fn();
        } catch (err) {
            console.warn(`第 ${attempt} 次执行失败：${err}，继续重试...`);
        }
    }
}

// const res = await retry_forever(() => mockRequest(1000))
// console.log(res)

/**
 * 重试指定次数
 */
async function retry_maxTimes(fn: () => Promise<any>, retryTimes: number) {
    let attempt = 0;
    for (; attempt <= retryTimes; attempt++) {
        try {
            console.log(`request times ${attempt}`)
            return await fn();
        } catch (err) {
            console.warn(`第 ${attempt} 次执行失败：${err}，继续重试...`);
        }
    }
}

// const res = await retry_maxTimes(() => mockRequest(1000), 3)
// console.log(res)

function retry_recursive(fn: () => Promise<any>, timeout: number, retryTimes: number) {
    return new Promise((resolve, reject) => {
        const helper = (times: number) => {
            fn().then(resolve).catch(() => {
                if (times < retryTimes) {
                    console.log(`retry ${times + 1} times`)
                    setTimeout(() => helper(times + 1), timeout);
                } else {
                    reject(new Error('retry failed'));
                }
            });
        };
        helper(0);
    });
}

async function retry_iterative(fn: () => Promise<any>, timeout: number, retryTimes: number) {
    let attempt = 0;
    while (attempt < retryTimes) {
        console.log(`request times ${attempt}`)
        try {
            const res = await fn()
            return res
        } catch (error) {
            console.log('attempt', attempt)
            if (attempt === retryTimes) {
                throw error;             // 最后一次依然失败，抛出错误
            }
            attempt++;
        }
    }
}


// const res = await retry_iterative(() => mockRequest(1000), 1000, 3)
// console.log(res)