'use strict';

const chalk = require('chalk');
const ConnectorHandler = require('../lib/connectorHandler');
const _ = require('lodash');

const notifier = require('node-notifier');
// identify all items on the ground

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['idback'];
  }

  get connectorEvents() {
    return ['readlineServer'];
  }

  onCommandIdback(args) {
    this.store = args[0];
    this.enabled = true;
    this.counter = 1;
    this.connector.write(`get ${this.counter}. ${this.store}`);
  }

  onReadlineServer(line) {
    if (!this.enabled) return;

    if (line.startsWith('You get')) {
      this.connector.write(`c ident 1.`);
    }

    if (line.startsWith('You lost')) {
      this.connector.write(`c ident 1.`);
    }

    if (line == 'A warm wave of magic flows through your hands as you perceive that..') {
      this.counter++;
      this.connector.write(`put 1. ${this.store}`);
      this.connector.write(`get ${this.counter}. ${this.store}`);
    }
  }


};


