'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'improved armor': true,
  'improved shield': true,
  'blink': true,
  'fly': true,
  'interposing hand': true,
  'lightning shield': true,
  'earthshield': true,
  'fireshield': true,
  // 'iceshield': true,
  'force field': true
};

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells);
  }

};
