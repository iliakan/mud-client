
'use strict';

let castCheck = require('../lib/castCheck');


const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    // beware: invoker 'chain lightning' is area!
    // super(connector, "c 'vapour'", castCheck);
    super(connector, "magecast", castCheck);
  }

};

