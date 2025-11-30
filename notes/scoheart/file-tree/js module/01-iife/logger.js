/**
 * 日志模块 - 使用 IIFE 模式
 * 演示如何创建一个简单的日志工具
 */
var Logger = (function() {
  // 私有变量
  var logs = [];
  var logLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
  };

  // 私有方法
  function formatMessage(level, message) {
    var timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  function addLog(level, message) {
    var formattedMessage = formatMessage(level, message);
    logs.push({
      level: level,
      message: message,
      formattedMessage: formattedMessage,
      timestamp: new Date()
    });
    return formattedMessage;
  }

  // 公共 API
  return {
    info: function(message) {
      var formatted = addLog(logLevel.INFO, message);
      console.log('%c' + formatted, 'color: blue');
    },

    warn: function(message) {
      var formatted = addLog(logLevel.WARN, message);
      console.warn('%c' + formatted, 'color: orange');
    },

    error: function(message) {
      var formatted = addLog(logLevel.ERROR, message);
      console.error('%c' + formatted, 'color: red');
    },

    getLogs: function() {
      return logs.slice();
    },

    getLogsByLevel: function(level) {
      return logs.filter(function(log) {
        return log.level === level;
      });
    },

    clearLogs: function() {
      logs = [];
    },

    getLogCount: function() {
      return logs.length;
    }
  };
})();
