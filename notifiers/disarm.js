'use strict';

// notify on interaction

const notifier = require('node-notifier');


const ConnectorHandler = require('../lib/connectorHandler');

class InteractionNotifier extends ConnectorHandler {



  get connectorEvents() {
    return ['readlineServer'];
  }

  onReadlineServer(line) {
    if (line.match(/ DISARMS you and sends your weapon flying!/)) {

      this.connector.ipc.of.mud.emit('interaction', `[${this.connector.character.name}] ${line.trim()}`);

      notifier.notify({
        message: line,
        sound: 'Submarine'
      });
    }
  }

}

module.exports = InteractionNotifier;

