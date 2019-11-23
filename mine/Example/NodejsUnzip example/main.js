var fs = require("fs");
var unzip = require("unzip");

// fs.createReadStream('NodejsUnzip.zip').pipe(unzip.Extract({ path: 'unarchive' }));


var AdmZip = require('adm-zip');
require('adm-zip-iconv');
// var zip = new AdmZip("./NodejsUnzip - 副本.zip", "GB2312");
// zip.extractAllTo("./NodejsUnzip - 副本/", true);


// var fs = require("fs");
// var unzip = require("unzip");

// fs.createReadStream('NodejsUnzip - 副本.zip', {
//     encoding: 'GB2312'
// }).pipe(unzip.Extract({ path: 'NodejsUnzip - 副本' }));


// var zip = new AdmZip();
// zip.addLocalFolder('NodejsUnzip - 副本');
// zip.writeZip('NodejsUnzip - 副本.zip');  

var zipper = require("zip-local");
// zipper.zip("./NodejsUnzip - 副本", function (error, zipped) {

//     if (!error) {
//         zipped.compress(); // compress before exporting

//         var buff = zipped.memory(); // get the zipped file as a Buffer

//         // or save the zipped file to disk
//         zipped.save("NodejsUnzip - 副本.zip", function (error) {
//             if (!error) {
//                 console.log("saved successfully !");
//             }
//         });
//     }
// });

// zipper.sync.zip("NodejsUnzip - 副本").compress().save("NodejsUnzip - 副本.zip");
// if (!fs.existsSync("解压文件 NodejsUnzip - 副本")) {
try {

    fs.mkdirSync("解压文件 NodejsUnzip - 副本");
} catch (err) {

}
// }
zipper.sync.unzip("NodejsUnzip - 副本.zip").save("解压文件 NodejsUnzip - 副本");