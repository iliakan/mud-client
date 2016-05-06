'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorEvents() {
    return ['battleFinish'];
  }

  onBattleFinish() {
    this.connector.write("c ignite dag");
  }

};
