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
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: req.body
    }, (response, body) => {
        let resBody = body.replace(/twitter\.com/igm, "twproxy.glitch.me");
        // resBody = resBody.replace(/aip.twitter\.com/igm, "twproxy.glitch.me");
        res.send(resBody);
    });

});


console.log("Start........")
app.listen(process.env.PORT || 3000);