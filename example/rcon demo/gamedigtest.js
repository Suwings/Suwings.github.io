const Gamedig = require('gamedig');

// 判断服务器是否在线的依据
Gamedig.query({
    type: 'arkse',
    host: '45.253.65.93',
    port: 21000,
    attemptTimeout: 5000
}).then((state) => {
    console.log(state);
}).catch((error) => {
    console.log("Server is offline");
});