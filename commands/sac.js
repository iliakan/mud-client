'use strict';

const chalk = require('chalk');
const ConnectorHandler = require('../lib/connectorHandler');

// #sac key
module.exports = class extends ConnectorHandler {

  constructor(connector) {
    super(connector);
  }
  get connectorCommands() {
    return ['sac'];
  }

  get connectorEvents() {
    return ['readlineServer'];
  }

  onCommandSac(args) {
    this.target = args[0];
    this.connector.write(`sac ${this.target}`);
  }

  onReadlineServer(line) {
    if (!this.target) return;

    if (line.startsWith('The gods give you')) {
      this.connector.write(Math.random() > 0.5 ? `sac ${this.target}`: `sac 1.${this.target}`);
    } else if (line == "You can't find it.") {
      this.target = null;
    }
  }


};


