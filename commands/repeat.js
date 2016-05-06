'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

// #10 do smth -> 10 times do smth

class RepeatCommand extends ConnectorHandler {


  get connectorEvents() {
    return ['command'];
  }

  // ...args ?
  onCommand(command, args) {
    let count = +command;
    if (!count) return;

    args = args.join(' ');

    for (let i = 0; i < count; i++) {
      let parts = args.split(';');
      for (let part of parts) {
        this.connector.write(part, true);
      }
    }
  }

}

module.exports = RepeatCommand;

