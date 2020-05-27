'use strict';

const mock = require('egg-mock');

describe('test/mypulgin.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mypulgin-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mypulgin')
      .expect(200);
  });
});
