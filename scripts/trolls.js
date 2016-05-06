'use strict';

// auto glade exping script

const AutoKill = require('./autokill');

/**
 * Trolls in dead forest
 */
module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 0,
      attack: 'kill',
      there: '',
      back: '',
      betweenWalks: '',
      nofood: true,
      targets: ['troll'],
      prepare: [],
      walk: "6en6wn6en6wn6en6w5s"
    });
  }


};
