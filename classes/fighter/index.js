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
    this.connector.write('warc');
    this.connector.write('bers');
    this.connector.write('stance fury');
    this.connector.write('adren');
  }

  onReadlineServer(line) {

    let connector = this.connector;

    // recast on fail
    if (line == "Your blood burns briefly, but it subsides.") {
      connector.write('adren');
    }

    if (line == "You make soft grunting sounds but nothing happens.") {
      connector.write('warc');
    }

    if (line == 'Your pulse speeds up, but nothing happens.') {
      connector.write('bers')
    }

    // recast on down
    if (line == "The effects of your warcry die out.") {
      connector.write('warc');
    }

    if (line == 'You feel your pulse slow down.') {
      connector.write('bers')
    }

    if (line == 'Your blood cools down.') {
      connector.write('adren')
    }

    if (line == "You don't feel quite so tough." || line == "You flex your muscles, but fail to toughen yourself up.") {
      connector.write('tough')
    }

  }


};

