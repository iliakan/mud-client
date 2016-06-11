'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'barkskin':             false,
  'protection heat cold': false,
  'bless':                true,
  'carapace':             true,
  'thornskin':            true,
  'frenzy':            true,
  'fly':                  true
};

module.exports = class extends SpellupHandler {


  get connectorEvents() {
    return ['readlineServer'];
  }

  constructor(connector) {
    super(connector, spells);
  }

  onReadlineServer(line) {

    let connector = this.connector;

    // recast on fail
    if (line == "Your skin roughens a little, then returns to normal.") {
      connector.write('barkskin');
    }


    if (line == "You try to protect yourself from the elements but fail.") {
      connector.write('prote');
    }

    if (line == "The bark on your skin peels off and falls away.") {
      connector.write('barkskin');
    }

  }

};
