'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorEvents() {
    return ['stats', 'readlineServer'];
  }

  onStats(stats) {
    if (this.inProcess) return;
    if (stats.battle && stats.hpPercent < 0.4 && this.formType != 'defense') {
      this.connector.character.morph('defense');
      // wait until finished until more stats
      this.inProcess = true;
    }

  }

  onReadlineServer(line) {
    if (line == 'Your body undergoes a grotesque transformation.') {
      // transformation complete, let's track again
      this.inProcess = false;
    }

  }


  get connectorCommands() {
    return ['morph'];
  }

  onCommandMorph(args) {
    this.connector.character.morph(args[0]);
  }


};
