/**
 * 日志模块 - ES Modules 规范
 * 演示命名导出
 */

// 私有变量
let logs = [];

// 导出日志级别枚举
export const LogLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

// 检测环境
const isNode = typeof process !== 'undefined' &&
               process.versions != null &&
               process.versions.node != null;

// 颜色配置
const colors = isNode ? {
  INFO: '\x1b[34m',
  WARN: '\x1b[33m',
  ERROR: '\x1b[31m',
  DEBUG: '\x1b[90m',
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
    level,
    message,
    formattedMessage,
    timestamp: new Date()
  });
  return formattedMessage;
}

function printLog(level, message) {
  const formatted = addLog(level, message);

  if (isNode) {
    console.log(colors[level] + formatted + colors.RESET);
  } else {
    const method = level === 'ERROR' ? 'error' : (level === 'WARN' ? 'warn' : 'log');
    console[method]('%c' + formatted, colors[level]);
  }
}

// 导出日志方法
export function info(message) {
  printLog(LogLevel.INFO, message);
}

export function warn(message) {
  printLog(LogLevel.WARN, message);
}

export function error(message) {
  printLog(LogLevel.ERROR, message);
}

export function debug(message) {
  printLog(LogLevel.DEBUG, message);
}

export function getLogs() {
  return [...logs];
}

export function getLogsByLevel(level) {
  return logs.filter(log => log.level === level);
}

export function clearLogs() {
  logs = [];
}

export function getLogCount() {
  return logs.length;
}

// 也可以使用默认导出
export default {
  info,
  warn,
  error,
  debug,
  getLogs,
  getLogsByLevel,
  clearLogs,
  getLogCount,
  LogLevel
};
