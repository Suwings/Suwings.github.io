var request = require('request');
var express = require('express');
var parse = require('url-parse');

let TAR_URL = "https://twitter.com"
let TOP_NAME = "twitter.com"

var app = express();

function toWebstie(options, callback) {
    request(options, function (err, response, body) {
        if (err) {
            console.log(err);
        }
        callback(response, body);
    })
}


app.all('*', (req, res) => {
    console.log("请求:" + req.method + TAR_URL + req.url);
    toWebstie({
        method: req.method,
        url: TAR_URL + req.url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        },
        body: req.body
    }, (response, body) => {
        let resBody = body;
        resBody = resBody.replace(/abs\.twimg\.com/igm, "sutwimg.glitch.me");
        resBody = resBody.replace(/pbs\.twimg\.com/igm, "sutwpbs.glitch.me");
        resBody = resBody.replace(/twitter\.com/igm, "twproxy.glitch.me");

        //特殊的文件
        if (req.url.indexOf("js_inst") > -1) {
            res.writeHead(response.statusCode, {
                'content-type': 'application/javascript; charset=utf-8'
            });
            res.end(body);
            return;
        }

        res.send(resBody);
    });

});


console.log("Start........")
app.listen(process.env.PORT || 3000);