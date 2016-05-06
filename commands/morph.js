'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {
  
  get connectorCommands() {
    return ['morph'];
  }

  onCommandMorph(args) {
    this.connector.character.morph(args[0]);
  }
  
};
