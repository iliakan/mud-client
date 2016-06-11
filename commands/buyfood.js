'use strict';

const chalk = require('chalk');
const ConnectorHandler = require('../lib/connectorHandler');

const notifier = require('node-notifier');
// identify all items on the ground

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['buyfood'];
  }

  onCommandBuyfood(args) {
    let store = args[0] || this.connector.character.store;
    for(let i=0; i<30; i++) {
      this.connector.write('buy ' + this.connector.character.food);
      this.connector.write(`put ${this.connector.character.food} ${store}`);
    }
    for(let i=0; i<3; i++) {
      this.connector.write('buy ' + this.connector.character.water);
      this.connector.write(`put ${this.connector.character.water} ${store}`);
    }
  }

};


