'use strict';

const Controller = require('egg').Controller;


class CountUser extends Controller {
  async display() {
    const ctx = this.ctx;
    // GET Query
    const username = ctx.query.username || '';
    // Session 操作
    if (await ctx.service.user.isLogined(username)) {
      const uid = username;
      // 设置cookie
      let count = ctx.cookies.get('count');
      count = count ? Number(count) : 0;
      ctx.cookies.set('count', ++count);
      ctx.body = `LOGINED: UID: ${uid} COUNT: ${count}`;
      return;
    }
    ctx.body = '权限阻止.';

  }
}


module.exports = CountUser;
