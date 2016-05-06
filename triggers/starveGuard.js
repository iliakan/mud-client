'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorEvents() {
    return ['readlineServer'];
  }

  /*
  get connectorCommands() {
    return ['starveguardon'];
  }

  onCommandStarveguardon() {
    this.connector.show("Starve/Die disconnect is on!");
    this.enabled = true;
  }*/

  onReadlineServer(line) {
    if (!this.connector.isAfk) return;
    // guard agains starvation/dehydration
    if (line.includes('Your starvation') || line.includes('Your dehydration') || line == 'You have been KILLED!!') {
      this.connector.write('quit');
      this.connector.disconnect();
    }
  }

};
