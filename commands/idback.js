'use strict';

const chalk = require('chalk');
const ConnectorHandler = require('../lib/connectorHandler');
const _ = require('lodash');

const notifier = require('node-notifier');
// identify all items on the ground

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['idback'];
  }

  get connectorEvents() {
    return ['readlineServer'];
  }

  onCommandIdback(args) {
    this.store = args[0];

    this.moveInteresting = args[1];

    this.enabled = true;
    this.counter = 1;
    this.connector.write(`get ${this.counter}. ${this.store}`);
  }

  onReadlineServer(line) {
    if (!this.enabled) return;

    if (line.match(new RegExp(`You get .* ${this.store.replace(/^\d+\./, '')}.`))) {
      this.connector.write(`c ident 1.`);
    }

    if (line.startsWith('You lost')) {
      this.connector.write(`c ident 1.`);
    }

    this.interesting = this.interesting || line.match(/(modifies resistance to (energy|acid|air|holy|negative|earth) by \d\d)|(modifies physical resistance by ([8-9]|\d\d))|(damage roll by ([6-9]|\d\d))|(all saves by [4-9])|(regeneration by [2-9])|((fire|lightning)-based spell damage by (15|16|17|18|19|[23]\d))|(against undead by [2-4]\d)/);

    if (this.interesting) {
      // console.log(this.interesting);
    }

    if (/(is an axe)|(is a (dagger|flail|mace|polearm|spear|sword|whip|staff|bow|crossbow))|(You can use it as a shield.)/.test(line)) {
      this.isWeapon = true;
    }

    if (line == 'A warm wave of magic flows through your hands as you perceive that..') {
      this.interesting = false;
      this.isWeapon = false;

      this.connector.once('stats', () => {
        if (this.interesting) {
          this.connector.show(chalk.red("INTERESTING " + this.interesting[0]));
        }

        if (this.interesting && this.moveInteresting) {
          this.connector.write(`put 1. ${this.moveInteresting}`);
        } else {
          this.counter++;
          this.connector.write(`put 1. ${this.store}`);
        }
        this.connector.write(`get ${this.counter}. ${this.store}`);
      });
    }
  }


};


