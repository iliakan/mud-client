'use strict';

const AutoKill = require('./autokill');

/**
 * Walk arkham mausoleum
 */
module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 135 * 1000 + 1000,
      attack: 'lunge',
      there: '',
      back: '',
      onKill: function(connector) {
        connector.write('get all.coins');
        connector.write('sac key');
      },
      betweenWalks: '',
      nofood: true,
      targets: ['zom', 'gh'],
      prepare:  [
        'stance off',
        'stance off',
        'bers',
        'warc',
        'adren'
      ],
      // walk: "open d;d;open s;se;open n;ns;open e;ew;ww;open n;ns;open w;weeeswwsee;swws;open w;we;open s;sn;esne;open e;ew;open s;sn;wnnnnn;unlock n;open n;nu"
      walk: "open d;d;open s;se;open n;ns;open e;ew;4s;open e;ew;open s;sn;wsn;w;open s;sn;open w;we;nenwnenw;open n;ns;open w;we;e;n;unlock n;open n;n;u"
    });
  }


};
