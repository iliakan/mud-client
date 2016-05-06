'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['sle', 'wak'];
  }

  onCommandSle(args) {
    this.connector.character.sleep();
  }
  onCommandWak(args) {
    this.connector.character.wake();
  }

};


