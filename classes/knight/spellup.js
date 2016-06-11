'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'spiritual healing':      false,
  'divine health':          false,
  'bless':                  true,
  'protection':             true,
  'detect invis':           true,
  'lightshield':            true,
  'holy prayer':            true,
  'platinum dragon shield': true,
  'shield of faith':        true
};

module.exports = class extends SpellupHandler {
  
  constructor(connector) {
    super(connector, spells);
  }
};
