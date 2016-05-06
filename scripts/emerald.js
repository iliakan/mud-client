'use strict';

// walk emerald forest, lower mobs (no nymph)

const AutoKill = require('./autokill');

module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 45*3*1e3,
      attack: 'dirt',
      there: 'wuussw',
      back: 'enndde',
      betweenWalks: 'band',
      nofood: true,
      targets: ['drya', 'brow', 'pixi', 'spri'],
      prepare: [],
      walk: "swsssssseeeennnenssnwnwwnnwn"
    });
  }


};
