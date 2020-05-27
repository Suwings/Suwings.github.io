var { Rcon, RconCommand } = require('./mrcon');

var options = {
    tcp: true,       // false for UDP, true for TCP (default true)
    challenge: false  // true to use the challenge protocol (default true)
};


var conn = new RconCommand('localhost', 32330, 'kvixFUSOaUEyDVZF', options);
conn.sendCommand('saveworld');

var conn = new RconCommand('localhost', 32330, 'kvixFUSOaUEyDVZF', options);
conn.sendCommand('Doexit');

// var conn = new RconCommand('localhost', 32330, 'kvixFUSOaUEyDVZF', options);
// conn.sendCommand('DestroyAllEnemies');

// for (let i = 0; i < 100; i++) {

//     var conn = new RconCommand('localhost', 32330, 'kvixFUSOaUEyDVZF', options);
//     conn.sendCommand('KillPlayer    ', (text, err) => {
//         if (err) {
//             console.log('执行错误:' + err);
//             return;
//         }
//         console.log(i + 'text:' + text)
//     });
// }
// conn.sendCommand('DestroyAllEnemies');

