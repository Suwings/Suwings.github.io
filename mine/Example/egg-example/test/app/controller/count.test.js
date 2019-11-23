'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/count.test.js', () => {
  // 每个用例会按 before -> beforeEach -> it -> afterEach -> after 的顺序执行
  before(() => { console.log('正在测试....'); });
  // 测试用例名称
  it('LoginED module test', async () => {

    const ctx = app.mockContext();
    // 自定义Session
    app.mockSession({
      uid: 'master',
    });

    await app.httpRequest().get('/u').expect(200);
    // EggMock自带测试用例
    return app.httpRequest()
      .get('/u?username=master')
      .expect(`LOGINED: UID: ${ctx.session.uid} COUNT: ${ctx.cookies.count || 1}`)
      .expect(200);
  });
});
