'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class FighterTriggers extends ConnectorHandler {

  get connectorEvents() {
    return ['readlineServer'];
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

  }


};

