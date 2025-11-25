/**
 * 计算器模块 - UMD 规范
 * 支持 AMD、CommonJS 和全局变量三种方式
 */
(function (root, factory) {
  'use strict';

  // UMD 模式判断
  if (typeof define === 'function' && define.amd) {
    // AMD 环境 (RequireJS)
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS 环境 (Node.js)
    module.exports = factory();
  } else {
    // 浏览器全局变量
    root.Calculator = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 私有变量
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

  // 公共 API
  const Calculator = {
    // 加法
    add: function(a, b) {
      const result = a + b;
      logOperation(`${a} + ${b}`, result);
      return result;
    },

    // 减法
    subtract: function(a, b) {
      const result = a - b;
      logOperation(`${a} - ${b}`, result);
      return result;
    },

    // 乘法
    multiply: function(a, b) {
      const result = a * b;
      logOperation(`${a} * ${b}`, result);
      return result;
    },

    // 除法
    divide: function(a, b) {
      if (b === 0) {
        throw new Error('除数不能为零');
      }
      const result = a / b;
      logOperation(`${a} / ${b}`, result);
      return result;
    },

    // 幂运算
    power: function(a, b) {
      const result = Math.pow(a, b);
      logOperation(`${a} ^ ${b}`, result);
      return result;
    },

    // 平方根
    sqrt: function(a) {
      if (a < 0) {
        throw new Error('不能对负数开平方');
      }
      const result = Math.sqrt(a);
      logOperation(`√${a}`, result);
      return result;
    },

    // 取模
    mod: function(a, b) {
      const result = a % b;
      logOperation(`${a} % ${b}`, result);
      return result;
    },

    // 获取版本
    getVersion: function() {
      return version;
    },

    // 获取历史记录
    getHistory: function() {
      return history.slice();
    },

    // 清除历史记录
    clearHistory: function() {
      history = [];
    }
  };

  // 返回模块
  return Calculator;
}));
