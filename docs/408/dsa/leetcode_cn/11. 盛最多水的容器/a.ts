function maxArea(height: number[]): number {
    let start = 0;
    let end = height.length - 1;
    let maxArea = 0;

    while (start < end) {
        const h = Math.min(height[start], height[end]);
        const area = h * (end - start);
        maxArea = Math.max(area, maxArea);

        if (height[start] < height[end]) {
            start++;
        } else {
            end--
        }
    }
    return maxArea;
};