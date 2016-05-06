'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'pugil', function(line) {
      return line.match(/^You smash /) || line.startsWith('Your pugil misses');
    });
  }

};
