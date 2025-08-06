function containsDuplicate(nums: number[]): boolean {
    const map = new Map();

    for (const element of nums) {
        if (map.has(element)) return true;
        map.set(element, element);
    }

    return false;
};