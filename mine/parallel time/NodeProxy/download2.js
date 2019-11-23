var request = require('request');
var express = require('express');
var parse = require('url-parse');


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

    let mhost = "http://127.0.0.1:3000";
    let TAR_URL = "";
    if (req.query._linkto) {
        TAR_URL = req.query._linkto
    }

    console.log("Download page:", TAR_URL);

    toWebstie({
        method: req.method,
        url: TAR_URL,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        },
        body: req.body
    }, (response, body) => {
        // let reg = /((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/igm
        // let urlsArr = reg.exec(body);
        // for (let i = 0; i < urlsArr.length; i++) {
        //     const url = urlsArr[i];

        // }
        body = body || "Not Page";
        body = body.replace(/(http|ftp|https):\/\//igm, mhost + "?_linkto=$1://");
        body = body.replace(/href=[\"\']([A-Za-z0-9_.?#\/]{1,})[\"\']/igm, "href=\'" + mhost + "?_linkto=" + TAR_URL + "/$1\'");
        body = body.replace(/src=[\"\']([A-Za-z0-9_.?#\/]{1,})[\"\']/igm, "src=\'" + mhost + "?_linkto=" + TAR_URL + "/$1\'");

        //特殊的文件
        if (req.url.indexOf(".js") > -1) {
            res.writeHead(response.statusCode, {
                'content-type': 'application/javascript; charset=utf-8'
            });
            res.end(body);
            return;
        }
        if (req.url.indexOf(".css") > -1) {
            res.writeHead(response.statusCode, {
                'content-type': 'text/css; charset=utf-8'
            });
            res.end(body);
            return;
        }

        res.send(body);
    });

});


console.log("Start........")
app.listen(process.env.PORT || 3000);