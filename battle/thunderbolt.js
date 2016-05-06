'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');


module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'cast thunderbolt', line => line.startsWith('You conjure a powerful thunderbolt'));
  }

};

