'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'drum', function(line) {
      return line.match(/^You do a rapid drumming|^You swing your maces about wildly/);
    });
  }

};
