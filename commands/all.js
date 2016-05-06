'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

// #all rest
// #all #spellup
// #to <charname> #spellup
// #alloff disables the character, useful if he's separate from the group -> #allon enables
module.exports = class extends ConnectorHandler {


  get connectorCommands() {
    return ['all', 'to', 'other', 'alloff', 'allon'];
  }

  constructor(connector) {
    super(connector);
    connector.ipc.of.mud.on('all', message => {
      console.log(message);
      if (this.disabled) return;

      // execute as if came from client
      if (!message.to || message.to == connector.character.name) {
        if (message.except != this.connector.character.name) {
          this.connector.readlineClient.emit('line', message.command);
        }
      }
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

    this.connector.ipc.of.mud.emit('all', {command: args});
  }

  onCommandOther(args) {
    args = args.join(' ');

    this.connector.ipc.of.mud.emit('all', {except: this.connector.character.name, command: args});
  }

  onCommandTo(args) {
    let to = args.shift();
    args = args.join(' ');

    this.connector.ipc.of.mud.emit('all', {to, command: args});
  }

};

