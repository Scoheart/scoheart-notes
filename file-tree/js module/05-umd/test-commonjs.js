/**
 * CommonJS 环境测试 (Node.js)
 * 运行方式: node test-commonjs.js
 */

console.log('========================================');
console.log('UMD 模块化示例 - CommonJS 环境 (Node.js)');
console.log('========================================\n');

// 使用 require 导入模块
const Calculator = require('./calculator');
const Logger = require('./logger');

console.log('📦 模块加载完成 (CommonJS 方式)\n');

// ==================== 测试日志模块 ====================
console.log('📊 测试日志模块:');
Logger.info('应用启动 (Node.js 环境)');
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

const result6 = Calculator.sqrt(16);
console.log(`√16 = ${result6}`);
Logger.info(`平方根: √16 = ${result6}`);

const result7 = Calculator.mod(17, 5);
console.log(`17 % 5 = ${result7}`);
Logger.info(`取模运算: 17 % 5 = ${result7}`);

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

try {
  Calculator.sqrt(-1);
} catch (e) {
  console.error(`捕获到错误: ${e.message}`);
  Logger.error(`负数开方错误: ${e.message}`);
}

// ==================== 查看所有日志 ====================
console.log('\n📊 所有日志记录:');
console.table(Logger.getLogs());

console.log('\n📈 日志统计:');
console.log(`  - INFO:  ${Logger.getLogsByLevel(Logger.LogLevel.INFO).length} 条`);
console.log(`  - WARN:  ${Logger.getLogsByLevel(Logger.LogLevel.WARN).length} 条`);
console.log(`  - ERROR: ${Logger.getLogsByLevel(Logger.LogLevel.ERROR).length} 条`);
console.log(`  - DEBUG: ${Logger.getLogsByLevel(Logger.LogLevel.DEBUG).length} 条`);

// ==================== UMD 特性说明 ====================
console.log('\n💡 UMD 特性:');
console.log('  ✅ 当前环境: CommonJS (Node.js)');
console.log('  ✅ 同一份代码可以在多种环境运行');
console.log('  ✅ 自动检测并适配当前环境');
console.log('  ✅ 支持 AMD、CommonJS 和全局变量');

console.log('\n========================================');
console.log('✅ UMD 模块化示例完成 (CommonJS 环境)');
console.log('========================================');
