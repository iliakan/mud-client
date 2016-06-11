'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'detect invis':     true,
  'bless':            true,
  'protection':       true,
  'armor':            true,
  'ring of sanctity': true,
  'sanctuary':        true,
  'fly':              true,
  'stone skin':       true
};

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
