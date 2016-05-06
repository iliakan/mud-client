'use strict';

// walk mermaids

const AutoKill = require('./autokill');

module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 45*3*1e3,
      attack: 'kill',
      there: 'w2n2wnw3nw5nen',
      back: 'sw8sesessse',
      betweenWalks: function() {
        if (this.connector.character.stats.hpPercent < 0.9) {
          this.connector.write('bandage');
        }
      },
      targets: ['mermaid'], // merm or mermaid to skip guards
      prepare:  [
        'stance off',
        'stance off',
        'bers',
        'warc',
        'adren'
      ],
      walk: "nnnwsesses"
    });
  }


};
