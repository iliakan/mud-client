'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'thrust', function(line) {
      return line.match(/^Your thrust /);
    });
  }

};
