'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');
const castCheck = require('../lib/castCheck');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'c "hold', function(line) {
      return line.match(/^You can't concentrate enough./) || castCheck(line);
    });
  }

};
