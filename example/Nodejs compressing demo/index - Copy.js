const compressing = require('compressing');

compressing.zip.compressDir('D:\\Game\\Steam', 'a2.zip')
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