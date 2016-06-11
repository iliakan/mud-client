'use strict';

// notify on interaction

const notifier = require('node-notifier');


const ConnectorHandler = require('../lib/connectorHandler');

class InteractionNotifier extends ConnectorHandler {



  get connectorEvents() {
    return ['readlineServer'];
  }

  // You learn from your mistakes, and you manage to master fireball.
  // You have mastered fireshield!
  onReadlineServer(line) {
    if (line.match(/ manage to master | mastered | insight into /)) {
      this.connector.ipc.of.mud.emit('master', `[${this.connector.character.name}] ${line.trim()}`);

      notifier.notify({
        message: line,
        sound: 'Submarine',
        wait: true
      });
    }
  }

}

module.exports = InteractionNotifier;

