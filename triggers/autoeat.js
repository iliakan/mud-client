'use strict';

// Auto-eat/drink

let eat = [
  "You are hungry.",
  "You are famished!",
  "You are beginning to starve!"
];

let drink = [
  "You are thirsty.",
  "Your mouth is parched!",
  "You are beginning to dehydrate!"
];

const ConnectorHandler = require('../lib/connectorHandler');

class AutoEatTriggers extends ConnectorHandler {

  get connectorCommands() {
    return ['autoeat'];
  }

  onCommandAutoeat() {
    if (this.enabled) this.enabled = false;
    else this.enabled = true;
    this.connector.showInfo('autoeat ' + this.enabled);
  }


  get connectorEvents() {
    return ['readlineServer'];
  }

  onReadlineServer(line) {
    if (this.enabled === false) return;

    let connector = this.connector;

    if (eat.indexOf(line) != -1) {
      if (connector.character.state == connector.character.BATTLE) {
        connector.once('battleFinish', () => connector.character.eat());
      } else {
        connector.character.eat();
      }
    }

    if (drink.indexOf(line) != -1) {
      if (connector.character.state == connector.character.BATTLE) {
        connector.once('battleFinish', () => connector.character.drink());
      } else {
        connector.character.drink();
      }
    }

  }


}

module.exports = AutoEatTriggers;

