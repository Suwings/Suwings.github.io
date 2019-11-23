const express = require('express');


//信息存储
global.IPaddrs = {};
const app = express();

app.get('/suwings_infos', (req, res) => {
    let resStr = "";
    for (let k in global.IPaddrs) {
        resStr += "<h4>[" + k + "]:</h4>";
        for (let z in global.IPaddrs[k]) {
            resStr += "  - " + z + "=>" + global.IPaddrs[k][z] + " <br />";
        }
    }
    res.send(resStr);
    res.end();
})

app.get('/suwings_cls', (req, res) => {
    global.IPaddrs = {};
    res.send("OK");
    res.end();
})


app.get('*', (req, res) => {
    let ip = req.ip;
    global.IPaddrs[ip] = {
        "Header": JSON.stringify(req.headers, null, 4),
        "Ips": req.ips,
        "Url": req.baseUrl,
        "HostName": req.hostname,
        "remoteAddress": req.socket.remoteAddress
    }

    res.send("<h4>服务器正在维护... </h4> <br>" + new Date().toTimeString());
    res.end();
})

console.log("监听...")
app.listen(23333, "");