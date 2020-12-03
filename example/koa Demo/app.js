/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2019-11-07 10:54:57
 * @LastEditTime: 2020-12-02 19:07:37
 * @Description: 
 */
const Koa = require('koa');
const session = require('koa-session');
const Router = require('koa-router');

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: true, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx, next) => {
    await next();
    console.log(`[${ctx.method}] ${ctx.url}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
router.get('/', function (ctx) {
    ctx.session = 1;
    ctx.body = "Hello koa";
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);