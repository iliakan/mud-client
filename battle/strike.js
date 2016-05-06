'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

class Crossslice extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'strike', function(line) {
      return line.startsWith('Your strike');
    });
  }

}

module.exports = Crossslice;
