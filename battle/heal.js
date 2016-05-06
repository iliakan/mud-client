'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorEvents() {
    return ['stats', 'battleStart', 'battleFinish'];
  }

  onBattleFinish() {
    this.connector.write("c 'cure mortal' drok");
  }

  onBattleStart() {
  //  this.connector.write("c heal");
  }

  onStats(stats) {
/*
    if (stats.hpPercent < 0.6) {
      this.connector.write('c heal');
     }
     */
  }

};
