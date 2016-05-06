'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'bone', function(line) {
      return line.match(/You land a sudden|You try to land a quick/);
    });
  }

};
