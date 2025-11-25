/**
 * 工具函数模块 - ES Modules 规范
 * 演示多种导出方式
 */

// 方式1: 声明时导出
export const PI = Math.PI;
export const E = Math.E;

export function formatNumber(num, decimals = 2) {
  return num.toFixed(decimals);
}

export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// 方式2: 先声明后导出
const MAX_VALUE = 1000000;
const MIN_VALUE = -1000000;

function clamp(value, min = MIN_VALUE, max = MAX_VALUE) {
  return Math.min(Math.max(value, min), max);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { MAX_VALUE, MIN_VALUE, clamp, randomInt };

// 方式3: 重命名导出
function internalHelper() {
  return 'Internal helper';
}

export { internalHelper as helperFunction };

// 方式4: 聚合导出（假设有其他模块）
// export * from './other-utils.js';
// export { specificFunction } from './other-utils.js';

// 导出一个类
export class MathUtils {
  static sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
  }

  static average(...numbers) {
    return this.sum(...numbers) / numbers.length;
  }

  static max(...numbers) {
    return Math.max(...numbers);
  }

  static min(...numbers) {
    return Math.min(...numbers);
  }
}

// 默认导出
export default {
  PI,
  E,
  MAX_VALUE,
  MIN_VALUE,
  formatNumber,
  formatDate,
  clamp,
  randomInt,
  helperFunction: internalHelper,
  MathUtils
};
