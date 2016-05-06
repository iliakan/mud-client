'use strict';

const ConnectorHandler = require('./connectorHandler');
const AffectReader = require('./affectReader');

const notifier = require('node-notifier');

module.exports = class extends ConnectorHandler {

  constructor(connector, spellListFull) {
    super(connector);
    this.spellListFull = spellListFull;
  }

  get connectorCommands() {
    return ['spellup'];
  }

  onCommandSpellup(args) {
    new AffectReader(this.connector, affects => {
      let expiring = {};
      Object.keys(affects).forEach(key => {
        if (affects[key].hours < 2) {
          expiring[key] = affects[key];
        }
      });

      let phrases = [];
      for(let spell in expiring) {
        phrases.push(`${spell} ${expiring[spell].hours}h`);
      }
      if (phrases.length) {
        notifier.notify({
          message: this.connector.character.name + ": " + phrases.join(', ')
        });
      }

      this.spellListFull.forEach(item => {

        if (!affects[item.toLowerCase()]) {
          this.connector.write(`cast "${item}"`, true);
        }

      });


    });
  }

};
