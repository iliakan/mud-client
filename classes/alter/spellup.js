'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'eldritch shield':   true,
  'ironskin':          true,
  'protective shield': true,
  'fly':               true,
  'haste':             true,
  'blink':             true,
  'sanctuary':         true
};

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
