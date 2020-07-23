const fs = require('fs-extra');

const jschardet = require('jschardet');



let data1 = fs.readFileSync('USC-2 LE.ini', {
    encoding: 'ucs-2'
});
const fileData = fs.readFileSync('test.ini');
const z = jschardet.detect(fileData);
console.log('USC-2 LE.ini:\n', data1);
console.log(z);


let data2 = fs.readFileSync('USC-2 LE DOM.ini', {
    encoding: 'ucs-2'
});
const z2 = jschardet.detect(fs.readFileSync('USC-2 LE DOM.ini'));
console.log('USC-2 LE DOM.ini:\n', data2); //{ encoding: 'UTF-16LE', confidence: 1 }
console.log(z2);
// console.log(data2);



const z3 = jschardet.detect(fs.readFileSync('UTF8.ini'));
console.log('3:', z3); // { encoding: 'ascii', confidence: 1 }


const z4 = jschardet.detect(fs.readFileSync('USC-2 LE DOM1.ini'));
console.log('4:', z4);
