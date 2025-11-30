/**
 * 计算器模块 - AMD 规范
 * 使用 define 定义模块，这是一个无依赖的独立模块
 */
define(function() {
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

  // 返回公共 API
  return {
    add: function(a, b) {
      const result = a + b;
      logOperation(`${a} + ${b}`, result);
      return result;
    },

    subtract: function(a, b) {
      const result = a - b;
      logOperation(`${a} - ${b}`, result);
      return result;
    },

    multiply: function(a, b) {
      const result = a * b;
      logOperation(`${a} * ${b}`, result);
      return result;
    },

    divide: function(a, b) {
      if (b === 0) {
        throw new Error('除数不能为零');
      }
      const result = a / b;
      logOperation(`${a} / ${b}`, result);
      return result;
    },

    power: function(a, b) {
      const result = Math.pow(a, b);
      logOperation(`${a} ^ ${b}`, result);
      return result;
    },

    sqrt: function(a) {
      if (a < 0) {
        throw new Error('不能对负数开平方');
      }
      const result = Math.sqrt(a);
      logOperation(`√${a}`, result);
      return result;
    },

    getVersion: function() {
      return version;
    },

    getHistory: function() {
      return history.slice();
    },

    clearHistory: function() {
      history = [];
    }
  };
});
