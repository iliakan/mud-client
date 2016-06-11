'use strict';

const SpellupHandler = require('../../lib/spellup');

let spells = {
  'displacement': true,
  'detect invis': true,
  'eldritch shield': true,
  'improved shield': true,
  'improved armor': true,
  'ironskin': true,
  'harden skin': true,
  'spellturning': true,
  'protective shield': true,
  'fly': true,
  'spiderhands': true,
  // 'haste',
  'sanctuary': true
};

module.exports = class extends SpellupHandler {

  constructor(connector) {
    super(connector, spells)
  }

};
