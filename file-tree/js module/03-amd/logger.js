/**
 * 日志模块 - AMD 规范
 * 使用 define 定义模块，这是一个无依赖的独立模块
 */
define(function() {
  'use strict';

  // 私有变量
  let logs = [];

  // 日志级别枚举
  const LogLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
  };

  // 颜色映射
  const colorMap = {
    INFO: 'color: blue; font-weight: bold',
    WARN: 'color: orange; font-weight: bold',
    ERROR: 'color: red; font-weight: bold',
    DEBUG: 'color: gray; font-weight: bold'
  };

  // 私有方法
  function formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  function addLog(level, message) {
    const formattedMessage = formatMessage(level, message);
    logs.push({
      level: level,
      message: message,
      formattedMessage: formattedMessage,
      timestamp: new Date()
    });
    return formattedMessage;
  }

  // 返回公共 API
  return {
    info: function(message) {
      const formatted = addLog(LogLevel.INFO, message);
      console.log('%c' + formatted, colorMap.INFO);
    },

    warn: function(message) {
      const formatted = addLog(LogLevel.WARN, message);
      console.warn('%c' + formatted, colorMap.WARN);
    },

    error: function(message) {
      const formatted = addLog(LogLevel.ERROR, message);
      console.error('%c' + formatted, colorMap.ERROR);
    },

    debug: function(message) {
      const formatted = addLog(LogLevel.DEBUG, message);
      console.log('%c' + formatted, colorMap.DEBUG);
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
    },

    // 导出日志级别常量
    LogLevel: LogLevel
  };
});
