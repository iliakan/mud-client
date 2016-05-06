'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = [
  'detect invis',
  'bless',
  'protection',
  'armor',
  'fly',
  'sanctuary',
  'wyvern watch',
  'crown of archons',
  'bless'
];

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
