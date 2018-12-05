var express = require('express');
var request = require('request');
var concat = require('concat-stream');
var cheerio = require('cheerio');
var zlib = require('zlib');
var parse = require('url-parse');


var app = express();


var proxy = function (req, res) {
    var host = 'https://www.google.com/';
    var url = host + req.url;
    if (req.query.u) {
        url = req.query.u;
    }
    var con = concat(function (response) {
        if (!!response.copy && res._headers['content-type'].indexOf('text/html') > -1) {
            zlib.gunzip(response, function (err, decoded) {
                if (err) {
                    res.end(response)
                    return;
                }
                var data = decoded && decoded.toString();
                var $ = data && cheerio.load(data);
                if (typeof $ === 'function') {
                    data = $.html().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function (item) {
                        if (item.indexOf('google.com') > -1) {
                            var path = parse(item, true);
                            return '/?u=' + encodeURIComponent(item);
                        }
                        if (item.indexOf('gstatic.com') > -1) {
                            return '';
                        }
                        return item;
                    });
                }
                zlib.gzip(data, function (err, encoded) {
                    res.end(encoded);
                });
            });
        } else {
            if (response.copy) {
                res.end(response)
            } else {
                res.end('')
            }
        }
    });
    req.pipe(request(url).on('response', function (response, body) {
        res.writeHead(response.statusCode, response.headers);
    })).pipe(con);
}


app.use('/', proxy);
var x = process.env.PORT || 433;
console.log("listen:" + x)
app.listen(x);