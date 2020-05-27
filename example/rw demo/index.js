const fs = require('fs');

let path = './a.log';
const fd = fs.openSync(path, 'w')
fs.writeSync(fd, 'ABCDEFG');
fs.closeSync(fd)