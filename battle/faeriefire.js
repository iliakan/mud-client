'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');


module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, "cast 'faerie fire'", line => line.startsWith('You draw upon the powers') || line.startsWith('You concentrate a moment') || line.startsWith('You utter a prayer'));
  }

};

