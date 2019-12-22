const Koa = require('koa');
const path = require('path');
// const route = require('koa-route');
const serve = require('koa-static');


const app = new Koa();


const wwwPath = path.join(__dirname) + '/public/';
const home = serve(wwwPath);
app.use(home);

console.log('Public: ' + wwwPath)

app.listen(3001);