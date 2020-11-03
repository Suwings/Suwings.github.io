var socks4 = require('socks4');
var server = socks4.createServer();

server.on('connect', function (req) {
    try {
        console.log("正在访问:" + req.socket.remoteAddress);
        req.accept();
        server.proxyRequest(req);

    } catch (err) {
        console.log("ERR:", err);
    }
});

console.log("OK///");
server.listen(1080);