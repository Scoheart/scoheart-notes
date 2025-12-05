import test from 'node:test';
import assert from 'node:assert';


test('testcase', () => {
    // assert.equal(compareVersion("1.0.1", "1.0.0"), 1);
    assert.equal(compareVersion("1.2", "1.10"), );
});

function compareVersion(version1: string, version2: string): number {
    const v1 = version1.split(".");
    const v2 = version2.split(".");

    const len = Math.max(v1.length, v2.length); 
    for (let i = 0; i < len; i++) {
        const v1_i = parseInt(v1[i] || "0");
        const v2_i = parseInt(v2[i] || "0");
        if (v1_i > v2_i) {
            return 1;
        } else if (v1_i < v2_i) {
            return -1;
        }
    }
    return 0;
};
