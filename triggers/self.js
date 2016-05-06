'use strict';

// NOT USED

const ConnectorHandler = require('../lib/connectorHandler');

// #all rest
// #all #spellup
// #alloff disabled the character, useful if he's separate from the group -> #allon enables
module.exports = class extends ConnectorHandler {


  constructor(connector) {
    super(connector);
    connector.ipc.of.mud.on('command.' + this.connector.character.name, (command) => {
      if (this.disabled) return;
      // execute as if came from client
      this.connector.readlineClient.emit('line', command.data);
    });
  }

  onCommandAlloff() {
    this.disabled = true;
  }
  onCommandAllon() {
    this.disabled = false;
  }

  onCommandAll(args) {
    args = args.join(' ');

    this.connector.ipc.of.mud.emit('to.all', args);
  }

};

