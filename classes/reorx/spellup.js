'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'detect invis': true,
  'armor': true,
  'frenzy': true,
  'bless': true,
  'protection': true,
  'fly': true,
  'shelter of the earth': true
};

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
