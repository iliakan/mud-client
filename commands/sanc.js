'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['sanc'];
  }

  onCommandSanc(args) {
    this.connector.write("c sanc inno");
    this.connector.write("c sanc jumpapa");
    this.connector.write("c sanc atiel");
    this.connector.write("c sanc kef");
  }

};

