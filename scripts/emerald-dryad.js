'use strict';

// walk emerald forest, dryad/nymph

const AutoKill = require('./autokill');

module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 60*4*1e3,
      attack: 'dirt',
      there: 'wuussw',
      back: 'enndde',
      betweenWalks: function() {
        if (this.connector.character.stats.hpPercent < 0.8) {
          this.connector.write('bandage');
        }
      },
      targets: ['nym', 'drya'],
      prepare: [
        'stance off',
        'stance off',
        'bers',
        'warc'
      ],
      walk: "seswseees" + "enssnw" + "wwwnnnn"
      // walk: "4s4enssnwwwwwwnnnn"
    });
  }


};
