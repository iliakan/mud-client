'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

class Crossslice extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'cross', function(line) {
      return line.startsWith('You slice your swords across') || line.startsWith('You mix up your swords');
    });
  }

}

module.exports = Crossslice;
