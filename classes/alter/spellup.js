'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = [
  'eldritch shield',
  'ironskin',
  'protective shield',
  'fly',
  'haste',
  'blink',
  'sanctuary'
];

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
