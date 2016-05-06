'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'cast "flesh to dust"', function(line) {
      return line == 'Spell failed.';
    });
  }

  onReadlineServer(line) {
    super.onReadlineServer(line);

    // and then swing
    if (line.endsWith('begins to revert to dust.')) {
      this.connector.write('swing');
    }

    if (line.startsWith('You smash')) {
      this.connector.write('swing');
    }

  }

};
