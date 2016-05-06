'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, "c spark", function(line) {
      return line.startsWith('You utter a prayer') || line.startsWith('You draw upon the powers') || line.startsWith('You concentrate a moment');
    });
  }

};
