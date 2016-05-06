'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'savage', function(line) {
      return line.match(/^Your savage/);
    });

  }

};
