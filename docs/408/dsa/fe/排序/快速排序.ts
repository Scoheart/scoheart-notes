import test from "node:test"
import assert from "node:assert"

function quickSort(arr: Array<number>) {
    if (arr.length <= 1) {
        return [...arr];
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivotValue = arr[pivotIndex];

    const greaterThanPivot = [];
    const lessThanPivot = [];
    const equalPivot = [];
    for (const element of arr) {
        if (element > pivotValue) {
            greaterThanPivot.push(element);
        } else if (element < pivotValue) {
            lessThanPivot.push(element);
        } else {
            equalPivot.push(element);
        }
    }
    return [
        ...quickSort(lessThanPivot),
        ...equalPivot,
        ...quickSort(greaterThanPivot)
    ]
}

test("saaa", () => {
    assert.deepEqual(
        quickSort([10, 7, 8, 9, 1, 5]),
        [1, 5, 7, 8, 9, 10]
    )
})
