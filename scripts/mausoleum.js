'use strict';

const AutoKill = require('./autokill');

/**
 * Walk arkham mausoleum
 */
module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 3 * 50 * 1000 + 1000,
      attack: 'kill',
      there: '',
      back: '',
      /*
      onKill: function(connector) {
        connector.write('get all.coins');
        connector.write('sac key');
      },
      */
      betweenWalks: function() {
        if (this.connector.character.stats.hpPercent < 0.8) {
          this.connector.write('bandage');
        }
      },
      targets: ['gh', 'zom'],// ghoul first in case it attacks someone of other group members
      prepare:  [
        'stance off',
        'stance off',
        'bers',
        'warc',
        'adren'
      ],
      // walk: "open d;d;open s;se;open n;ns;open e;ew;ww;open n;ns;open w;weeeswwsee;swws;open w;we;open s;sn;esne;open e;ew;open s;sn;wnnnnn;unlock n;open n;nu"
      walk: "open d;d;open s;se;open n;n;open s;s;open e;e;open w;w;4s;open e;e;open w;w;open s;s;open n;n;wsn;w;open s;sn;open w;w;open e;e;nenwnenw;open n;n;open s;s;open w;w;open e;e;e;open n;n;unlock n;open n;n;u"
    });
  }


};
