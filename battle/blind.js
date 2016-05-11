'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'c blind', function(line) {
      return line.startsWith('You fail to blind') || line == 'You lost your concentration.';
    });

  }

};
