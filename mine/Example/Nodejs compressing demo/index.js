const compressing = require('compressing');

compressing.zip.compressDir('a4', 'a3.zip')
    .then(() => {
        console.log('success');
    })
    .catch(err => {
        console.error(err);
    });


// 解压缩
compressing.zip.uncompress('a2.zip', 'a2')
    .then(() => {
        console.log('success');
    })
    .catch(err => {
        console.error(err);
    }); 