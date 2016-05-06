'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['afk'];
  }

  onCommandAfk(args) {
    this.connector.isAfk = (args[0] == 'off') ? false : true;
    this.connector.show("AFK mode " + this.connector.isAfk);
  }

};

