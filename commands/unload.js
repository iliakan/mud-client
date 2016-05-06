'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

class UnloadCommand extends ConnectorHandler {

  get connectorCommands() {
    return ['unload'];
  }

  onCommandUnload(args) {
    let script = args[0];
    this.connector.unloadHandler(script);
  }

}

module.exports = UnloadCommand;

