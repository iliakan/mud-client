'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'dirt\ndirt', (line) => {
      this.repeats++;
      // repeat if missed 2 times
      return line.match(/^Your kicked dirt misses/) && (this.repeats % 2 == 0);
    });
    this.repeats = 0;

  }

};
