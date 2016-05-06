'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'circle', function(line) {
      return line.startsWith('Your circle stab');
    });
  }

};

