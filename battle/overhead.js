'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'overhead', function(line) {
      return line.match(/^You make a powerful overhead/);
    });
  }

};
