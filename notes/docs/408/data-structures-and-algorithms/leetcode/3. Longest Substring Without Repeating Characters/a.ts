function lengthOfLongestSubstring(s: string): number {
    const lastIndex: Record<string, number> = {};
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (char in lastIndex && lastIndex[char] >= left) left = lastIndex[char] + 1;
        lastIndex[char] = right;
        const windowSize = right - left + 1;
        maxLength = Math.max(windowSize, maxLength);
    }
    return maxLength;
};