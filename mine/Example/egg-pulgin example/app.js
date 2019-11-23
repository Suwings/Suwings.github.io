'use strict';

const fs = require('fs');

module.exports = app => {
  app.customData = 'OK';
  fs.writeFileSync('1.txt', 'ok');
  app.coreLogger.info('框架已经准备好....准备启动！');
};