'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

class LoadCommand extends ConnectorHandler {

  get connectorCommands() {
    return ['load'];
  }

  onCommandLoad(args) {
    let script = args[0];
    this.connector.loadHandler(script);
    
  }

}

module.exports = LoadCommand;

