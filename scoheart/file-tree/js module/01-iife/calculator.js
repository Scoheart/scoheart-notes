/**
 * 计算器模块 - 使用 IIFE 模式
 * 演示如何通过立即执行函数创建独立的模块作用域
 */
var Calculator = (function() {
  // 私有变量 - 外部无法访问
  var version = '1.0.0';
  var history = [];

  // 私有方法 - 外部无法访问
  function logOperation(operation, result) {
    history.push({
      operation: operation,
      result: result,
      timestamp: new Date()
    });
  }

  // 公共 API - 通过返回对象暴露
  return {
    add: function(a, b) {
      var result = a + b;
      logOperation(`${a} + ${b}`, result);
      return result;
    },

    subtract: function(a, b) {
      var result = a - b;
      logOperation(`${a} - ${b}`, result);
      return result;
    },

    multiply: function(a, b) {
      var result = a * b;
      logOperation(`${a} * ${b}`, result);
      return result;
    },

    divide: function(a, b) {
      if (b === 0) {
        throw new Error('除数不能为零');
      }
      var result = a / b;
      logOperation(`${a} / ${b}`, result);
      return result;
    },

    getVersion: function() {
      return version;
    },

    getHistory: function() {
      // 返回历史记录的副本，防止外部修改
      return history.slice();
    },

    clearHistory: function() {
      history = [];
    }
  };
})();
