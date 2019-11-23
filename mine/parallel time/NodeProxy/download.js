var request = require('request');
var express = require('express');

var app = express();

app.all('*', (req, res) => {

    let TAR_URL = "";
    if (req.query._linkto) {
        TAR_URL = req.query._linkto
    }
    if (!TAR_URL.trim()) {
        res.send("Access denied!");
        return;
    };

    console.log("Download page:", TAR_URL);

    let readStream = request({
        method: req.method,
        url: TAR_URL,
        headers: req.headers,
        body: req.body || ""
    });
    readStream.pipe(res);

});


console.log("Start........")
app.listen(process.env.PORT || 3000);