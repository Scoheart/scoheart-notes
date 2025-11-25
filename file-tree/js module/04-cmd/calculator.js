/**
 * 计算器模块 - CMD 规范
 * 使用 define 定义模块，接受 require, exports, module 三个参数
 */
define(function(require, exports, module) {
  'use strict';

  // 私有变量（模块作用域）
  const version = '1.0.0';
  let history = [];

  // 私有方法
  function logOperation(operation, result) {
    history.push({
      operation: operation,
      result: result,
      timestamp: new Date()
    });
  }

  // 基础运算
  function add(a, b) {
    const result = a + b;
    logOperation(`${a} + ${b}`, result);
    return result;
  }

  function subtract(a, b) {
    const result = a - b;
    logOperation(`${a} - ${b}`, result);
    return result;
  }

  function multiply(a, b) {
    const result = a * b;
    logOperation(`${a} * ${b}`, result);
    return result;
  }

  function divide(a, b) {
    if (b === 0) {
      throw new Error('除数不能为零');
    }
    const result = a / b;
    logOperation(`${a} / ${b}`, result);
    return result;
  }

  function power(a, b) {
    const result = Math.pow(a, b);
    logOperation(`${a} ^ ${b}`, result);
    return result;
  }

  function sqrt(a) {
    if (a < 0) {
      throw new Error('不能对负数开平方');
    }
    const result = Math.sqrt(a);
    logOperation(`√${a}`, result);
    return result;
  }

  // 工具方法
  function getVersion() {
    return version;
  }

  function getHistory() {
    return history.slice();
  }

  function clearHistory() {
    history = [];
  }

  // CMD 导出方式1: 使用 exports 对象（类似 CommonJS）
  exports.add = add;
  exports.subtract = subtract;
  exports.multiply = multiply;
  exports.divide = divide;
  exports.power = power;
  exports.sqrt = sqrt;
  exports.getVersion = getVersion;
  exports.getHistory = getHistory;
  exports.clearHistory = clearHistory;

  // 也可以使用 module.exports 导出整个对象（类似 CommonJS）
  // module.exports = {
  //   add, subtract, multiply, divide, power, sqrt,
  //   getVersion, getHistory, clearHistory
  // };
});
