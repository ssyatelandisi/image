console.time('耗时')
const crypto = require('crypto')
const key = new Buffer.from('0b1e1d000f0b07091d1f04071f1e0407')
const iv = new Buffer.from('0123456789ABCDEF');
const algorithm = 'aes-256-cbc';
const decipher = crypto.createDecipheriv(algorithm, key, iv);

fetch('https://cdn.jsdelivr.net/gh/ssyatelandisi/image@master/output.jpg').then((res) => res.arrayBuffer()).then(res => {
    let decrypted = decipher.update(new Uint8Array(res), 'binary', 'binary');
    decrypted += decipher.final();
    const blob = new Blob([new Buffer.from(decrypted, 'binary')], { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)
    document.querySelector("#aimg").src = url
}).finally(() => {
    console.timeEnd('耗时')
})