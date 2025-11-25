/**
 * 计算器模块 - ES Modules 规范
 * 演示命名导出和默认导出
 */

// 私有变量（模块作用域）
const version = '1.0.0';
let history = [];

// 私有方法
function logOperation(operation, result) {
  history.push({
    operation,
    result,
    timestamp: new Date()
  });
}

// 命名导出 - 基础运算函数
export function add(a, b) {
  const result = a + b;
  logOperation(`${a} + ${b}`, result);
  return result;
}

export function subtract(a, b) {
  const result = a - b;
  logOperation(`${a} - ${b}`, result);
  return result;
}

export function multiply(a, b) {
  const result = a * b;
  logOperation(`${a} * ${b}`, result);
  return result;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  const result = a / b;
  logOperation(`${a} / ${b}`, result);
  return result;
}

// 命名导出 - 高级运算函数
export function power(a, b) {
  const result = Math.pow(a, b);
  logOperation(`${a} ^ ${b}`, result);
  return result;
}

export function sqrt(a) {
  if (a < 0) {
    throw new Error('不能对负数开平方');
  }
  const result = Math.sqrt(a);
  logOperation(`√${a}`, result);
  return result;
}

export function mod(a, b) {
  const result = a % b;
  logOperation(`${a} % ${b}`, result);
  return result;
}

// 命名导出 - 工具方法
export function getVersion() {
  return version;
}

export function getHistory() {
  return [...history];
}

export function clearHistory() {
  history = [];
}

// 命名导出 - 常量
export const CALCULATOR_VERSION = version;

// 默认导出 - 导出整个计算器对象
const calculator = {
  add,
  subtract,
  multiply,
  divide,
  power,
  sqrt,
  mod,
  getVersion,
  getHistory,
  clearHistory,
  CALCULATOR_VERSION
};

export default calculator;
