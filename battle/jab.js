'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'jab', function(line) {
      return line.startsWith('Your jab');
    });
  }

};
