/**
 * 日志模块 - CMD 规范
 * 演示 CMD 的依赖就近原则
 */
define(function(require, exports, module) {
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

  // 公共方法 - 使用 exports 逐个导出
  exports.info = function(message) {
    const formatted = addLog(LogLevel.INFO, message);
    console.log('%c' + formatted, colorMap.INFO);
  };

  exports.warn = function(message) {
    const formatted = addLog(LogLevel.WARN, message);
    console.warn('%c' + formatted, colorMap.WARN);
  };

  exports.error = function(message) {
    const formatted = addLog(LogLevel.ERROR, message);
    console.error('%c' + formatted, colorMap.ERROR);
  };

  exports.debug = function(message) {
    const formatted = addLog(LogLevel.DEBUG, message);
    console.log('%c' + formatted, colorMap.DEBUG);
  };

  exports.getLogs = function() {
    return logs.slice();
  };

  exports.getLogsByLevel = function(level) {
    return logs.filter(function(log) {
      return log.level === level;
    });
  };

  exports.clearLogs = function() {
    logs = [];
  };

  exports.getLogCount = function() {
    return logs.length;
  };

  // 导出常量
  exports.LogLevel = LogLevel;

  // CMD 特性演示：延迟执行
  // 这段代码只有在模块被 require 时才会执行
  console.log('[Logger Module] CMD 日志模块已加载（延迟执行）');
});
