/**
 * 日志模块 - CommonJS 规范
 * 演示 exports 的使用（添加属性方式）
 */

// 私有变量
let logs = [];

// 日志级别枚举
const LogLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

// 私有方法
function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
}

function addLog(level, message) {
  const formattedMessage = formatMessage(level, message);
  logs.push({
    level,
    message,
    formattedMessage,
    timestamp: new Date()
  });
  return formattedMessage;
}

// 使用 exports 添加属性方式导出（注意：不能 exports = {}）
exports.info = function(message) {
  const formatted = addLog(LogLevel.INFO, message);
  console.log('\x1b[34m%s\x1b[0m', formatted); // 蓝色
};

exports.warn = function(message) {
  const formatted = addLog(LogLevel.WARN, message);
  console.log('\x1b[33m%s\x1b[0m', formatted); // 黄色
};

exports.error = function(message) {
  const formatted = addLog(LogLevel.ERROR, message);
  console.log('\x1b[31m%s\x1b[0m', formatted); // 红色
};

exports.debug = function(message) {
  const formatted = addLog(LogLevel.DEBUG, message);
  console.log('\x1b[90m%s\x1b[0m', formatted); // 灰色
};

exports.getLogs = function() {
  return [...logs];
};

exports.getLogsByLevel = function(level) {
  return logs.filter(log => log.level === level);
};

exports.clearLogs = function() {
  logs = [];
};

exports.getLogCount = function() {
  return logs.length;
};

// 导出日志级别常量
exports.LogLevel = LogLevel;

// 模块初始化日志
console.log('[Logger Module] 日志模块已加载');
