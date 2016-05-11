'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'cast slow', function(line) {
      return line == 'Spell failed.'; // || line.endsWith('is moving at normal speed.');
    });
  }

};
