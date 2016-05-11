'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = [
  'improved armor',
  'improved shield',
  'blink',
  'fly',
  'interposing hand',
  'lightning shield',
  'earthshield',
  'iceshield',
  'force field'
];

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
