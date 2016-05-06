'use strict';


// TODO?

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['savewalk'];
  }

  get connectorEvents() {
    return ['readlineServer'];
  }

  onCommandSavewalk(args) {
    this.enabled = args[0] == 'on';
  }

  onReadlineServer(line) {
    if (!this.enabled) return;


  };

};

