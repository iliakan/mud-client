'use strict';

const ConnectorHandler = require('../../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorEvents() {
    return ['readlineServer'];
  }

  get connectorCommands() {
    return ['spellup'];
  }

  onCommandSpellup(args) {
    this.connector.write('bark');
    this.connector.write('prote');
  }

  onReadlineServer(line) {

    let connector = this.connector;

    // recast on fail
    if (line == "Your skin roughens a little, then returns to normal.") {
      connector.write('bark');
    }

    if (line == "You try to protect yourself from the elements but fail.") {
      connector.write('prote');
    }

    // recast on down
    if (line == "The bark on your skin peels off and falls away.") {
      connector.write('warc');
    }

  }


};

