/**
 * 主入口文件 - CommonJS 规范
 * 演示如何使用 require 导入模块
 */

console.log('========================================');
console.log('CommonJS 模块化示例');
console.log('========================================\n');

// 方式1: 导入整个模块
const Calculator = require('./calculator');
const Logger = require('./logger');

// 方式2: 导入并解构（也可以这样写）
// const { add, subtract } = require('./calculator');

console.log('📦 模块加载完成\n');

// ==================== 测试日志模块 ====================
console.log('📊 测试日志模块:');
Logger.info('应用启动');
Logger.warn('这是一个警告信息');
Logger.error('这是一个错误信息');
Logger.debug('这是一个调试信息');
console.log(`日志总数: ${Logger.getLogCount()}\n`);

// ==================== 测试计算器模块 ====================
console.log('🧮 测试计算器模块:');
Logger.info('开始计算器测试');

const result1 = Calculator.add(10, 5);
console.log(`10 + 5 = ${result1}`);
Logger.info(`加法运算: 10 + 5 = ${result1}`);

const result2 = Calculator.subtract(20, 8);
console.log(`20 - 8 = ${result2}`);
Logger.info(`减法运算: 20 - 8 = ${result2}`);

const result3 = Calculator.multiply(6, 7);
console.log(`6 * 7 = ${result3}`);
Logger.info(`乘法运算: 6 * 7 = ${result3}`);

const result4 = Calculator.divide(100, 4);
console.log(`100 / 4 = ${result4}`);
Logger.info(`除法运算: 100 / 4 = ${result4}`);

const result5 = Calculator.power(2, 10);
console.log(`2 ^ 10 = ${result5}`);
Logger.info(`幂运算: 2 ^ 10 = ${result5}`);

console.log(`\n📜 计算器版本: ${Calculator.getVersion()}`);
console.log('📜 计算历史:');
console.table(Calculator.getHistory());

// ==================== 测试错误处理 ====================
console.log('\n⚠️ 测试错误处理:');
try {
  Calculator.divide(10, 0);
} catch (e) {
  console.error(`捕获到错误: ${e.message}`);
  Logger.error(`除零错误: ${e.message}`);
}

// ==================== 测试模块缓存 ====================
console.log('\n🔄 测试模块缓存:');
const Calculator2 = require('./calculator');
console.log('Calculator === Calculator2:', Calculator === Calculator2);
Logger.info('模块缓存测试: 多次 require 返回同一个实例');

// ==================== 查看所有日志 ====================
console.log('\n📊 所有日志记录:');
console.table(Logger.getLogs());

console.log('\n📈 日志统计:');
console.log(`  - INFO:  ${Logger.getLogsByLevel(Logger.LogLevel.INFO).length} 条`);
console.log(`  - WARN:  ${Logger.getLogsByLevel(Logger.LogLevel.WARN).length} 条`);
console.log(`  - ERROR: ${Logger.getLogsByLevel(Logger.LogLevel.ERROR).length} 条`);
console.log(`  - DEBUG: ${Logger.getLogsByLevel(Logger.LogLevel.DEBUG).length} 条`);

// ==================== CommonJS 特性演示 ====================
console.log('\n💡 CommonJS 特性:');
console.log('  ✅ 使用 require() 同步加载模块');
console.log('  ✅ 使用 module.exports 或 exports 导出');
console.log('  ✅ 模块会被缓存（第二次 require 直接返回缓存）');
console.log('  ✅ 支持动态加载（条件 require）');
console.log('  ✅ 每个模块都有独立的作用域');

console.log('\n========================================');
console.log('✅ CommonJS 模块化示例完成');
console.log('========================================');
