'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = [
  'displacement',
  'detect invis',
  'eldritch shield',
  'improved shield',
  'improved armor',
  'ironskin',
  'harden skin',
  'spellturning',
  'protective shield',
  'fly',
  'spiderhands',
  // 'haste',
  'sanctuary'
];

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
