'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = [
  'detect invis',
  'armor',
  'bless',
  'protection',
  'fly',
  'shelter of the earth'
];

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
