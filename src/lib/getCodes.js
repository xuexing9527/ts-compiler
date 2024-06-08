const fs = require('fs')
const readFiles= require('./readFiles.js')

function getCodes(fileName) {
    try {
        const tsFiles = readFiles(fileName)

        tsFiles.forEach((tsFile) => {
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
            const codeStr = fs.readFileSync(`${tsFile.dirName}/${tsFile.fileName}`, 'utf8')
            Object.assign(
                tsFile, { codeStr }
            )
        })

        return tsFiles
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File does not exist.");
            console.log(err)
        } else {
            console.error("An error occurred:", err);
        }
    }
}
module.exports = getCodes