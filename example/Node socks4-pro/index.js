/*
 * @Author: your name
 * @Date: 2020-11-03 11:23:41
 * @LastEditTime: 2020-11-08 15:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ARK-ControlPaneld:\MineSuwings\Suwings.github.io\example\Node socks4-pro\index.js
 */
const net = require('net');
const server = net.createServer();

// 协议认证
function defineProtocol(person, socket, buff) {
    var proto;
    proto = buffer_to_hex(buff);

    var result = ["00", "5a", proto[2], proto[3], proto[4], proto[5], proto[6], proto[7]];
    const sendBuffer = hex_to_buffer(result);

    person.write(sendBuffer);

    const port = parseInt(proto[2] + "" + proto[3], 16);
    const destIP = parseInt(proto[4], 16) + "." + parseInt(proto[5], 16) + "." + parseInt(proto[6], 16) + "." + parseInt(proto[7], 16);

    console.log("新建Socket链接", destIP, port);

    socket.connect(port, destIP, function () { });
    socket.on('data', function (data) {
        person.write(data);
    });
    socket.on('error', function (e) {
        console.error(`请求遇到问题: ${e.message}`);
    });
}

// 本地监听
server.on('connection', (person) => {
    var isFrist = true;
    const socket = new net.Socket();

    person.on('data', (buff) => {
        if (isFrist) {
            defineProtocol(person, socket, buff);
            isFrist = false;
        } else {
            socket.write(buff);
        }
    });

    person.on('close', (p1) => {
        console.log("代理 Socket 被关闭！")
    });

    person.on('error', (p1) => {
        console.log("代理 Socket 出错：", p1);
    });

});




function hex_to_buffer(__array) {
    if (!Array.isArray(__array)) {
        return hex_array([__array])
    }
    var hex_array = __array.map(el => parseInt(el, 16))
    var uarray = new Uint8Array(hex_array)
    return Buffer.from(uarray)
}


function buffer_to_hex(__buffer) {
    var uarray = Array.prototype.slice.call(__buffer)
    return uarray.map(el => Number(el).toString(16))
}


server.listen(1080);
