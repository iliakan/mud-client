'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'dirt', function(line) {
      return line.match(/^Your kicked dirt misses/);
    });

  }

  onReadlineServer(line) {
    super.onReadlineServer(line);
    if (line.match(/rubs the dirt out of \w+ eyes/)) {
      this.connector.write('dirt');
    }
  }

};
