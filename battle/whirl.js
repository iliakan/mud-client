'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'whirl', function(line) {
      return line.match(/^You swing your hoopak /);
    });
  }

};
