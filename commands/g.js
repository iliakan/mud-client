'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['g'];
  }

  onCommandG(args) {
    this.connector.write(`get ${args.join(' ')} bag`);
    this.connector.write(`get ${args.join(' ')} 2.bag`);
    this.connector.write(`get ${args.join(' ')} 3.bag`);
    this.connector.write(`get ${args.join(' ')} 4.bag`);
    this.connector.write(`get ${args.join(' ')} 5.bag`);
  }

};

