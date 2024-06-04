const fs = require('fs')
const path = require('path')

function readCode(fileName) {
    try {
        fileName = fileName || './'
        const stat = fs.statSync(fileName) // 判断是文件 or 文件夹
        const tsFiles = []
        const pathDirName = path.dirname(fileName)
        if (stat.isDirectory()) {
            fs.readdirSync(fileName, 'utf8').
                forEach(file => (path.extname(file) === '.ts') && tsFiles.push({ fileName: file, dirName: pathDirName, size: stat.size }))
        } else if (stat.isFile() && path.extname(fileName) === '.ts') {
            tsFiles.push({ fileName: path.basename(fileName), dirName: pathDirName, size: stat.size })
        } else {
            throw Error('fileName 异常！')
        }
        console.log(tsFiles)

        tsFiles.forEach((tsFile) => {
            const targetObj = {}
            // 如果文件太大，可以使用流处理（stream），此处仅判断跳过
            if (tsFile.size > 2 * 1024 * 1024) {
                Object.assign(
                    tsFile,
                    {
                        tsCode: '',
                        error: '文件大于2M，暂不支持大于 2M 文件读取'
                    }
                )
            }
            const codeStr = fs.readFileSync(tsFile.fileName, 'utf8')
            Object.assign(
                tsFile,
                { codeStr }
            )
        })

        return tsFiles

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File does not exist.");
        } else {
            console.error("An error occurred:", err);
        }
    }
}

function compiler(fileName) {
    // 读取 TS 代码
    console.log(readCode(fileName))
    // 分析 TS 代码
    // 输出 TS 对应的 JS 代码
}

compiler('./demo.ts')
// compiler()