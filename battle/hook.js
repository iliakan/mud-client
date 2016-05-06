'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'hook', function(line) {
      return line.match(/You deliver a mighty/);
    });
  }

};
