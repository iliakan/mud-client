'use strict';

// notify on interaction

const notifier = require('node-notifier');


const ConnectorHandler = require('../lib/connectorHandler');

class InteractionNotifier extends ConnectorHandler {



  get connectorEvents() {
    return ['readlineServer'];
  }

  onReadlineServer(line) {
    if (line.match(/^\w+ tells the group, /)
      || line.match(/^\w+ tells you, /)
      || line.match(/^\w+ OOCs you, /)
      || line.match(/^\w+ (roars|says), /)
      || line.match(/looks at/)
    ) {

      this.connector.ipc.of.mud.emit('interaction', `[${this.connector.character.name}] ${line.trim()}`);
      
      notifier.notify({
        message: line,
        sound: 'Submarine'
      });
    }
  }

}

module.exports = InteractionNotifier;

