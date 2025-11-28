/**
 * Prettier 配置文件 - 完整配置选项
 * @see https://prettier.io/docs/en/options.html
 */
export default {
  // ==================== 基础格式化选项 ====================

  /**
   * 每行最大字符数
   * @default 80
   */
  printWidth: 80,

  /**
   * 每个缩进级别的空格数
   * @default 2
   */
  tabWidth: 2,

  /**
   * 使用制表符而不是空格缩进行
   * @default false
   */
  useTabs: false,

  /**
   * 在语句末尾添加分号
   * @default true
   */
  semi: false,

  /**
   * 使用单引号而不是双引号
   * @default false
   */
  singleQuote: true,

  /**
   * 对象属性的引号使用方式
   * - "as-needed": 仅在需要时添加引号
   * - "consistent": 如果对象中至少有一个属性需要引号，则所有属性都加引号
   * - "preserve": 保留用户输入的引号
   * @default "as-needed"
   */
  quoteProps: "as-needed",

  /**
   * 在 JSX 中使用单引号而不是双引号
   * @default false
   */
  jsxSingleQuote: false,

  /**
   * 多行时尽可能打印尾随逗号
   * - "all": 所有可能的地方
   * - "es5": 仅在 ES5 中有效的地方（对象、数组等）
   * - "none": 不添加尾随逗号
   * @default "all"
   */
  trailingComma: "es5",

  /**
   * 在对象字面量的括号之间打印空格
   * true: { foo: bar }
   * false: {foo: bar}
   * @default true
   */
  bracketSpacing: true,

  /**
   * 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，
   * 而不是单独放在下一行（不适用于自闭合元素）
   * @default false
   */
  bracketSameLine: false,

  /**
   * 箭头函数参数周围包含括号
   * - "always": 始终包含括号
   * - "avoid": 尽可能省略括号
   * @default "always"
   */
  arrowParens: "always",

  // ==================== Markdown 选项 ====================

  /**
   * Markdown 文本换行
   * - "always": 当超过 printWidth 时换行
   * - "never": 不换行
   * - "preserve": 保留原样
   * @default "preserve"
   */
  proseWrap: "preserve",

  // ==================== HTML 选项 ====================

  /**
   * HTML 空格敏感度
   * - "css": 遵守 CSS display 属性的默认值
   * - "strict": 所有标签周围的空格都被认为是重要的
   * - "ignore": 所有标签周围的空格都被认为是不重要的
   * @default "css"
   */
  htmlWhitespaceSensitivity: "css",

  // ==================== Vue 选项 ====================

  /**
   * 是否缩进 Vue 文件中 <script> 和 <style> 标签内的代码
   * @default false
   */
  vueIndentScriptAndStyle: true,

  // ==================== 行尾 ====================

  /**
   * 行尾样式
   * - "lf": \n（仅换行）
   * - "crlf": \r\n（回车 + 换行）
   * - "cr": \r（仅回车）
   * - "auto": 保持现有的行尾（混合值在同一文件中归一化为第一行找到的内容）
   * @default "lf"
   */
  endOfLine: "lf",

  // ==================== 嵌入式语言格式化 ====================

  /**
   * 控制 Prettier 是否格式化文件中嵌入的引用代码
   * - "auto": 如果 Prettier 可以自动识别，则格式化嵌入代码
   * - "off": 不格式化嵌入代码
   * @default "auto"
   */
  embeddedLanguageFormatting: "auto",

  // ==================== JSX/TSX 选项 ====================

  /**
   * 在 JSX 中每行强制单个属性
   * @default false
   */
  singleAttributePerLine: true,

  // ==================== 范围格式化 ====================

  /**
   * 仅格式化文件的一部分（起始偏移量）
   * @default 0
   */
  // rangeStart: 0,

  /**
   * 仅格式化文件的一部分（结束偏移量）
   * @default Infinity
   */
  // rangeEnd: Infinity,

  // ==================== 特殊处理 ====================

  /**
   * 指定用于推断要使用的解析器的文件名
   * 通常不需要设置，Prettier 会自动推断
   */
  // filepath: undefined,

  /**
   * 需要编译指示
   * 如果设置为 true，则 Prettier 将仅在文件顶部包含特殊注释（称为 pragma）时才格式化文件
   * @default false
   */
  requirePragma: false,

  /**
   * 插入编译指示
   * 在已使用 Prettier 格式化的文件顶部插入一个 @format 标记的特殊注释
   * @default false
   */
  insertPragma: true,

  // ==================== 覆盖特定文件的配置 ====================

  /**
   * 为特定文件提供不同的配置
   */
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
        printWidth: 100,
      },
    },
    {
      files: ["*.css", "*.scss", "*.less"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: "*.html",
      options: {
        printWidth: 120,
      },
    },
  ],

  // ==================== 插件配置 ====================

  /**
   * Prettier 插件
   * 用于扩展 Prettier 支持的语言或格式化规则
   */
  plugins: [
    // 'prettier-plugin-tailwindcss', // Tailwind CSS 类排序
    // 'prettier-plugin-organize-imports', // 组织导入语句
    // '@trivago/prettier-plugin-sort-imports', // 排序导入
  ],

  // ==================== 特定插件配置 ====================

  /**
   * 如果使用 @trivago/prettier-plugin-sort-imports
   */
  // importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  // importOrderSeparation: true,
  // importOrderSortSpecifiers: true,

  /**
   * 如果使用 prettier-plugin-tailwindcss
   */
  // tailwindConfig: './tailwind.config.js',
  // tailwindFunctions: ['clsx', 'cn'],
};
