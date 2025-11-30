import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {

});


function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const p of prices) {
        if (p < minPrice) {
            minPrice = p;
        } else {
            const profit = p - minPrice;
            maxProfit = Math.max(profit, maxProfit);
        }
    }
    return maxProfit;
};