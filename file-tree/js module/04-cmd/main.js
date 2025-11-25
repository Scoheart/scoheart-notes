/**
 * 主入口文件 - CMD 规范
 * 演示 CMD 的依赖就近和延迟执行特性
 */
define(function(require, exports, module) {
  'use strict';

  console.log('========================================');
  console.log('CMD 模块化示例');
  console.log('========================================\n');

  // CMD 特性1: 依赖就近 - 在需要时才 require
  // 不像 AMD 需要在开头声明所有依赖
  console.log('📦 开始按需加载模块\n');

  // 先加载日志模块
  const Logger = require('./logger');
  console.log('✅ Logger 模块已加载\n');

  // ==================== 测试日志模块 ====================
  console.log('📊 测试日志模块:');
  Logger.info('应用启动');
  Logger.warn('这是一个警告信息');
  Logger.error('这是一个错误信息');
  Logger.debug('这是一个调试信息');
  console.log('日志总数:', Logger.getLogCount());
  console.log('');

  // CMD 特性2: 延迟加载 - 只有在需要时才加载计算器模块
  // 如果这个条件不满足，calculator.js 根本不会被加载
  const needCalculator = true;
  let Calculator;

  if (needCalculator) {
    // 只有在需要时才加载
    Calculator = require('./calculator');
    console.log('✅ Calculator 模块已加载\n');
  }

  // ==================== 测试计算器模块 ====================
  console.log('🧮 测试计算器模块:');
  Logger.info('开始计算器测试');

  const result1 = Calculator.add(10, 5);
  console.log('10 + 5 =', result1);
  Logger.info('加法运算: 10 + 5 = ' + result1);

  const result2 = Calculator.subtract(20, 8);
  console.log('20 - 8 =', result2);
  Logger.info('减法运算: 20 - 8 = ' + result2);

  const result3 = Calculator.multiply(6, 7);
  console.log('6 * 7 =', result3);
  Logger.info('乘法运算: 6 * 7 = ' + result3);

  const result4 = Calculator.divide(100, 4);
  console.log('100 / 4 =', result4);
  Logger.info('除法运算: 100 / 4 = ' + result4);

  const result5 = Calculator.power(2, 10);
  console.log('2 ^ 10 =', result5);
  Logger.info('幂运算: 2 ^ 10 = ' + result5);

  const result6 = Calculator.sqrt(16);
  console.log('√16 =', result6);
  Logger.info('平方根: √16 = ' + result6);

  console.log('');
  console.log('📜 计算器版本:', Calculator.getVersion());
  console.log('📜 计算历史:');
  console.table(Calculator.getHistory());

  // ==================== 测试错误处理 ====================
  console.log('⚠️ 测试错误处理:');
  try {
    Calculator.divide(10, 0);
  } catch (e) {
    console.error('捕获到错误:', e.message);
    Logger.error('除零错误: ' + e.message);
  }

  try {
    Calculator.sqrt(-1);
  } catch (e) {
    console.error('捕获到错误:', e.message);
    Logger.error('负数开方错误: ' + e.message);
  }

  // ==================== 查看所有日志 ====================
  console.log('');
  console.log('📊 所有日志记录:');
  console.table(Logger.getLogs());

  console.log('');
  console.log('📈 日志统计:');
  console.log('  - INFO: ', Logger.getLogsByLevel(Logger.LogLevel.INFO).length, '条');
  console.log('  - WARN: ', Logger.getLogsByLevel(Logger.LogLevel.WARN).length, '条');
  console.log('  - ERROR:', Logger.getLogsByLevel(Logger.LogLevel.ERROR).length, '条');
  console.log('  - DEBUG:', Logger.getLogsByLevel(Logger.LogLevel.DEBUG).length, '条');

  // ==================== CMD 特性演示 ====================
  console.log('');
  console.log('💡 CMD 特性:');
  console.log('  ✅ 使用 define(function(require, exports, module) {}) 定义模块');
  console.log('  ✅ 依赖就近：在需要时才 require，不需要提前声明');
  console.log('  ✅ 延迟执行：模块在被 require 时才执行');
  console.log('  ✅ 语法接近 CommonJS，更易理解');
  console.log('  ✅ 按需加载，性能更好');

  console.log('');
  console.log('🔄 CMD vs AMD:');
  console.log('  - CMD: 依赖就近，延迟执行，按需加载');
  console.log('  - AMD: 依赖前置，提前执行，可能加载不必要的模块');

  // ==================== 更新页面显示 ====================
  document.getElementById('calculator-results').innerHTML = `
    <div class="result">加法: 10 + 5 = ${result1}</div>
    <div class="result">减法: 20 - 8 = ${result2}</div>
    <div class="result">乘法: 6 * 7 = ${result3}</div>
    <div class="result">除法: 100 / 4 = ${result4}</div>
    <div class="result">幂运算: 2 ^ 10 = ${result5}</div>
    <div class="result">平方根: √16 = ${result6}</div>
    <div class="result">版本: ${Calculator.getVersion()}</div>
  `;

  document.getElementById('logger-results').innerHTML = `
    <div class="result">日志总数: ${Logger.getLogCount()}</div>
    <div class="result">INFO 日志数: ${Logger.getLogsByLevel(Logger.LogLevel.INFO).length}</div>
    <div class="result">WARN 日志数: ${Logger.getLogsByLevel(Logger.LogLevel.WARN).length}</div>
    <div class="result">ERROR 日志数: ${Logger.getLogsByLevel(Logger.LogLevel.ERROR).length}</div>
    <div class="result">DEBUG 日志数: ${Logger.getLogsByLevel(Logger.LogLevel.DEBUG).length}</div>
  `;

  console.log('');
  console.log('========================================');
  console.log('✅ CMD 模块化示例完成');
  console.log('========================================');
});
