const fs = require('fs')
const crypto = require('crypto');
const key = new Buffer.from('0b1e1d000f0b07091d1f04071f1e0407') // 256 位的共享密钥
const iv = new Buffer.from('0123456789ABCDEF');                 // 初始向量，16 字节
const algorithm = 'aes-256-cbc';                                // 加密算法和操作模式
const cipher = crypto.createCipheriv(algorithm, key, iv);       // 初始化加密算法

const inFileName = 'ppx.jpg'
const outFileName = 'output.jpg'

const fileBuf = fs.readFileSync(inFileName)
let encrypted = cipher.update(fileBuf, 'binary', 'binary');
encrypted += cipher.final('binary');
fs.writeFile(outFileName, new Buffer.from(encrypted, 'binary'), (err) => {
    if (!err)
        console.log((new Date()).toTimeString() + ':成功');
    else {
        console.error((new Date()).toTimeString() + '失败');
    }
})