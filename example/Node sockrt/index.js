const net = require('net');
const server = net.createServer();



server.on('connection', (person) => {
    var isFrist = true;
    var proto = null;
    person.on('data', (buff) => {

        if (isFrist) {
            proto = buffer_to_hex(buff);
            // 协议逻辑
            console.log("收到协议头:", proto)

            var result = ["00", "5a", proto[2], proto[3], proto[4], proto[5], proto[6], proto[7]];
            const sendBuffer = hex_to_buffer(result);

            console.log("响应协议头:", result);

            person.write(sendBuffer);
            isFrist = false;
        } else {
            const socket = new net.Socket();
            const port = parseInt(proto[2] + "" + proto[3], 16);
            const destIP = parseInt(proto[4], 16) + "." + parseInt(proto[5], 16) + "." + parseInt(proto[6], 16) + "." + parseInt(proto[7], 16);

            console.log("正在尝试链接:", destIP, ":", port);

            // 发送数据
            socket.connect(port, destIP, function () {
                socket.write(buff);
            });

            // 返回数据
            socket.on('data', function (msg) {
                person.write(msg);
            });

            socket.on('error', function (e) {
                console.error(`请求遇到问题: ${e.message}`);
            });
        }
    })
    person.on('close', (p1) => {
        console.log("代理 Socket 被关闭！")
    })
    person.on('error', (p1) => {
        console.log("代理 Socket 出错：", p1);
    })
})


server.listen(1080);




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


