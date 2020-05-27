var Rcon = require('simple-rcon');

var client = new Rcon({
    host: '127.0.0.1',
    port: '32330',
    password: 'kvixFUSOaUEyDVZF'

}).connect();

client.on('authenticated', function () {
    console.log('Authenticated!');
    setInterval(() => {
        client.exec('DestroyAllEnemies', (res) => {
            console.log('Server status:', res.body);
        })
        client.exec('ShowMessageOfTheDay', (res) => {
            console.log('Server status:', res.body);
        })
    }, 1000);

}).on('connected', function () {
    console.log('Connected!');
}).on('disconnected', function () {
    console.log('Disconnected!');
});





// var conn = new Rcon('localhost', 32330, 'kvixFUSOaUEyDVZF', options);
// conn.on('auth', async () => {
//     console.log("RCON connected")

//     // setInterval(() => {
//     //     conn.send('ShowMessageOfTheDay');

//     //     setTimeout(() => {

//     //         conn.send('DestroyAllEnemies');
//     //     }, 1000)
//     // }, 3000)

// }).on('response', function (str) {
//     console.log("[INFO]: " + str);

// }).on('end', function () {
//     console.log("Socket closed!");
//     process.exit();
// }).on('error', function (err) {
//     throw err;
// });

// conn.connect();





