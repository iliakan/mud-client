'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = [
  'detect invis',
  'bless',
  'protection',
  'armor',
  'ring of sanctity',
  'sanctuary',
  'fly',
  'stone skin',
  'bless'
];

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
