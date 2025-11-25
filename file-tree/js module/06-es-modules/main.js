/**
 * 主入口文件 - ES Modules 规范
 * 演示多种导入方式
 */

console.log('========================================');
console.log('ES Modules 模块化示例');
console.log('========================================\n');

// 方式1: 导入默认导出
import Calculator from './calculator.js';
import Logger from './logger.js';

// 方式2: 导入命名导出
import { add, multiply, getVersion } from './calculator.js';
import { info, warn, error, LogLevel } from './logger.js';

// 方式3: 导入所有（命名空间导入）
import * as Utils from './utils.js';

// 方式4: 混合导入（默认 + 命名）
// import Calculator, { add, multiply } from './calculator.js';

// 方式5: 重命名导入
import { formatNumber as fmt } from './utils.js';

console.log('📦 模块加载完成 (ES Modules 方式)\n');

// ==================== 测试日志模块 ====================
console.log('📊 测试日志模块:');
info('应用启动 (ES Modules 环境)');
warn('这是一个警告信息');
error('这是一个错误信息');
Logger.debug('这是一个调试信息');
console.log(`日志总数: ${Logger.getLogCount()}\n`);

// ==================== 测试计算器模块 ====================
console.log('🧮 测试计算器模块:');
info('开始计算器测试');

// 使用默认导出的对象
const result1 = Calculator.add(10, 5);
console.log(`10 + 5 = ${result1}`);
info(`加法运算: 10 + 5 = ${result1}`);

// 使用命名导出的函数
const result2 = add(30, 12);
console.log(`30 + 12 = ${result2}`);
info(`命名导入函数: 30 + 12 = ${result2}`);

const result3 = multiply(6, 7);
console.log(`6 * 7 = ${result3}`);
info(`乘法运算: 6 * 7 = ${result3}`);

const result4 = Calculator.divide(100, 4);
console.log(`100 / 4 = ${result4}`);
info(`除法运算: 100 / 4 = ${result4}`);

const result5 = Calculator.power(2, 10);
console.log(`2 ^ 10 = ${result5}`);
info(`幂运算: 2 ^ 10 = ${result5}`);

const result6 = Calculator.sqrt(16);
console.log(`√16 = ${result6}`);
info(`平方根: √16 = ${result6}`);

const result7 = Calculator.mod(17, 5);
console.log(`17 % 5 = ${result7}`);
info(`取模: 17 % 5 = ${result7}`);

console.log(`\n📜 计算器版本: ${getVersion()}`);
console.log('📜 计算历史:');
console.table(Calculator.getHistory());

// ==================== 测试工具模块 ====================
console.log('\n🔧 测试工具模块:');
console.log(`π = ${Utils.PI}`);
console.log(`e = ${Utils.E}`);
console.log(`格式化数字: ${fmt(Utils.PI, 4)}`);
console.log(`格式化数字: ${Utils.formatNumber(Utils.E, 3)}`);
console.log(`限制范围: ${Utils.clamp(9999999, 0, 100)}`);
console.log(`随机整数: ${Utils.randomInt(1, 100)}`);
console.log(`数组求和: ${Utils.MathUtils.sum(1, 2, 3, 4, 5)}`);
console.log(`数组平均: ${Utils.MathUtils.average(10, 20, 30)}`);
info('工具模块测试完成');

// ==================== 测试错误处理 ====================
console.log('\n⚠️ 测试错误处理:');
try {
  Calculator.divide(10, 0);
} catch (e) {
  console.error(`捕获到错误: ${e.message}`);
  error(`除零错误: ${e.message}`);
}

try {
  Calculator.sqrt(-1);
} catch (e) {
  console.error(`捕获到错误: ${e.message}`);
  error(`负数开方错误: ${e.message}`);
}

// ==================== 查看所有日志 ====================
console.log('\n📊 所有日志记录:');
console.table(Logger.getLogs());

console.log('\n📈 日志统计:');
console.log(`  - INFO:  ${Logger.getLogsByLevel(LogLevel.INFO).length} 条`);
console.log(`  - WARN:  ${Logger.getLogsByLevel(LogLevel.WARN).length} 条`);
console.log(`  - ERROR: ${Logger.getLogsByLevel(LogLevel.ERROR).length} 条`);
console.log(`  - DEBUG: ${Logger.getLogsByLevel(LogLevel.DEBUG).length} 条`);

// ==================== ES Modules 特性演示 ====================
console.log('\n💡 ES Modules 特性:');
console.log('  ✅ 使用 import/export 语法');
console.log('  ✅ 静态分析，编译时确定依赖');
console.log('  ✅ 支持 Tree-shaking');
console.log('  ✅ 异步加载，不阻塞');
console.log('  ✅ JavaScript 官方标准');
console.log('  ✅ 现代浏览器和 Node.js 原生支持');

console.log('\n🔄 多种导入方式:');
console.log('  1. 默认导出: import Calculator from "./calculator.js"');
console.log('  2. 命名导出: import { add } from "./calculator.js"');
console.log('  3. 命名空间: import * as Utils from "./utils.js"');
console.log('  4. 混合导入: import Calculator, { add } from "./calculator.js"');
console.log('  5. 重命名:   import { formatNumber as fmt } from "./utils.js"');

// ==================== 动态导入演示 ====================
console.log('\n🚀 动态导入 (Dynamic Import):');
const shouldLoadModule = true;

if (shouldLoadModule) {
  // 动态导入（异步）
  import('./utils.js').then(module => {
    console.log('✅ 动态加载 utils 模块成功');
    console.log(`动态导入的 PI: ${module.PI}`);
  });
}

console.log('\n========================================');
console.log('✅ ES Modules 模块化示例完成');
console.log('========================================');
