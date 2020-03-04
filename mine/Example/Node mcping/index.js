var mcping = require('minecraft-ping');

let MCServStatus = require('./mcpi')



// mcping.ping_fe01fa({ host: '127.0.0.1', port: 25566 }, function (err, res) {
//     if (err) {
//         // Some kind of error
//         console.error('ERROR:', err);
//     } else {
//         // Success!
//         console.log(res);
//     }
// }, 3000);


async function potato(port, ip) {
    try {
        console.log(await new MCServStatus(port, ip).asyncStatus());
    } catch (err) {
        console.log('检测失败')
        console.log(err);
    }
}


potato(25566, 'localhost');