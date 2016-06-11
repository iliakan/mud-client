'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'detect invis':     true,
  'bless':            true,
  'protection':       true,
  'armor':            true,
  'fly':              true,
  'sanctuary':        true,
  'wyvern watch':     true,
  'crown of archons': true
};

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
