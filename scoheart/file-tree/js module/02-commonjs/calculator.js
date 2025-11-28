/**
 * 计算器模块 - CommonJS 规范
 * 演示 module.exports 的使用
 */

// 私有变量（模块作用域）
const version = '1.0.0';
let history = [];

// 私有方法
function logOperation(operation, result) {
  history.push({
    operation,
    result,
    timestamp: new Date()
  });
}

// 导出公共 API
module.exports = {
  // 加法
  add(a, b) {
    const result = a + b;
    logOperation(`${a} + ${b}`, result);
    return result;
  },

  // 减法
  subtract(a, b) {
    const result = a - b;
    logOperation(`${a} - ${b}`, result);
    return result;
  },

  // 乘法
  multiply(a, b) {
    const result = a * b;
    logOperation(`${a} * ${b}`, result);
    return result;
  },

  // 除法
  divide(a, b) {
    if (b === 0) {
      throw new Error('除数不能为零');
    }
    const result = a / b;
    logOperation(`${a} / ${b}`, result);
    return result;
  },

  // 幂运算
  power(a, b) {
    const result = Math.pow(a, b);
    logOperation(`${a} ^ ${b}`, result);
    return result;
  },

  // 获取版本
  getVersion() {
    return version;
  },

  // 获取历史记录
  getHistory() {
    return [...history];
  },

  // 清除历史记录
  clearHistory() {
    history = [];
  }
};

// 模块初始化日志
console.log('[Calculator Module] 计算器模块已加载');
