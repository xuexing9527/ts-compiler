const fs = require('fs')
const path = require('path')

module.exports = function readFiles (fileName) {
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