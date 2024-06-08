const getCodes = require('./lib/getCodes')

function compiler(fileName) {
    // 读取 TS 代码
    console.log(getCodes(fileName))
    // 分析 TS 代码
    // 词法，语法，语义 分析
    // 输出 TS 对应的 JS 代码
}

compiler('./demo.ts')
// compiler()