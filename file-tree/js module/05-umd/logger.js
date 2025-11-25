/**
 * 日志模块 - UMD 规范
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
    root.Logger = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
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

  // 检测环境
  const isNode = typeof process !== 'undefined' &&
                 process.versions != null &&
                 process.versions.node != null;

  // 颜色配置（Node.js 使用 ANSI 颜色码，浏览器使用 CSS）
  const colors = isNode ? {
    INFO: '\x1b[34m',  // 蓝色
    WARN: '\x1b[33m',  // 黄色
    ERROR: '\x1b[31m', // 红色
    DEBUG: '\x1b[90m', // 灰色
    RESET: '\x1b[0m'
  } : {
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

  function printLog(level, message) {
    const formatted = addLog(level, message);

    if (isNode) {
      // Node.js 环境使用 ANSI 颜色码
      console.log(colors[level] + formatted + colors.RESET);
    } else {
      // 浏览器环境使用 CSS
      const method = level === 'ERROR' ? 'error' : (level === 'WARN' ? 'warn' : 'log');
      console[method]('%c' + formatted, colors[level]);
    }
  }

  // 公共 API
  const Logger = {
    info: function(message) {
      printLog(LogLevel.INFO, message);
    },

    warn: function(message) {
      printLog(LogLevel.WARN, message);
    },

    error: function(message) {
      printLog(LogLevel.ERROR, message);
    },

    debug: function(message) {
      printLog(LogLevel.DEBUG, message);
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

  // 返回模块
  return Logger;
}));
